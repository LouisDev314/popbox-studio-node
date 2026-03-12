import { sql } from 'drizzle-orm';
import { db } from '../db';
import { expireStripeCheckoutSessionIfOpen, releaseReservationsForOrders } from '../services/checkout/helpers';
import { orders } from '../db/schema';
import logger from '../utils/logger';

const CLEANUP_BATCH_SIZE = 100;

const claimOrderIdsWithExpiredReservations = async (limit: number, status: 'pending_payment' | 'expired') => {
  return await db.transaction(async (tx) => {
    const result = await tx.execute<{ orderId: string; stripeCheckoutSessionId: string | null }>(sql`
      SELECT o.id AS "orderId"
        , o.stripe_checkout_session_id AS "stripeCheckoutSessionId"
      FROM orders AS o
      WHERE o.status = ${status}
        AND EXISTS (
        SELECT 1
        FROM inventory_reservations AS ir
        WHERE ir.order_id = o.id
          AND ir.status = 'active'
          AND ir.expires_at <= now()
      )
      ORDER BY o.created_at, o.id
      FOR UPDATE OF o SKIP LOCKED
      LIMIT ${limit}
    `);
    const claimedOrders = result.map((row) => ({
      orderId: row.orderId,
      stripeCheckoutSessionId: row.stripeCheckoutSessionId,
    }));
    const orderIds = claimedOrders.map((row) => row.orderId);

    if (status === 'pending_payment' && orderIds.length > 0) {
      await tx
        .update(orders)
        .set({
          status: 'expired',
        })
        .where(sql`${orders.id} IN (${sql.join(orderIds.map((orderId) => sql`${orderId}`), sql`, `)})`);
    }

    await releaseReservationsForOrders(tx, orderIds, 'expired');

    return claimedOrders;
  });
};

export const cleanupExpiredReservations = async (): Promise<{ processedOrders: number }> => {
  let processedOrders = 0;

  while (true) {
    const claimedOrders = await claimOrderIdsWithExpiredReservations(CLEANUP_BATCH_SIZE, 'expired');

    if (claimedOrders.length === 0) {
      break;
    }

    processedOrders += claimedOrders.length;
  }

  return {
    processedOrders,
  };
};

export const cleanupExpiredPendingOrders = async (): Promise<{
  expiredOrders: number;
  stripeSessionsExpired: number;
  stripeSessionExpireFailures: number;
}> => {
  let expiredOrders = 0;
  let stripeSessionsExpired = 0;
  let stripeSessionExpireFailures = 0;

  while (true) {
    const batchExpiredOrders = await claimOrderIdsWithExpiredReservations(CLEANUP_BATCH_SIZE, 'pending_payment');

    if (batchExpiredOrders.length === 0) {
      break;
    }

    expiredOrders += batchExpiredOrders.length;

    for (const expiredOrder of batchExpiredOrders) {
      if (!expiredOrder.stripeCheckoutSessionId) {
        continue;
      }

      const expireResult = await expireStripeCheckoutSessionIfOpen(expiredOrder.stripeCheckoutSessionId);

      if (expireResult.outcome === 'expired') {
        stripeSessionsExpired += 1;
        continue;
      }

      if (expireResult.outcome === 'error') {
        stripeSessionExpireFailures += 1;
        continue;
      }

      logger.info(
        {
          orderId: expiredOrder.orderId,
          stripeCheckoutSessionId: expiredOrder.stripeCheckoutSessionId,
          reason: expireResult.reason,
          status: expireResult.status,
        },
        'Stripe Checkout Session did not need proactive expiration after local order expiration',
      );
    }
  }

  return {
    expiredOrders,
    stripeSessionsExpired,
    stripeSessionExpireFailures,
  };
};
