import { eq, sql } from 'drizzle-orm';
import type Stripe from 'stripe';
import stripe from '../../integrations/stripe';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { inventoryReservations, orderItems, orders, payments, productInventory } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { createGuestAccessToken, createPublicId, hashGuestAccessToken } from '../../utils/crypto';
import logger from '../../utils/logger';
import { getOrderDetailById } from '../orders/helpers';
import { CreateCheckoutSessionInput, LockedProductRow } from '../../types/checkout';
import { buildClientOrderUrl, buildGuestOrderAccessUrl } from '../../utils/guest-order-access';
import {
  createOrUpdateCustomer,
  ensurePaymentSessionMetadata,
  lockProductForCheckout,
  normalizeEmail,
  normalizeItems,
  releaseReservationsForOrder,
} from './helpers';
import { getCheckoutSessionExpiry } from '../../utils/checkout';

const isUniqueConstraintViolation = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === '23505';

const reuseCheckoutSessionByIdempotencyKey = async (idempotencyKey: string) => {
  const [existingOrder] = await db
    .select({
      id: orders.id,
      publicId: orders.publicId,
      status: orders.status,
      stripeCheckoutSessionId: orders.stripeCheckoutSessionId,
    })
    .from(orders)
    .where(eq(orders.checkoutIdempotencyKey, idempotencyKey))
    .limit(1);

  if (!existingOrder) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Checkout is already being created for this idempotency key');
  }

  if (existingOrder.status !== 'pending_payment') {
    throw new Exception(
      HttpStatusCode.CONFLICT,
      `Checkout cannot be retried because the existing order is ${existingOrder.status}`,
    );
  }

  if (!existingOrder.stripeCheckoutSessionId) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Checkout session creation is still in progress. Retry shortly.');
  }

  const session = await stripe.checkout.sessions.retrieve(existingOrder.stripeCheckoutSessionId);

  if (session.payment_status === 'paid' || session.status === 'complete') {
    throw new Exception(HttpStatusCode.CONFLICT, 'Checkout has already completed for this idempotency key');
  }

  if (session.status !== 'open' || !session.url) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Checkout session can no longer be reused with this idempotency key');
  }

  return {
    checkoutUrl: session.url,
    sessionId: session.id,
    publicId: existingOrder.publicId,
    orderId: existingOrder.id,
  };
};

export const createCheckoutSession = async (input: CreateCheckoutSessionInput, idempotencyKey: string) => {
  if (!input.items?.length) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'At least one cart item is required');
  }

  const normalizedItems = normalizeItems(input.items);
  const guestAccessTokenHash = hashGuestAccessToken(createGuestAccessToken());
  const { expiresAt, stripeExpiresAt } = getCheckoutSessionExpiry(getEnvConfig().stripeCheckoutSessionReservationTtl);
  const publicId = createPublicId('pbs');
  const shippingCents = getEnvConfig().stripeShippingRateCents;

  let createdOrder: typeof orders.$inferSelect;
  let orderProducts: Array<LockedProductRow & { quantity: number }>;

  try {
    ({ createdOrder, orderProducts } = await db.transaction(async (tx) => {
      const currentCustomer = await createOrUpdateCustomer(tx, input);

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
          throw new Exception(
            HttpStatusCode.CONFLICT,
            `${lockedProduct.name} does not have enough inventory available`,
          );
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
          checkoutIdempotencyKey: idempotencyKey,
          shippingAddressJson: {},
          billingAddressJson: null,
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
    }));
  } catch (error) {
    if (isUniqueConstraintViolation(error)) {
      return reuseCheckoutSessionByIdempotencyKey(idempotencyKey);
    }

    throw error;
  }

  try {
    const customerEmail = input.email ? normalizeEmail(input.email) : undefined;
    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        success_url: getEnvConfig().stripeSuccessUrl,
        cancel_url: getEnvConfig().stripeCancelUrl,
        automatic_tax: {
          enabled: true,
        },
        billing_address_collection: 'required',
        ...(customerEmail ? { customer_email: customerEmail } : {}),
        shipping_address_collection: {
          allowed_countries: ['CA'],
        },
        expires_at: stripeExpiresAt,
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
        },
      },
      {
        idempotencyKey,
      },
    );

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

  const { orderId } = ensurePaymentSessionMetadata(session);
  const detail = await getOrderDetailById(orderId);

  if (!['paid', 'packed', 'shipped', 'refunded', 'paid_needs_attention'].includes(detail.status)) {
    throw new Exception(HttpStatusCode.ACCEPTED, 'Order payment is still awaiting webhook finalization');
  }

  const [order] = await db
    .select({
      guestAccessTokenHash: orders.guestAccessTokenHash,
    })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!order?.guestAccessTokenHash) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Order access link is unavailable');
  }

  const orderUrl = buildGuestOrderAccessUrl(detail.publicId, order.guestAccessTokenHash);
  const clientOrderUrl = buildClientOrderUrl(detail.publicId);

  return {
    publicId: detail.publicId,
    orderUrl,
    clientOrderUrl,
    needsAttention: detail.status === 'paid_needs_attention',
    order: detail,
  };
};
