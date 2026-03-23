import { and, count, desc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { createHash } from 'crypto';
import type Stripe from 'stripe';
import stripe from '../../integrations/stripe';
import { db } from '../../db';
import { customers, orderItems, orders, paymentRefunds, payments, shipments, tickets } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import logger from '../../utils/logger';
import { buildGuestOrderAccessUrl } from '../../utils/guest-order-access';
import { sendShipmentEmail } from '../notifications';
import { getGuestOrderView, getGuestTicketView, getOrderDetailById } from './helpers';
import { assertOrderStatusTransition, OrderStatus } from '../../constants/order-status';
import { clampLimit } from '../../utils/limit';
import { OrdersCursor } from '../../types/order';
import { releaseReservationsForOrder, sendOrderConfirmationEmailForOrder } from '../checkout/helpers';
import { releaseAdvisoryLock, tryAcquireAdvisoryLock } from '../../jobs/advisory-lock';

const ADMIN_MUTABLE_ORDER_STATUSES = new Set<OrderStatus>(['packed', 'shipped', 'cancelled']);
const NON_FAILED_REFUND_STATUSES = new Set(['pending', 'succeeded', 'requires_action']);

type RefundContext = {
  order: typeof orders.$inferSelect;
  payment: typeof payments.$inferSelect;
};

const KUJI_ORDER_ACTION_LOCK_PREFIX = 'orders:kuji-action';
const REVEALABLE_ORDER_STATUSES = new Set<OrderStatus>(['paid', 'packed', 'shipped']);

const withOrderActionLock = async <T>(orderId: string, action: string, work: () => Promise<T>) => {
  const lockHandle = await tryAcquireAdvisoryLock(`${KUJI_ORDER_ACTION_LOCK_PREFIX}:${orderId}`);

  if (!lockHandle) {
    throw new Exception(HttpStatusCode.CONFLICT, `Order is busy processing ${action}. Retry shortly.`);
  }

  try {
    return await work();
  } finally {
    await releaseAdvisoryLock(lockHandle);
  }
};

const loadLockedOrder = async (
  tx: Parameters<typeof db.transaction>[0] extends (tx: infer T) => Promise<unknown> ? T : never,
  orderId: string,
) => {
  const result = await tx.execute<typeof orders.$inferSelect>(sql`
    SELECT *
    FROM orders
    WHERE id = ${orderId}
    FOR UPDATE
  `);

  const lockedOrder = result[0];

  if (!lockedOrder) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
  }

  return lockedOrder;
};

const buildRefundIdempotencyKey = (params: {
  orderId: string;
  paymentId: string;
  alreadyRefundedAmountCents: number;
  requestedRefundAmountCents: number;
}) => {
  return createHash('sha256')
    .update(
      `${params.orderId}:${params.paymentId}:${params.alreadyRefundedAmountCents}:${params.requestedRefundAmountCents}:stripe-refund`,
    )
    .digest('hex');
};

const normalizeStripeRefundStatus = (status: string | null | undefined) => status?.trim().toLowerCase() || 'unknown';

const upsertRefundRecord = async (
  tx: Parameters<typeof db.transaction>[0] extends (tx: infer T) => Promise<unknown> ? T : never,
  params: {
    orderId: string;
    paymentId: string;
    refund: Stripe.Refund;
    idempotencyKey?: string | null;
  },
) => {
  const normalizedStatus = normalizeStripeRefundStatus(params.refund.status);

  await tx
    .insert(paymentRefunds)
    .values({
      paymentId: params.paymentId,
      orderId: params.orderId,
      providerRefundId: params.refund.id,
      idempotencyKey: params.idempotencyKey ?? params.refund.metadata?.refundIdempotencyKey ?? null,
      amountCents: params.refund.amount,
      currency: (params.refund.currency ?? 'cad').toUpperCase(),
      status: normalizedStatus,
      reason: params.refund.reason ?? null,
      providerCreatedAt: new Date(params.refund.created * 1000),
      rawResponse: params.refund as unknown as Record<string, unknown>,
    })
    .onConflictDoUpdate({
      target: paymentRefunds.providerRefundId,
      set: {
        idempotencyKey: params.idempotencyKey ?? params.refund.metadata?.refundIdempotencyKey ?? null,
        amountCents: params.refund.amount,
        currency: (params.refund.currency ?? 'cad').toUpperCase(),
        status: normalizedStatus,
        reason: params.refund.reason ?? null,
        providerCreatedAt: new Date(params.refund.created * 1000),
        rawResponse: params.refund as unknown as Record<string, unknown>,
        updatedAt: new Date(),
      },
    });
};

const syncRefundAggregate = async (
  tx: Parameters<typeof db.transaction>[0] extends (tx: infer T) => Promise<unknown> ? T : never,
  context: RefundContext & {
    ticketVoidReason?: string | null | undefined;
  },
) => {
  const refunds = await tx.select().from(paymentRefunds).where(eq(paymentRefunds.paymentId, context.payment.id));
  const refundedAmountCents = refunds
    .filter((refund) => NON_FAILED_REFUND_STATUSES.has(normalizeStripeRefundStatus(refund.status)))
    .reduce((sum, refund) => sum + refund.amountCents, 0);
  const isFullyRefunded = refundedAmountCents >= context.payment.amountCents;
  const hasRefundDrift = context.order.status === 'refunded' && !isFullyRefunded;

  await tx
    .update(payments)
    .set({
      refundedAmountCents,
      status: isFullyRefunded ? 'refunded' : context.payment.status === 'refunded' ? 'paid' : context.payment.status,
    })
    .where(eq(payments.id, context.payment.id));

  await tx
    .update(orders)
    .set({
      status: isFullyRefunded
        ? 'refunded'
        : hasRefundDrift
          ? 'paid_needs_attention'
          : context.order.status === 'refunded'
            ? 'paid_needs_attention'
            : context.order.status,
      refundedAt: isFullyRefunded ? new Date() : null,
    })
    .where(eq(orders.id, context.order.id));

  if (isFullyRefunded) {
    const ticketVoidReason = context.ticketVoidReason ?? 'Refunded by admin';
    await tx
      .update(tickets)
      .set({
        voidedAt: sql`COALESCE(${tickets.voidedAt}, now())`,
        voidReason: sql`COALESCE(${tickets.voidReason}, ${ticketVoidReason})`,
      })
      .where(eq(tickets.orderId, context.order.id));
  }

  return {
    refundedAmountCents,
    refundCount: refunds.length,
    isFullyRefunded,
    hasRefundDrift,
  };
};

const getRefundContext = async (orderId: string) => {
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

  return {
    payment: paymentRow,
    order: orderRow,
    orderTickets,
  };
};

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

const findTicketOrderStatus = async (orderId: string) => {
  const [order] = await db.select({ status: orders.status }).from(orders).where(eq(orders.id, orderId)).limit(1);

  if (!order) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
  }

  if (!REVEALABLE_ORDER_STATUSES.has(order.status)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Tickets cannot be revealed for this order');
  }
};

export const revealTicket = async (orderId: string, ticketId: string) => {
  return withOrderActionLock(orderId, 'ticket reveal', async () => {
    await findTicketOrderStatus(orderId);

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
  });
};

export const revealAllTickets = async (orderId: string) => {
  return withOrderActionLock(orderId, 'ticket reveal', async () => {
    await findTicketOrderStatus(orderId);

    await db
      .update(tickets)
      .set({
        revealedAt: sql`COALESCE(${tickets.revealedAt}, now())`,
      })
      .where(and(eq(tickets.orderId, orderId), sql`${tickets.voidedAt} IS NULL`, sql`${tickets.revealedAt} IS NULL`));

    return getGuestTicketView((await getOrderDetailById(orderId)).publicId);
  });
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
      includesLastOnePrize: row.order.includesLastOnePrize,
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

export const resendAdminOrderConfirmation = async (orderId: string, adminUserId?: string) => {
  const result = await sendOrderConfirmationEmailForOrder(orderId, {
    force: true,
    failOnIneligible: true,
    failOnLockUnavailable: true,
    trigger: 'admin_resend',
  });

  if (!result) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Order confirmation resend completed without a result');
  }

  logger.info(
    {
      adminUserId: adminUserId ?? null,
      orderId: result.id,
      publicId: result.publicId,
      status: result.status,
      email: result.email,
      confirmationEmailSentAt: result.confirmationEmailSentAt,
    },
    'Admin resent order confirmation email',
  );

  return result;
};

export const updateAdminOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
  if (!ADMIN_MUTABLE_ORDER_STATUSES.has(nextStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, `Admins cannot set orders to ${nextStatus}`);
  }

  if (nextStatus === 'paid') {
    throw new Exception(
      HttpStatusCode.CONFLICT,
      'Admins cannot manually normalize paid_needs_attention orders to paid',
    );
  }

  const [updated] = await withOrderActionLock(orderId, 'admin status update', async () =>
    db.transaction(async (tx) => {
      const order = await loadLockedOrder(tx, orderId);

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
    }),
  );

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
  const shipmentData = {
    carrierName: payload.carrierName ?? null,
    trackingNumber: payload.trackingNumber ?? null,
    trackingUrl: payload.trackingUrl ?? null,
    shippedAt: payload.shippedAt ? new Date(payload.shippedAt) : new Date(),
    deliveredAt: payload.deliveredAt ? new Date(payload.deliveredAt) : null,
  };

  await withOrderActionLock(orderId, 'shipment update', async () => {
    await db.transaction(async (tx) => {
      const order = await loadLockedOrder(tx, orderId);

      if (!['packed', 'shipped'].includes(order.status)) {
        throw new Exception(HttpStatusCode.CONFLICT, 'Order must be packed before shipment can be updated');
      }

      const [existingShipment] = await tx.select().from(shipments).where(eq(shipments.orderId, orderId)).limit(1);
      if (existingShipment) {
        await tx.update(shipments).set(shipmentData).where(eq(shipments.orderId, orderId));
      } else {
        await tx.insert(shipments).values({
          orderId,
          ...shipmentData,
        });
      }

      if (order.status !== 'shipped') {
        assertOrderStatusTransition(order.status, 'shipped');
        await tx
          .update(orders)
          .set({
            status: 'shipped',
          })
          .where(eq(orders.id, orderId));
      }
    });
  });

  const detail = await getOrderDetailById(orderId);
  const orderUrl = buildGuestOrderAccessUrl(detail.publicId);
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
  return withOrderActionLock(orderId, 'refund', async () => {
    const { payment: paymentRow, order: orderRow, orderTickets } = await getRefundContext(orderId);

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
    const refundIdempotencyKey = buildRefundIdempotencyKey({
      orderId,
      paymentId: paymentRow.id,
      alreadyRefundedAmountCents: paymentRow.refundedAmountCents,
      requestedRefundAmountCents,
    });

    if (requestedRefundAmountCents > refundableAmountCents) {
      throw new Exception(HttpStatusCode.CONFLICT, 'Refund amount exceeds the remaining refundable amount');
    }

    let stripeRefund: Stripe.Refund;
    try {
      stripeRefund = await stripe.refunds.create(
        {
          payment_intent: paymentRow.providerPaymentIntentId,
          amount: requestedRefundAmountCents,
          metadata: {
            orderId,
            paymentId: paymentRow.id,
            refundIdempotencyKey,
          },
        },
        {
          idempotencyKey: refundIdempotencyKey,
        },
      );
    } catch (error) {
      logger.error({ error, orderId, requestedRefundAmountCents }, 'Stripe refund request failed');
      throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to create Stripe refund');
    }

    try {
      await db.transaction(async (tx) => {
        const lockedOrder = await loadLockedOrder(tx, orderId);
        const [lockedPayment] = await tx.select().from(payments).where(eq(payments.orderId, orderId)).limit(1);
        const lockedOrderTickets = await tx
          .select({
            id: tickets.id,
            revealedAt: tickets.revealedAt,
          })
          .from(tickets)
          .where(eq(tickets.orderId, orderId));

        if (!lockedPayment) {
          throw new Exception(HttpStatusCode.NOT_FOUND, 'Order payment record not found');
        }

        if (!['paid', 'packed', 'shipped', 'paid_needs_attention'].includes(lockedOrder.status)) {
          throw new Exception(HttpStatusCode.CONFLICT, 'Only paid orders can be refunded');
        }

        if (lockedOrderTickets.some((ticket) => ticket.revealedAt)) {
          throw new Exception(HttpStatusCode.CONFLICT, 'Kuji tickets cannot be refunded after reveal');
        }

        const lockedRefundableAmountCents = lockedPayment.amountCents - lockedPayment.refundedAmountCents;

        if (requestedRefundAmountCents > lockedRefundableAmountCents) {
          throw new Exception(HttpStatusCode.CONFLICT, 'Refund amount exceeds the remaining refundable amount');
        }

        await upsertRefundRecord(tx, {
          orderId,
          paymentId: lockedPayment.id,
          refund: stripeRefund,
          idempotencyKey: refundIdempotencyKey,
        });

        await syncRefundAggregate(tx, {
          order: lockedOrder,
          payment: lockedPayment,
          ticketVoidReason: reason,
        });
      });
    } catch (error) {
      logger.error(
        { error, orderId, stripeRefundId: stripeRefund.id },
        'Stripe refund succeeded but local refund persistence failed',
      );

      try {
        await db.transaction(async (tx) => {
          const lockedOrder = await loadLockedOrder(tx, orderId);

          await tx
            .update(orders)
            .set({
              status: 'paid_needs_attention',
            })
            .where(eq(orders.id, lockedOrder.id));
        });
      } catch (fallbackError) {
        logger.error(
          { error: fallbackError, orderId, stripeRefundId: stripeRefund.id },
          'Failed to force order into manual attention after Stripe refund success',
        );
      }

      throw new Exception(
        HttpStatusCode.BAD_GATEWAY,
        'Refund succeeded in Stripe but local reconciliation is required',
      );
    }

    return getOrderDetailById(orderId);
  });
};

export const reconcileOrderRefunds = async (orderId: string) => {
  const { payment } = await getRefundContext(orderId);

  if (!payment.providerPaymentIntentId) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Stripe payment intent is missing for this order');
  }

  let stripeRefundList: Stripe.ApiList<Stripe.Refund>;
  try {
    stripeRefundList = await stripe.refunds.list({
      payment_intent: payment.providerPaymentIntentId,
      limit: 100,
    });
  } catch (error) {
    logger.error({ error, orderId }, 'Stripe refund reconciliation fetch failed');
    throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to fetch Stripe refunds for reconciliation');
  }

  const summary = await db.transaction(async (tx) => {
    const [lockedOrder] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    const [lockedPayment] = await tx.select().from(payments).where(eq(payments.orderId, orderId)).limit(1);

    if (!lockedOrder || !lockedPayment) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Order payment record not found');
    }

    for (const refund of stripeRefundList.data) {
      await upsertRefundRecord(tx, {
        orderId,
        paymentId: payment.id,
        refund,
      });
    }

    return syncRefundAggregate(tx, { order: lockedOrder, payment: lockedPayment });
  });

  const localRefunds = await db
    .select({
      providerRefundId: paymentRefunds.providerRefundId,
      amountCents: paymentRefunds.amountCents,
      currency: paymentRefunds.currency,
      status: paymentRefunds.status,
      reason: paymentRefunds.reason,
      providerCreatedAt: paymentRefunds.providerCreatedAt,
    })
    .from(paymentRefunds)
    .where(eq(paymentRefunds.orderId, orderId))
    .orderBy(desc(paymentRefunds.providerCreatedAt), desc(paymentRefunds.createdAt));

  return {
    order: await getOrderDetailById(orderId),
    summary: {
      stripeRefundCount: stripeRefundList.data.length,
      localRefundCount: localRefunds.length,
      refundedAmountCents: summary.refundedAmountCents,
      isFullyRefunded: summary.isFullyRefunded,
      hasRefundDrift: summary.hasRefundDrift,
    },
    refunds: localRefunds,
  };
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
