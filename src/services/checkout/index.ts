import { randomInt } from 'crypto';
import { and, eq, sql } from 'drizzle-orm';
import type Stripe from 'stripe';
import stripe from '../../clients/stripe';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import {
  addresses,
  customers,
  inventoryReservations,
  orderItems,
  orders,
  payments,
  productInventory,
  tickets,
  kujiPrizes,
  stripeWebhookEvents,
} from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constant/http-status-code';
import { createGuestAccessToken, createPublicId, createTicketNumber, hashGuestAccessToken } from '../../utils/crypto';
import logger from '../../utils/logger';
import { getOrderDetailById } from '../orders/shared';
import { sendOrderConfirmationEmail } from '../notifications';

const env = getEnvConfig();
const RESERVATION_TTL_MS = 10 * 60 * 1000;
type DbClient = Pick<typeof db, 'select' | 'insert' | 'update' | 'delete' | 'execute'>;

type AddressInput = {
  fullName: string;
  line1: string;
  line2?: string | null;
  city: string;
  province: string;
  postalCode: string;
  countryCode: string;
  phone?: string | null;
};

type CheckoutItemInput = {
  productId: string;
  quantity: number;
};

export type CreateCheckoutSessionInput = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  items: CheckoutItemInput[];
  shippingAddress: AddressInput;
  billingAddress?: AddressInput | null;
  billingSameAsShipping?: boolean;
};

type LockedProductRow = {
  productId: string;
  name: string;
  slug: string;
  description: string | null;
  productType: 'standard' | 'kuji';
  status: 'draft' | 'active' | 'archived';
  priceCents: number;
  currency: string;
  onHand: number;
  reserved: number;
};

class NeedsAttentionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NeedsAttentionError';
  }
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const normalizeItems = (items: CheckoutItemInput[]) => {
  const map = new Map<string, number>();

  for (const item of items) {
    map.set(item.productId, (map.get(item.productId) ?? 0) + item.quantity);
  }

  return Array.from(map.entries()).map(([productId, quantity]) => ({ productId, quantity }));
};

const assertCanadianAddress = (address: AddressInput) => {
  if (address.countryCode.trim().toUpperCase() !== 'CA') {
    throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Shipping is only available in Canada');
  }
};

const buildOrderUrl = (publicId: string, token: string) => {
  return `${env.customerAppBaseUrl}/orders/${publicId}?token=${encodeURIComponent(token)}`;
};

const lockProductForCheckout = async (tx: DbClient, productId: string): Promise<LockedProductRow | undefined> => {
  const result = await tx.execute(sql<LockedProductRow>`
    SELECT
      p.id AS "productId",
      p.name,
      p.slug,
      p.description,
      p.product_type AS "productType",
      p.status,
      p.price_cents AS "priceCents",
      p.currency,
      pi.on_hand AS "onHand",
      pi.reserved
    FROM products p
    JOIN product_inventory pi ON pi.product_id = p.id
    WHERE p.id = ${productId}
    FOR UPDATE
  `);

  return result[0] as LockedProductRow | undefined;
};

const createOrUpdateCustomer = async (tx: DbClient, input: CreateCheckoutSessionInput) => {
  const email = normalizeEmail(input.email);
  const [existingCustomer] = await tx.select().from(customers).where(eq(customers.email, email)).limit(1);

  if (existingCustomer) {
    const [updated] = await tx
      .update(customers)
      .set({
        firstName: input.firstName ?? existingCustomer.firstName,
        lastName: input.lastName ?? existingCustomer.lastName,
        phone: input.phone ?? input.shippingAddress.phone ?? existingCustomer.phone,
      })
      .where(eq(customers.id, existingCustomer.id))
      .returning();

    if (!updated) {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to update customer');
    }

    return updated;
  }

  const [created] = await tx
    .insert(customers)
    .values({
      email,
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      phone: input.phone ?? input.shippingAddress.phone ?? null,
    })
    .returning();

  if (!created) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to create customer');
  }

  return created;
};

const insertAddresses = async (tx: DbClient, customerId: string, input: CreateCheckoutSessionInput) => {
  await tx.insert(addresses).values({
    customerId,
    ...input.shippingAddress,
  });

  if (input.billingAddress && !input.billingSameAsShipping) {
    await tx.insert(addresses).values({
      customerId,
      ...input.billingAddress,
    });
  }
};

const releaseReservationsForOrder = async (tx: DbClient, orderId: string, nextStatus: 'released' | 'expired') => {
  const activeReservations = await tx
    .select()
    .from(inventoryReservations)
    .where(and(eq(inventoryReservations.orderId, orderId), eq(inventoryReservations.status, 'active')));

  if (activeReservations.length === 0) {
    return;
  }

  for (const reservation of activeReservations) {
    await tx
      .update(productInventory)
      .set({
        reserved: sql`GREATEST(${productInventory.reserved} - ${reservation.quantity}, 0)`,
      })
      .where(eq(productInventory.productId, reservation.productId));
  }

  await tx
    .update(inventoryReservations)
    .set({
      status: nextStatus,
    })
    .where(and(eq(inventoryReservations.orderId, orderId), eq(inventoryReservations.status, 'active')));
};

const ensurePaymentSessionMetadata = (session: Stripe.Checkout.Session) => {
  const orderId = session.metadata?.orderId;
  const guestAccessToken = session.metadata?.guestAccessToken;

  if (!orderId || !guestAccessToken) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Stripe session metadata is incomplete');
  }

  return {
    orderId,
    guestAccessToken,
  };
};

const allocateKujiTickets = async (tx: DbClient, orderId: string, customerId: string) => {
  const kujiItems = await tx
    .select()
    .from(orderItems)
    .where(and(eq(orderItems.orderId, orderId), eq(orderItems.productType, 'kuji')));

  for (const item of kujiItems) {
    const prizeResult = await tx.execute(
      sql<{
        id: string;
        remainingQuantity: number;
        productId: string;
      }>`
        SELECT id, remaining_quantity AS "remainingQuantity", product_id AS "productId"
        FROM kuji_prizes
        WHERE product_id = ${item.productId}
          AND remaining_quantity > 0
        ORDER BY sort_order ASC, id ASC
        FOR UPDATE
      `,
    );

    const prizePool = prizeResult.map((row) => ({
      id: String(row.id),
      remainingQuantity: Number(row.remainingQuantity),
      productId: String(row.productId),
    }));
    const totalRemaining = prizePool.reduce((sum, prize) => sum + prize.remainingQuantity, 0);

    if (totalRemaining < item.quantity) {
      throw new NeedsAttentionError(`Insufficient kuji prize inventory for product ${item.productId}`);
    }

    const selectedPrizeCounts = new Map<string, number>();

    for (let drawIndex = 0; drawIndex < item.quantity; drawIndex += 1) {
      const currentTotal = prizePool.reduce((sum, prize) => sum + prize.remainingQuantity, 0);
      const roll = randomInt(currentTotal) + 1;
      let cumulative = 0;
      let selectedPrize = prizePool[0];

      for (const prize of prizePool) {
        cumulative += prize.remainingQuantity;

        if (roll <= cumulative) {
          selectedPrize = prize;
          break;
        }
      }

      if (!selectedPrize || selectedPrize.remainingQuantity <= 0) {
        throw new NeedsAttentionError(`Unable to allocate kuji prize for product ${item.productId}`);
      }

      selectedPrize.remainingQuantity -= 1;
      selectedPrizeCounts.set(selectedPrize.id, (selectedPrizeCounts.get(selectedPrize.id) ?? 0) + 1);

      await tx.insert(tickets).values({
        orderId,
        orderItemId: item.id,
        customerId,
        kujiProductId: item.productId,
        kujiPrizeId: selectedPrize.id,
        ticketNumber: createTicketNumber(),
      });
    }

    for (const prize of prizePool) {
      const drawnCount = selectedPrizeCounts.get(prize.id);
      if (!drawnCount) continue;

      await tx
        .update(kujiPrizes)
        .set({
          remainingQuantity: prize.remainingQuantity,
        })
        .where(eq(kujiPrizes.id, prize.id));
    }
  }
};

const convertReservations = async (tx: DbClient, orderId: string) => {
  const activeReservations = await tx
    .select()
    .from(inventoryReservations)
    .where(and(eq(inventoryReservations.orderId, orderId), eq(inventoryReservations.status, 'active')));

  if (activeReservations.length === 0) {
    throw new NeedsAttentionError('No active reservations were available for conversion');
  }

  for (const reservation of activeReservations) {
    const inventoryResult = await tx.execute(sql<{ onHand: number; reserved: number }>`
      SELECT on_hand AS "onHand", reserved
      FROM product_inventory
      WHERE product_id = ${reservation.productId}
      FOR UPDATE
    `);

    const inventoryRow = inventoryResult[0];
    const inventory = inventoryRow
      ? {
          onHand: Number(inventoryRow.onHand),
          reserved: Number(inventoryRow.reserved),
        }
      : undefined;
    if (!inventory || inventory.reserved < reservation.quantity || inventory.onHand < reservation.quantity) {
      throw new NeedsAttentionError(`Inventory could not be finalized for product ${reservation.productId}`);
    }

    await tx
      .update(productInventory)
      .set({
        onHand: sql`${productInventory.onHand} - ${reservation.quantity}`,
        reserved: sql`${productInventory.reserved} - ${reservation.quantity}`,
      })
      .where(eq(productInventory.productId, reservation.productId));
  }

  await tx
    .update(inventoryReservations)
    .set({
      status: 'converted',
    })
    .where(and(eq(inventoryReservations.orderId, orderId), eq(inventoryReservations.status, 'active')));
};

const markOrderPaidNeedsAttention = async (tx: DbClient, orderId: string, session: Stripe.Checkout.Session) => {
  await releaseReservationsForOrder(tx, orderId, 'released');

  await tx
    .update(orders)
    .set({
      status: 'paid_needs_attention',
      stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      subtotalCents: session.amount_subtotal ?? 0,
      taxCents: session.total_details?.amount_tax ?? 0,
      shippingCents: session.total_details?.amount_shipping ?? 0,
      totalCents: session.amount_total ?? 0,
      paidAt: new Date(),
      placedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  await tx
    .update(payments)
    .set({
      providerCheckoutSessionId: session.id,
      providerPaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      amountCents: session.amount_total ?? 0,
      currency: (session.currency ?? 'cad').toUpperCase(),
      status: 'paid',
      rawResponse: session as unknown as Record<string, unknown>,
    })
    .where(eq(payments.orderId, orderId));
};

const finalizeCheckoutSession = async (session: Stripe.Checkout.Session) => {
  const { orderId, guestAccessToken } = ensurePaymentSessionMetadata(session);

  const [orderRecord] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!orderRecord) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found for checkout session');
  }

  if (['paid', 'packed', 'shipped', 'refunded'].includes(orderRecord.status)) {
    return {
      orderId,
      publicId: orderRecord.publicId,
      guestAccessToken,
      needsAttention: orderRecord.status === 'paid_needs_attention',
      alreadyFinalized: true,
    };
  }

  try {
    await db.transaction(async (tx) => {
      await convertReservations(tx, orderId);
      await allocateKujiTickets(tx, orderId, orderRecord.customerId);

      await tx
        .update(orders)
        .set({
          status: 'paid',
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          subtotalCents: session.amount_subtotal ?? orderRecord.subtotalCents,
          taxCents: session.total_details?.amount_tax ?? 0,
          shippingCents: session.total_details?.amount_shipping ?? 0,
          totalCents: session.amount_total ?? orderRecord.totalCents,
          paidAt: new Date(),
          placedAt: new Date(),
        })
        .where(eq(orders.id, orderId));

      await tx
        .update(payments)
        .set({
          providerCheckoutSessionId: session.id,
          providerPaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          amountCents: session.amount_total ?? orderRecord.totalCents,
          currency: (session.currency ?? 'cad').toUpperCase(),
          status: 'paid',
          rawResponse: session as unknown as Record<string, unknown>,
        })
        .where(eq(payments.orderId, orderId));
    });
  } catch (error) {
    if (error instanceof NeedsAttentionError) {
      logger.warn({ orderId, reason: error.message }, 'Order payment finalized with manual attention required');
      await db.transaction(async (tx) => {
        await markOrderPaidNeedsAttention(tx, orderId, session);
      });

      return {
        orderId,
        publicId: orderRecord.publicId,
        guestAccessToken,
        needsAttention: true,
        alreadyFinalized: false,
      };
    }

    throw error;
  }

  const detail = await getOrderDetailById(orderId);
  const orderUrl = buildOrderUrl(detail.publicId, guestAccessToken);

  try {
    await sendOrderConfirmationEmail({
      email: detail.customer.email,
      firstName: detail.customer.firstName,
      orderPublicId: detail.publicId,
      orderUrl,
    });
  } catch (emailError) {
    logger.error({ orderId, emailError }, 'Failed to send order confirmation email');
  }

  return {
    orderId,
    publicId: orderRecord.publicId,
    guestAccessToken,
    needsAttention: false,
    alreadyFinalized: false,
  };
};

export const createCheckoutSession = async (input: CreateCheckoutSessionInput) => {
  if (!input.items?.length) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'At least one cart item is required');
  }

  assertCanadianAddress(input.shippingAddress);
  if (input.billingAddress && !input.billingSameAsShipping) {
    assertCanadianAddress(input.billingAddress);
  }

  const normalizedItems = normalizeItems(input.items);
  const guestAccessToken = createGuestAccessToken();
  const guestAccessTokenHash = hashGuestAccessToken(guestAccessToken);
  const expiresAt = new Date(Date.now() + RESERVATION_TTL_MS);
  const publicId = createPublicId('ord');
  const shippingCents = env.stripeShippingRateCents;

  const { createdOrder, orderProducts } = await db.transaction(async (tx) => {
    const currentCustomer = await createOrUpdateCustomer(tx, input);
    await insertAddresses(tx, currentCustomer.id, input);

    const lockedProducts: Array<LockedProductRow & { quantity: number }> = [];
    let runningSubtotal = 0;

    for (const item of normalizedItems) {
      const lockedProduct = await lockProductForCheckout(tx, item.productId);

      if (!lockedProduct) {
        throw new Exception(HttpStatusCode.NOT_FOUND, `Product ${item.productId} was not found`);
      }

      if (lockedProduct.status !== 'active') {
        throw new Exception(HttpStatusCode.CONFLICT, `${lockedProduct.name} is not available for checkout`);
      }

      const availableQuantity = lockedProduct.onHand - lockedProduct.reserved;
      if (availableQuantity < item.quantity) {
        throw new Exception(HttpStatusCode.CONFLICT, `${lockedProduct.name} does not have enough inventory available`);
      }

      runningSubtotal += lockedProduct.priceCents * item.quantity;
      lockedProducts.push({
        ...lockedProduct,
        quantity: item.quantity,
      });
    }

    const [orderRow] = await tx
      .insert(orders)
      .values({
        publicId,
        customerId: currentCustomer.id,
        status: 'pending_payment',
        currency: 'CAD',
        subtotalCents: runningSubtotal,
        taxCents: 0,
        shippingCents,
        totalCents: runningSubtotal + shippingCents,
        shippingAddressJson: input.shippingAddress as unknown as Record<string, unknown>,
        billingAddressJson: input.billingSameAsShipping
          ? (input.shippingAddress as unknown as Record<string, unknown>)
          : ((input.billingAddress as unknown as Record<string, unknown> | null) ?? null),
        guestAccessTokenHash,
      })
      .returning();

    if (!orderRow) {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to create order');
    }

    for (const item of lockedProducts) {
      const [createdOrderItem] = await tx
        .insert(orderItems)
        .values({
          orderId: orderRow.id,
          productId: item.productId,
          productName: item.name,
          productType: item.productType,
          unitPriceCents: item.priceCents,
          quantity: item.quantity,
          lineTotalCents: item.priceCents * item.quantity,
          metadata: {
            slug: item.slug,
            description: item.description,
          },
        })
        .returning();

      await tx.insert(inventoryReservations).values({
        orderId: orderRow.id,
        productId: item.productId,
        quantity: item.quantity,
        status: 'active',
        expiresAt,
      });

      await tx
        .update(productInventory)
        .set({
          reserved: sql`${productInventory.reserved} + ${item.quantity}`,
        })
        .where(eq(productInventory.productId, item.productId));

      if (!createdOrderItem) {
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to create order items');
      }
    }

    await tx.insert(payments).values({
      orderId: orderRow.id,
      provider: 'stripe',
      amountCents: runningSubtotal + shippingCents,
      currency: 'CAD',
      status: 'pending',
    });

    return {
      createdOrder: orderRow,
      customer: currentCustomer,
      orderProducts: lockedProducts,
      subtotalCents: runningSubtotal,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: env.stripeSuccessUrl,
      cancel_url: env.stripeCancelUrl,
      automatic_tax: {
        enabled: true,
      },
      billing_address_collection: 'required',
      customer_email: normalizeEmail(input.email),
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      line_items: orderProducts.map((item) => {
        const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
          name: item.name,
        };

        if (item.description) {
          productData.description = item.description;
        }

        return {
          quantity: item.quantity,
          price_data: {
            currency: 'cad',
            unit_amount: item.priceCents,
            product_data: productData,
          },
        };
      }),
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Canada shipping',
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCents,
              currency: 'cad',
            },
          },
        },
      ],
      metadata: {
        orderId: createdOrder.id,
        orderPublicId: createdOrder.publicId,
        guestAccessToken,
      },
    });

    await db
      .update(orders)
      .set({
        stripeCheckoutSessionId: session.id,
      })
      .where(eq(orders.id, createdOrder.id));

    await db
      .update(payments)
      .set({
        providerCheckoutSessionId: session.id,
        providerPaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        rawResponse: session as unknown as Record<string, unknown>,
      })
      .where(eq(payments.orderId, createdOrder.id));

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
      publicId: createdOrder.publicId,
      orderId: createdOrder.id,
    };
  } catch (error) {
    logger.error({ error, orderId: createdOrder.id }, 'Checkout session creation failed, releasing reservations');
    await db.transaction(async (tx) => {
      await releaseReservationsForOrder(tx, createdOrder.id, 'released');
      await tx
        .update(orders)
        .set({
          status: 'cancelled',
          cancelledAt: new Date(),
        })
        .where(eq(orders.id, createdOrder.id));
      await tx
        .update(payments)
        .set({
          status: 'failed',
        })
        .where(eq(payments.orderId, createdOrder.id));
    });

    if (error instanceof Exception) {
      throw error;
    }

    throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to create checkout session');
  }
};

export const getCheckoutSuccess = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session || !session.id) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Checkout session not found');
  }

  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    throw new Exception(HttpStatusCode.CONFLICT, 'Checkout session has not been paid yet');
  }

  const { orderId, guestAccessToken } = ensurePaymentSessionMetadata(session);
  const detail = await getOrderDetailById(orderId);

  if (!['paid', 'packed', 'shipped', 'refunded', 'paid_needs_attention'].includes(detail.status)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Order payment is still awaiting webhook finalization');
  }

  const orderUrl = buildOrderUrl(detail.publicId, guestAccessToken);

  return {
    publicId: detail.publicId,
    guestAccessToken,
    orderUrl,
    needsAttention: detail.status === 'paid_needs_attention',
    order: detail,
  };
};

export const handleStripeWebhook = async (signature: string | string[] | undefined, rawBody: Buffer) => {
  if (!signature || Array.isArray(signature)) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Stripe signature header is required');
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, env.stripeWebhookSecret);
  } catch {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Invalid Stripe signature');
  }

  const existing = await db
    .select()
    .from(stripeWebhookEvents)
    .where(eq(stripeWebhookEvents.stripeEventId, event.id))
    .limit(1);

  if (existing[0]?.status === 'processed') {
    return {
      received: true,
      duplicate: true,
    };
  }

  if (!existing[0]) {
    await db.insert(stripeWebhookEvents).values({
      stripeEventId: event.id,
      eventType: event.type,
      status: 'received',
      payload: event as unknown as Record<string, unknown>,
    });
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
        await finalizeCheckoutSession(event.data.object as Stripe.Checkout.Session);
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await db.transaction(async (tx) => {
          await releaseReservationsForOrder(tx, orderId, 'expired');
          await tx
            .update(orders)
            .set({
              status: 'expired',
            })
            .where(and(eq(orders.id, orderId), eq(orders.status, 'pending_payment')));
        });
      }
    }

    await db
      .update(stripeWebhookEvents)
      .set({
        status: 'processed',
        processedAt: new Date(),
        errorMessage: null,
      })
      .where(eq(stripeWebhookEvents.stripeEventId, event.id));

    return {
      received: true,
      duplicate: false,
    };
  } catch (error) {
    await db
      .update(stripeWebhookEvents)
      .set({
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown webhook error',
      })
      .where(eq(stripeWebhookEvents.stripeEventId, event.id));

    throw error;
  }
};

export const cleanupExpiredReservations = async () => {
  const expiredOrders = await db
    .select({
      orderId: inventoryReservations.orderId,
    })
    .from(inventoryReservations)
    .where(and(eq(inventoryReservations.status, 'active'), sql`${inventoryReservations.expiresAt} <= now()`))
    .groupBy(inventoryReservations.orderId);

  for (const row of expiredOrders) {
    await db.transaction(async (tx) => {
      await releaseReservationsForOrder(tx, row.orderId, 'expired');
    });
  }
};

export const cleanupExpiredPendingOrders = async () => {
  const staleOrders = await db
    .select({
      id: orders.id,
    })
    .from(orders)
    .where(and(eq(orders.status, 'pending_payment'), sql`${orders.createdAt} <= now() - interval '10 minutes'`));

  for (const order of staleOrders) {
    await db.transaction(async (tx) => {
      await releaseReservationsForOrder(tx, order.id, 'expired');
      await tx
        .update(orders)
        .set({
          status: 'expired',
        })
        .where(and(eq(orders.id, order.id), eq(orders.status, 'pending_payment')));
    });
  }
};
