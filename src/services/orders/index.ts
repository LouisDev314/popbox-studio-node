import { and, count, desc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import stripe from '../../integrations/stripe';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { customers, orderItems, orders, payments, shipments, tickets } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import { sendShipmentEmail } from '../notifications';
import { getGuestOrderView, getGuestTicketView, getOrderDetailById } from './helpers';
import { assertOrderStatusTransition, OrderStatus } from '../../constants/order-status';
import { clampLimit } from '../../utils/limit';
import { OrdersCursor } from '../../types/order';

const getTicketViewById = async (orderId: string, ticketId: string) => {
  const ticketView = await getGuestTicketView((await getOrderDetailById(orderId)).publicId);
  const ticket = ticketView.tickets.find((item) => item.id === ticketId);

  if (!ticket) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Ticket not found');
  }

  return ticket;
};

export const getGuestOrder = async (publicId: string) => {
  return getGuestOrderView(publicId);
};

export const getGuestTickets = async (publicId: string) => {
  return getGuestTicketView(publicId);
};

export const revealTicket = async (orderId: string, ticketId: string) => {
  const [ticket] = await db
    .select()
    .from(tickets)
    .where(and(eq(tickets.id, ticketId), eq(tickets.orderId, orderId)))
    .limit(1);

  if (!ticket) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Ticket not found');
  }

  if (ticket.revealedAt || ticket.voidedAt) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Ticket is revealed or voided');
  }

  await db
    .update(tickets)
    .set({
      revealedAt: new Date(),
    })
    .where(eq(tickets.id, ticket.id));

  return getTicketViewById(orderId, ticketId);
};

export const revealAllTickets = async (orderId: string) => {
  await db
    .update(tickets)
    .set({
      revealedAt: sql`COALESCE(${tickets.revealedAt}, now())`,
    })
    .where(and(eq(tickets.orderId, orderId), sql`${tickets.voidedAt} IS NULL`, sql`${tickets.revealedAt} IS NULL`));

  return getGuestTicketView((await getOrderDetailById(orderId)).publicId);
};

export const listAdminOrders = async (filters: { status?: OrderStatus; cursor?: string; limit?: number }) => {
  const limit = clampLimit(filters.limit);
  const cursor = decodeCursor<OrdersCursor>(filters.cursor);
  const conditions = filters.status ? [eq(orders.status, filters.status)] : [];

  if (cursor) {
    conditions.push(
      sql`(${orders.createdAt} < ${new Date(cursor.createdAt)} OR (${orders.createdAt} = ${new Date(cursor.createdAt)} AND ${orders.id} < ${cursor.id}))`,
    );
  }

  const rows = await db
    .select({
      order: orders,
      customer: customers,
    })
    .from(orders)
    .innerJoin(customers, eq(customers.id, orders.customerId))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(orders.createdAt), desc(orders.id))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const pageRows = rows.slice(0, limit);
  const lastRow = pageRows.at(-1);

  return {
    items: pageRows.map((row) => ({
      id: row.order.id,
      publicId: row.order.publicId,
      status: row.order.status,
      totalCents: row.order.totalCents,
      currency: row.order.currency,
      placedAt: row.order.placedAt,
      createdAt: row.order.createdAt,
      customer: {
        id: row.customer.id,
        email: row.customer.email,
        firstName: row.customer.firstName,
        lastName: row.customer.lastName,
      },
    })),
    nextCursor:
      hasMore && lastRow
        ? encodeCursor({
            id: lastRow.order.id,
            createdAt: lastRow.order.createdAt.toISOString(),
          })
        : null,
  };
};

export const getAdminOrder = async (orderId: string) => {
  return getOrderDetailById(orderId);
};

export const updateAdminOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);

  if (!order) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
  }

  assertOrderStatusTransition(order.status, nextStatus);

  const updateValues: Partial<typeof orders.$inferInsert> = {
    status: nextStatus,
  };

  if (nextStatus === 'cancelled') updateValues.cancelledAt = new Date();
  if (nextStatus === 'refunded') updateValues.refundedAt = new Date();
  if (nextStatus === 'paid') updateValues.paidAt = order.paidAt ?? new Date();

  const [updated] = await db.update(orders).set(updateValues).where(eq(orders.id, orderId)).returning();
  return updated;
};

export const updateShipment = async (
  orderId: string,
  payload: {
    carrierName?: string | null;
    trackingNumber?: string | null;
    trackingUrl?: string | null;
    deliveredAt?: string | null;
    shippedAt?: string | null;
  },
) => {
  const detail = await getOrderDetailById(orderId);

  if (!['packed', 'shipped'].includes(detail.status)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Order must be packed before shipment can be updated');
  }

  const shipmentData = {
    carrierName: payload.carrierName ?? null,
    trackingNumber: payload.trackingNumber ?? null,
    trackingUrl: payload.trackingUrl ?? null,
    shippedAt: payload.shippedAt ? new Date(payload.shippedAt) : new Date(),
    deliveredAt: payload.deliveredAt ? new Date(payload.deliveredAt) : null,
  };

  const [existingShipment] = await db.select().from(shipments).where(eq(shipments.orderId, orderId)).limit(1);
  if (existingShipment) {
    await db.update(shipments).set(shipmentData).where(eq(shipments.orderId, orderId));
  } else {
    await db.insert(shipments).values({
      orderId,
      ...shipmentData,
    });
  }

  if (detail.status !== 'shipped') {
    await updateAdminOrderStatus(orderId, 'shipped');
  }

  const orderUrl = `${getEnvConfig().clientBaseUrl}/orders/${detail.publicId}`;
  await sendShipmentEmail({
    email: detail.customer.email,
    firstName: detail.customer.firstName,
    orderPublicId: detail.publicId,
    orderUrl,
    carrierName: shipmentData.carrierName,
    trackingNumber: shipmentData.trackingNumber,
    trackingUrl: shipmentData.trackingUrl,
  });

  return getOrderDetailById(orderId);
};

export const refundOrder = async (orderId: string, reason?: string | null) => {
  const [payment, order] = await Promise.all([
    db.select().from(payments).where(eq(payments.orderId, orderId)).limit(1),
    db.select().from(orders).where(eq(orders.id, orderId)).limit(1),
  ]);

  const paymentRow = payment[0];
  const orderRow = order[0];

  if (!paymentRow || !orderRow) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order payment record not found');
  }

  if (!paymentRow.providerPaymentIntentId) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Stripe payment intent is missing for this order');
  }

  if (!['paid', 'packed', 'shipped', 'paid_needs_attention'].includes(orderRow.status)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Only paid orders can be refunded');
  }

  await stripe.refunds.create({
    payment_intent: paymentRow.providerPaymentIntentId,
  });

  await db.transaction(async (tx) => {
    await tx
      .update(orders)
      .set({
        status: 'refunded',
        refundedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    await tx
      .update(payments)
      .set({
        status: 'refunded',
      })
      .where(eq(payments.orderId, orderId));

    await tx
      .update(tickets)
      .set({
        voidedAt: new Date(),
        voidReason: reason ?? 'Refunded by admin',
      })
      .where(eq(tickets.orderId, orderId));
  });

  return getOrderDetailById(orderId);
};

export const listCustomers = async (filters: { cursor?: string; limit?: number }) => {
  const limit = clampLimit(filters.limit);
  const cursor = decodeCursor<OrdersCursor>(filters.cursor);
  const conditions: SQL[] = [];

  if (cursor) {
    conditions.push(
      sql`(${customers.createdAt} < ${new Date(cursor.createdAt)} OR (${customers.createdAt} = ${new Date(cursor.createdAt)} AND ${customers.id} < ${cursor.id}))`,
    );
  }

  const rows = await db
    .select()
    .from(customers)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(customers.createdAt), desc(customers.id))
    .limit(limit + 1);

  const pageRows = rows.slice(0, limit);
  const customerIds = pageRows.map((row) => row.id);
  const orderCounts = customerIds.length
    ? await db
        .select({
          customerId: orders.customerId,
          orderCount: count(orders.id),
        })
        .from(orders)
        .where(inArray(orders.customerId, customerIds))
        .groupBy(orders.customerId)
    : [];
  const countMap = new Map(orderCounts.map((row) => [row.customerId, row.orderCount]));
  const lastRow = pageRows.at(-1);

  return {
    items: pageRows.map((row) => ({
      id: row.id,
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      orderCount: countMap.get(row.id) ?? 0,
      createdAt: row.createdAt,
    })),
    nextCursor:
      rows.length > limit && lastRow
        ? encodeCursor({
            id: lastRow.id,
            createdAt: lastRow.createdAt.toISOString(),
          })
        : null,
  };
};

export const getOrderStats = async () => {
  const [orderCount, itemCount] = await Promise.all([
    db.select({ count: count(orders.id) }).from(orders),
    db.select({ count: count(orderItems.id) }).from(orderItems),
  ]);

  return {
    orderCount: orderCount[0]?.count ?? 0,
    itemCount: itemCount[0]?.count ?? 0,
  };
};
