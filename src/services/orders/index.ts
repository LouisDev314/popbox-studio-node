import { and, count, desc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import stripe from '../../integrations/stripe';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { customers, orderItems, orders, payments, shipments, tickets } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import logger from '../../utils/logger';
import { sendShipmentEmail } from '../notifications';
import { getGuestOrderView, getGuestTicketView, getOrderDetailById } from './helpers';
import { assertOrderStatusTransition, OrderStatus } from '../../constants/order-status';
import { clampLimit } from '../../utils/limit';
import { OrdersCursor } from '../../types/order';
import { releaseReservationsForOrder } from '../checkout/helpers';

const ADMIN_MUTABLE_ORDER_STATUSES = new Set<OrderStatus>(['packed', 'shipped', 'cancelled']);

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
  if (!ADMIN_MUTABLE_ORDER_STATUSES.has(nextStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, `Admins cannot set orders to ${nextStatus}`);
  }

  const [updated] = await db.transaction(async (tx) => {
    const [order] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);

    if (!order) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
    }

    if (nextStatus === 'cancelled' && order.status !== 'pending_payment') {
      throw new Exception(HttpStatusCode.CONFLICT, 'Admins can only cancel unpaid orders');
    }

    if (nextStatus === 'packed' && order.status !== 'paid') {
      throw new Exception(HttpStatusCode.CONFLICT, 'Only paid orders can be packed');
    }

    if (nextStatus === 'shipped' && order.status !== 'packed') {
      throw new Exception(HttpStatusCode.CONFLICT, 'Only packed orders can be marked shipped');
    }

    assertOrderStatusTransition(order.status, nextStatus);

    const updateValues: Partial<typeof orders.$inferInsert> = {
      status: nextStatus,
    };

    if (nextStatus === 'cancelled') {
      await releaseReservationsForOrder(tx, orderId, 'released');
      updateValues.cancelledAt = new Date();
    }

    return tx.update(orders).set(updateValues).where(eq(orders.id, orderId)).returning();
  });

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
  try {
    await sendShipmentEmail({
      email: detail.customer.email,
      firstName: detail.customer.firstName,
      orderPublicId: detail.publicId,
      orderUrl,
      carrierName: shipmentData.carrierName,
      trackingNumber: shipmentData.trackingNumber,
      trackingUrl: shipmentData.trackingUrl,
    });
  } catch (emailError) {
    logger.error({ orderId, emailError }, 'Failed to send shipment email');
  }

  return getOrderDetailById(orderId);
};

export const refundOrder = async (orderId: string, amountCents?: number, reason?: string | null) => {
  const [payment, order, orderTickets] = await Promise.all([
    db.select().from(payments).where(eq(payments.orderId, orderId)).limit(1),
    db.select().from(orders).where(eq(orders.id, orderId)).limit(1),
    db
      .select({
        id: tickets.id,
        revealedAt: tickets.revealedAt,
      })
      .from(tickets)
      .where(eq(tickets.orderId, orderId)),
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

  if (orderTickets.some((ticket) => ticket.revealedAt)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Kuji tickets cannot be refunded after reveal');
  }

  const refundableAmountCents = paymentRow.amountCents - paymentRow.refundedAmountCents;

  if (refundableAmountCents <= 0) {
    throw new Exception(HttpStatusCode.CONFLICT, 'No refundable amount remains for this order');
  }

  const requestedRefundAmountCents = amountCents ?? refundableAmountCents;

  if (requestedRefundAmountCents > refundableAmountCents) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Refund amount exceeds the remaining refundable amount');
  }

  try {
    await stripe.refunds.create({
      payment_intent: paymentRow.providerPaymentIntentId,
      amount: requestedRefundAmountCents,
    });
  } catch (error) {
    logger.error({ error, orderId, requestedRefundAmountCents }, 'Stripe refund request failed');
    throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to create Stripe refund');
  }

  await db.transaction(async (tx) => {
    const [lockedOrder] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    const [lockedPayment] = await tx.select().from(payments).where(eq(payments.orderId, orderId)).limit(1);

    if (!lockedOrder || !lockedPayment) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Order payment record not found');
    }

    if (!['paid', 'packed', 'shipped', 'paid_needs_attention'].includes(lockedOrder.status)) {
      throw new Exception(HttpStatusCode.CONFLICT, 'Only paid orders can be refunded');
    }

    const lockedRefundableAmountCents = lockedPayment.amountCents - lockedPayment.refundedAmountCents;

    if (requestedRefundAmountCents > lockedRefundableAmountCents) {
      throw new Exception(HttpStatusCode.CONFLICT, 'Refund amount exceeds the remaining refundable amount');
    }

    const nextRefundedAmountCents = lockedPayment.refundedAmountCents + requestedRefundAmountCents;
    const isFullyRefunded = nextRefundedAmountCents >= lockedPayment.amountCents;

    await tx
      .update(payments)
      .set({
        refundedAmountCents: nextRefundedAmountCents,
        status: isFullyRefunded ? 'refunded' : lockedPayment.status,
      })
      .where(eq(payments.orderId, orderId));

    await tx
      .update(orders)
      .set({
        status: isFullyRefunded ? 'refunded' : lockedOrder.status,
        refundedAt: isFullyRefunded ? new Date() : lockedOrder.refundedAt,
      })
      .where(eq(orders.id, orderId));

    if (isFullyRefunded) {
      await tx
        .update(tickets)
        .set({
          voidedAt: new Date(),
          voidReason: reason ?? 'Refunded by admin',
        })
        .where(eq(tickets.orderId, orderId));
    }
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
