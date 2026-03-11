import { sql } from 'drizzle-orm';
import { db } from '../db';
import { releaseReservationsForOrders } from '../services/checkout/helpers';

const CLEANUP_BATCH_SIZE = 100;

const claimExpiredReservationOrderIds = async (limit: number) => {
  return await db.transaction(async (tx) => {
    const result = await tx.execute<{ orderId: string }>(sql`
      SELECT o.id AS "orderId"
      FROM orders AS o
      WHERE EXISTS (
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
    const orderIds = result.map((row) => row.orderId);

    await releaseReservationsForOrders(tx, orderIds, 'expired');

    return orderIds;
  });
};

const expirePendingOrdersBatch = async (limit: number) => {
  return db.transaction(async (tx) => {
    const expiredOrders = await tx.execute<{ orderId: string }>(sql`
      WITH claimed_orders AS (
        SELECT id
        FROM orders
        WHERE status = 'pending_payment'
          AND created_at <= now() - interval '10 minutes'
        ORDER BY created_at, id
        FOR UPDATE SKIP LOCKED
        LIMIT ${limit}
      ),
      expired_orders AS (
        UPDATE orders
        SET status = 'expired'
        WHERE id IN (SELECT id FROM claimed_orders)
          AND status = 'pending_payment'
        RETURNING id AS "orderId"
      )
      SELECT "orderId"
      FROM expired_orders
    `);
    const orderIds = expiredOrders.map((row) => row.orderId);

    await releaseReservationsForOrders(tx, orderIds, 'expired');

    return orderIds.length;
  });
};

export const cleanupExpiredReservations = async (): Promise<{ processedOrders: number }> => {
  let processedOrders = 0;

  while (true) {
    const orderIds = await claimExpiredReservationOrderIds(CLEANUP_BATCH_SIZE);

    if (orderIds.length === 0) {
      break;
    }

    processedOrders += orderIds.length;
  }

  return {
    processedOrders,
  };
};

export const cleanupExpiredPendingOrders = async (): Promise<{ expiredOrders: number }> => {
  let expiredOrders = 0;

  while (true) {
    const batchExpiredOrders = await expirePendingOrdersBatch(CLEANUP_BATCH_SIZE);

    if (batchExpiredOrders === 0) {
      break;
    }

    expiredOrders += batchExpiredOrders;
  }

  return {
    expiredOrders,
  };
};
