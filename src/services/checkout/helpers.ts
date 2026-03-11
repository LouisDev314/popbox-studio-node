import {
  AddressInput,
  CheckoutItemInput,
  CreateCheckoutSessionInput,
  DbClient,
  LockedProductRow,
} from '../../types/checkout';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import {
  addresses,
  customers,
  inventoryReservations,
  kujiPrizes,
  orderItems,
  orders,
  payments,
  productInventory,
  tickets,
} from '../../db/schema';
import { and, eq, sql } from 'drizzle-orm';
import type Stripe from 'stripe';
import logger from '../../utils/logger';
import { getOrderDetailById } from '../orders/helpers';
import { randomInt } from 'crypto';
import { createTicketNumber } from '../../utils/crypto';
import { sendOrderConfirmationEmail } from '../notifications';

class NeedsAttentionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NeedsAttentionError';
  }
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const normalizeItems = (items: CheckoutItemInput[]) => {
  const map = new Map<string, number>();

  for (const item of items) {
    map.set(item.productId, (map.get(item.productId) ?? 0) + item.quantity);
  }

  return Array.from(map.entries()).map(([productId, quantity]) => ({ productId, quantity }));
};

export const assertCanadianAddress = (address: AddressInput) => {
  if (address.countryCode.trim().toUpperCase() !== 'CA') {
    throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Shipping is only available in Canada');
  }
};

export const buildOrderUrl = (publicId: string, token: string) => {
  return `${getEnvConfig().clientBaseUrl}/orders/${publicId}?token=${encodeURIComponent(token)}`;
};

export const lockProductForCheckout = async (
  tx: DbClient,
  productId: string,
): Promise<LockedProductRow | undefined> => {
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

export const createOrUpdateCustomer = async (tx: DbClient, input: CreateCheckoutSessionInput) => {
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

export const insertAddresses = async (tx: DbClient, customerId: string, input: CreateCheckoutSessionInput) => {
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

export const releaseReservationsForOrder = async (
  tx: DbClient,
  orderId: string,
  nextStatus: 'released' | 'expired',
) => {
  await releaseReservationsForOrders(tx, [orderId], nextStatus);
};

export const releaseReservationsForOrders = async (
  tx: DbClient,
  orderIds: string[],
  nextStatus: 'released' | 'expired',
) => {
  if (orderIds.length === 0) {
    return;
  }

  const normalizedOrderIds = [...new Set(orderIds)].sort();
  const orderIdList = sql.join(
    normalizedOrderIds.map((orderId) => sql`${orderId}`),
    sql`, `,
  );

  await tx.execute(sql`
    WITH locked_orders AS (
      SELECT id
      FROM orders
      WHERE id IN (${orderIdList})
      ORDER BY id
      FOR UPDATE
    ),
    inventory_deltas AS (
      SELECT product_id, SUM(quantity)::integer AS quantity
      FROM inventory_reservations
      WHERE order_id IN (SELECT id FROM locked_orders)
        AND status = 'active'
      GROUP BY product_id
    ),
    updated_inventory AS (
      UPDATE product_inventory AS pi
      SET reserved = GREATEST(pi.reserved - inventory_deltas.quantity, 0)
      FROM inventory_deltas
      WHERE pi.product_id = inventory_deltas.product_id
      RETURNING pi.product_id
    )
    UPDATE inventory_reservations AS ir
    SET status = ${nextStatus}
    WHERE ir.order_id IN (SELECT id FROM locked_orders)
      AND ir.status = 'active'
  `);
};

export const ensurePaymentSessionMetadata = (session: Stripe.Checkout.Session) => {
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

export const allocateKujiTickets = async (tx: DbClient, orderId: string, customerId: string) => {
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

export const convertReservations = async (tx: DbClient, orderId: string) => {
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

export const markOrderPaidNeedsAttention = async (tx: DbClient, orderId: string, session: Stripe.Checkout.Session) => {
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

export const finalizeCheckoutSession = async (session: Stripe.Checkout.Session) => {
  const { orderId, guestAccessToken } = ensurePaymentSessionMetadata(session);
  let orderPublicId = '';
  let subtotalCents = 0;
  let totalCents = 0;

  try {
    const finalizeResult = await db.transaction(async (tx) => {
      const lockedOrderResult = await tx.execute<{
        publicId: string;
        customerId: string;
        status: (typeof orders.$inferSelect)['status'];
        subtotalCents: number;
        totalCents: number;
      }>(sql`
        SELECT
          id,
          public_id AS "publicId",
          customer_id AS "customerId",
          status,
          subtotal_cents AS "subtotalCents",
          total_cents AS "totalCents"
        FROM orders
        WHERE id = ${orderId}
        FOR UPDATE
      `);
      const lockedOrder = lockedOrderResult[0];

      if (!lockedOrder) {
        throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found for checkout session');
      }

      orderPublicId = lockedOrder.publicId;
      subtotalCents = Number(lockedOrder.subtotalCents);
      totalCents = Number(lockedOrder.totalCents);

      if (['paid', 'packed', 'shipped', 'refunded', 'paid_needs_attention'].includes(lockedOrder.status)) {
        return {
          alreadyFinalized: true,
          needsAttention: lockedOrder.status === 'paid_needs_attention',
          publicId: lockedOrder.publicId,
        };
      }

      if (lockedOrder.status !== 'pending_payment') {
        throw new NeedsAttentionError(`Order is ${lockedOrder.status} and can no longer be finalized`);
      }

      await convertReservations(tx, orderId);
      await allocateKujiTickets(tx, orderId, lockedOrder.customerId);

      await tx
        .update(orders)
        .set({
          status: 'paid',
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          subtotalCents: session.amount_subtotal ?? subtotalCents,
          taxCents: session.total_details?.amount_tax ?? 0,
          shippingCents: session.total_details?.amount_shipping ?? 0,
          totalCents: session.amount_total ?? totalCents,
          paidAt: new Date(),
          placedAt: new Date(),
        })
        .where(eq(orders.id, orderId));

      await tx
        .update(payments)
        .set({
          providerCheckoutSessionId: session.id,
          providerPaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          amountCents: session.amount_total ?? totalCents,
          currency: (session.currency ?? 'cad').toUpperCase(),
          status: 'paid',
          rawResponse: session as unknown as Record<string, unknown>,
        })
        .where(eq(payments.orderId, orderId));

      return {
        alreadyFinalized: false,
        needsAttention: false,
        publicId: lockedOrder.publicId,
      };
    });

    if (finalizeResult.alreadyFinalized) {
      return {
        orderId,
        publicId: finalizeResult.publicId,
        guestAccessToken,
        needsAttention: finalizeResult.needsAttention,
        alreadyFinalized: true,
      };
    }
  } catch (error) {
    if (error instanceof NeedsAttentionError) {
      logger.warn({ orderId, reason: error.message }, 'Order payment finalized with manual attention required');
      await db.transaction(async (tx) => {
        await markOrderPaidNeedsAttention(tx, orderId, session);
      });

      return {
        orderId,
        publicId: orderPublicId,
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
    publicId: orderPublicId,
    guestAccessToken,
    needsAttention: false,
    alreadyFinalized: false,
  };
};
