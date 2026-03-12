import { sql } from 'drizzle-orm';
import { db } from '../db';
import { releaseReservationsForOrders } from '../services/checkout/helpers';
import { orders } from '../db/schema';

const CLEANUP_BATCH_SIZE = 100;

const claimOrderIdsWithExpiredReservations = async (limit: number, status: 'pending_payment' | 'expired') => {
  return await db.transaction(async (tx) => {
    const result = await tx.execute<{ orderId: string }>(sql`
      SELECT o.id AS "orderId"
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
    const orderIds = result.map((row) => row.orderId);

    if (status === 'pending_payment' && orderIds.length > 0) {
      await tx
        .update(orders)
        .set({
          status: 'expired',
        })
        .where(sql`${orders.id} IN (${sql.join(orderIds.map((orderId) => sql`${orderId}`), sql`, `)})`);
    }

    await releaseReservationsForOrders(tx, orderIds, 'expired');

    return orderIds;
  });
};

export const cleanupExpiredReservations = async (): Promise<{ processedOrders: number }> => {
  let processedOrders = 0;

  while (true) {
    const orderIds = await claimOrderIdsWithExpiredReservations(CLEANUP_BATCH_SIZE, 'expired');

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
    const batchExpiredOrders = await claimOrderIdsWithExpiredReservations(CLEANUP_BATCH_SIZE, 'pending_payment');

    if (batchExpiredOrders.length === 0) {
      break;
    }

    expiredOrders += batchExpiredOrders.length;
  }

  return {
    expiredOrders,
  };
};
