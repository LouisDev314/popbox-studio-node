import { and, count, desc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { createHash } from 'crypto';
import type Stripe from 'stripe';
import stripe from '../../integrations/stripe';
import { db } from '../../db';
import { customers, orders, paymentRefunds, payments, shipments, tickets } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import logger from '../../utils/logger';
import { buildGuestOrderAccessUrl } from '../../utils/guest-order-access';
import { buildStripeRefundSnapshot } from '../../utils/stripe';
import { sendRefundEmail, sendShipmentEmail, sendShipmentUpdateEmail } from '../notifications';
import {
  getGuestOrderViewByOrderId,
  getGuestTicketViewById,
  getGuestTicketViewByOrderId,
  getOrderDetailById,
} from './helpers';
import { assertOrderStatusTransition, isRefundableOrderStatus, OrderStatus } from '../../constants/order-status';
import { clampLimit } from '../../utils/limit';
import type { OrderDetailView, OrdersCursor } from '../../types/order';
import {
  isPlaceholderCustomerEmail,
  normalizeEmail,
  releaseReservationsForOrder,
  sendOrderConfirmationEmailForOrder,
} from '../checkout/helpers';
import { releaseAdvisoryLock, tryAcquireAdvisoryLock } from '../../jobs/advisory-lock';

const ADMIN_MUTABLE_ORDER_STATUSES = new Set<OrderStatus>(['packed', 'shipped', 'cancelled']);
const NON_FAILED_REFUND_STATUSES = new Set(['pending', 'succeeded', 'requires_action']);
const NON_FAILED_REFUND_STATUS_LIST = [...NON_FAILED_REFUND_STATUSES];

type RefundContext = {
  order: typeof orders.$inferSelect;
  payment: typeof payments.$inferSelect;
};

const KUJI_ORDER_ACTION_LOCK_PREFIX = 'orders:kuji-action';
const REVEALABLE_ORDER_STATUSES = new Set<OrderStatus>(['paid', 'packed', 'shipped']);

const withOrderActionLock = async <T>(orderId: string, action: string, work: () => Promise<T>) => {
  const lockAcquireStart = Date.now();
  let lockHandle;

  try {
    lockHandle = await tryAcquireAdvisoryLock(`${KUJI_ORDER_ACTION_LOCK_PREFIX}:${orderId}`);
  } catch (error) {
    logger.error(
      {
        error,
        orderId,
        action,
        acquireMs: Date.now() - lockAcquireStart,
      },
      'order action lock acquire failed',
    );
    throw error;
  }

  const acquireMs = Date.now() - lockAcquireStart;

  if (!lockHandle) {
    logger.warn(
      {
        orderId,
        action,
        acquireMs,
      },
      'order action lock unavailable',
    );
    throw new Exception(HttpStatusCode.CONFLICT, `Order is busy processing ${action}. Retry shortly.`);
  }

  logger.info(
    {
      orderId,
      action,
      acquireMs,
    },
    'order action lock acquired',
  );

  const lockHoldStart = Date.now();
  let workResult: T | undefined;
  try {
    workResult = await work();
    return workResult;
  } finally {
    const releaseStart = Date.now();
    try {
      await releaseAdvisoryLock(lockHandle);
      logger.info(
        {
          orderId,
          action,
          acquireMs,
          holdMs: Date.now() - lockHoldStart,
          releaseMs: Date.now() - releaseStart,
          totalMs: Date.now() - lockAcquireStart,
        },
        'order action lock released',
      );
    } catch (error) {
      logger.error(
        {
          error,
          orderId,
          action,
          acquireMs,
          holdMs: Date.now() - lockHoldStart,
          totalMs: Date.now() - lockAcquireStart,
          workCompleted: workResult !== undefined,
        },
        'order action lock release failed',
      );
    }
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

const normalizeRefundReason = (reason: string | null | undefined) => {
  const trimmed = reason?.trim();
  return trimmed ? trimmed : null;
};

const resolveNullableTextPatch = (input: string | null | undefined, currentValue: string | null) => {
  return input === undefined ? currentValue : input;
};

const resolveNullableDatePatch = (input: string | null | undefined, currentValue: Date | null) => {
  if (input === undefined) {
    return currentValue;
  }

  return input ? new Date(input) : null;
};

const getDeliverableOrderEmail = (email: string) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || isPlaceholderCustomerEmail(normalizedEmail)) {
    throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Order does not have a deliverable customer email');
  }

  return normalizedEmail;
};

const hasMeaningfulShipmentChange = (
  currentShipment: typeof shipments.$inferSelect | undefined,
  nextShipment: Pick<typeof shipments.$inferInsert, 'carrierName' | 'trackingNumber' | 'trackingUrl'>,
) =>
  (currentShipment?.carrierName ?? null) !== (nextShipment.carrierName ?? null) ||
  (currentShipment?.trackingNumber ?? null) !== (nextShipment.trackingNumber ?? null) ||
  (currentShipment?.trackingUrl ?? null) !== (nextShipment.trackingUrl ?? null);

const sendOrderLifecycleEmailSafely = async (params: {
  orderId: string;
  action: 'shipped' | 'shipment_updated' | 'refund';
  detail: OrderDetailView;
  metadata?: Record<string, unknown>;
  send: (email: string, orderUrl: string) => Promise<void>;
}) => {
  let email: string;

  try {
    email = getDeliverableOrderEmail(params.detail.customer.email);
  } catch (error) {
    logger.warn(
      {
        error,
        action: params.action,
        orderId: params.orderId,
        publicId: params.detail.publicId,
        customerEmail: params.detail.customer.email,
        ...(params.metadata ?? {}),
      },
      'Skipping order lifecycle email because the order has no deliverable customer email',
    );
    return;
  }

  const orderUrl = buildGuestOrderAccessUrl(params.detail.publicId);

  try {
    await params.send(email, orderUrl);
    logger.info(
      {
        action: params.action,
        orderId: params.orderId,
        publicId: params.detail.publicId,
        email,
        ...(params.metadata ?? {}),
      },
      'Order lifecycle email sent',
    );
  } catch (error) {
    logger.error(
      {
        error,
        action: params.action,
        orderId: params.orderId,
        publicId: params.detail.publicId,
        email,
        ...(params.metadata ?? {}),
      },
      'Order lifecycle email send failed',
    );
  }
};

const sendOrderShippedEmailSafely = async (params: {
  orderId: string;
  detail: OrderDetailView;
}) => {
  const shipment = params.detail.shipment;

  await sendOrderLifecycleEmailSafely({
    orderId: params.orderId,
    action: 'shipped',
    detail: params.detail,
    metadata: {
      trackingNumber: shipment?.trackingNumber ?? null,
    },
    send: (email, orderUrl) => {
      const shipmentEmailParams = {
        email,
        firstName: params.detail.customer.firstName,
        orderPublicId: params.detail.publicId,
        orderUrl,
        ...(shipment
          ? {
              carrierName: shipment.carrierName,
              trackingNumber: shipment.trackingNumber,
              trackingUrl: shipment.trackingUrl,
            }
          : {}),
      };

      return sendShipmentEmail(shipmentEmailParams);
    },
  });
};

const sendOrderShipmentUpdatedEmailSafely = async (params: {
  orderId: string;
  detail: OrderDetailView;
}) => {
  const shipment = params.detail.shipment;

  await sendOrderLifecycleEmailSafely({
    orderId: params.orderId,
    action: 'shipment_updated',
    detail: params.detail,
    metadata: {
      trackingNumber: shipment?.trackingNumber ?? null,
    },
    send: (email, orderUrl) => {
      const shipmentEmailParams = {
        email,
        firstName: params.detail.customer.firstName,
        orderPublicId: params.detail.publicId,
        orderUrl,
        ...(shipment
          ? {
              carrierName: shipment.carrierName,
              trackingNumber: shipment.trackingNumber,
              trackingUrl: shipment.trackingUrl,
            }
          : {}),
      };

      return sendShipmentUpdateEmail(shipmentEmailParams);
    },
  });
};

const buildRefundIdempotencyKey = (params: {
  orderId: string;
  paymentId: string;
  requestedRefundAmountCents: number;
  requestedReason: string | null;
}) => {
  // Keep identical admin refund requests stable across simple retries.
  return createHash('sha256')
    .update(
      `${params.orderId}:${params.paymentId}:${params.requestedRefundAmountCents}:${params.requestedReason ?? ''}:stripe-refund`,
    )
    .digest('hex');
};

const normalizeStripeRefundStatus = (status: string | null | undefined) => status?.trim().toLowerCase() || 'unknown';

const listAllStripeRefunds = async (paymentIntentId: string) => {
  const refunds: Stripe.Refund[] = [];
  let startingAfter: string | undefined;

  for (;;) {
    const page = await stripe.refunds.list({
      payment_intent: paymentIntentId,
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    refunds.push(...page.data);

    if (!page.has_more || page.data.length === 0) {
      return refunds;
    }

    startingAfter = page.data.at(-1)?.id;

    if (!startingAfter) {
      return refunds;
    }
  }
};

const upsertRefundRecord = async (
  tx: Parameters<typeof db.transaction>[0] extends (tx: infer T) => Promise<unknown> ? T : never,
  params: {
    orderId: string;
    paymentId: string;
    refund: Stripe.Refund;
    idempotencyKey?: string | null;
    requestedReason?: string | null;
  },
) => {
  const normalizedStatus = normalizeStripeRefundStatus(params.refund.status);
  const refundReason = normalizeRefundReason(params.requestedReason) ?? params.refund.reason ?? null;

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
      reason: refundReason,
      providerCreatedAt: new Date(params.refund.created * 1000),
      rawResponse: buildStripeRefundSnapshot(params.refund),
    })
    .onConflictDoUpdate({
      target: paymentRefunds.providerRefundId,
      set: {
        idempotencyKey: params.idempotencyKey ?? params.refund.metadata?.refundIdempotencyKey ?? null,
        amountCents: params.refund.amount,
        currency: (params.refund.currency ?? 'cad').toUpperCase(),
        status: normalizedStatus,
        reason: refundReason,
        providerCreatedAt: new Date(params.refund.created * 1000),
        rawResponse: buildStripeRefundSnapshot(params.refund),
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
  const [refundAggregate] = await tx
    .select({
      refundCount: count(paymentRefunds.id),
      refundedAmountCents:
        sql<number>`COALESCE(SUM(CASE WHEN ${paymentRefunds.status} IN (${sql.join(
          NON_FAILED_REFUND_STATUS_LIST.map((status) => sql`${status}`),
          sql`, `,
        )}) THEN ${paymentRefunds.amountCents} ELSE 0 END), 0)::int`,
    })
    .from(paymentRefunds)
    .where(eq(paymentRefunds.paymentId, context.payment.id));
  const refundedAmountCents = refundAggregate?.refundedAmountCents ?? 0;
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
    refundCount: refundAggregate?.refundCount ?? 0,
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

export const getGuestOrderById = async (orderId: string) => {
  return getGuestOrderViewByOrderId(orderId);
};

export const getGuestTicketsByOrderId = async (orderId: string) => {
  return getGuestTicketViewByOrderId(orderId);
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

const loadRevealTicketContext = async (orderId: string, ticketId: string) => {
  const [row] = await db
    .select({
      orderStatus: orders.status,
      ticketId: tickets.id,
      revealedAt: tickets.revealedAt,
      voidedAt: tickets.voidedAt,
    })
    .from(orders)
    .leftJoin(tickets, and(eq(tickets.orderId, orders.id), eq(tickets.id, ticketId)))
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!row) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
  }

  if (!REVEALABLE_ORDER_STATUSES.has(row.orderStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Tickets cannot be revealed for this order');
  }

  if (!row.ticketId) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Ticket not found');
  }

  return {
    orderStatus: row.orderStatus,
    ticketId: row.ticketId,
    revealedAt: row.revealedAt,
    voidedAt: row.voidedAt,
  };
};

export const revealTicket = async (orderId: string, ticketId: string) => {
  const totalStart = Date.now();
  let noop = false;

  try {
    const result = await withOrderActionLock(orderId, 'ticket reveal', async () => {
      const ticket = await loadRevealTicketContext(orderId, ticketId);

      if (ticket.voidedAt) {
        throw new Exception(HttpStatusCode.CONFLICT, 'Ticket is voided');
      }

      if (!ticket.revealedAt) {
        await db
          .update(tickets)
          .set({
            revealedAt: new Date(),
          })
          .where(eq(tickets.id, ticket.ticketId));
      } else {
        noop = true;
      }

      return getGuestTicketViewById(orderId, ticketId);
    });

    logger.info(
      {
        orderId,
        ticketId,
        totalMs: Date.now() - totalStart,
        noop,
      },
      'revealTicket end',
    );
    return result;
  } catch (error) {
    logger.error(
      {
        orderId,
        ticketId,
        totalMs: Date.now() - totalStart,
        noop,
        error,
      },
      'revealTicket end',
    );
    throw error;
  }
};

export const revealAllTickets = async (orderId: string) => {
  const totalStart = Date.now();

  try {
    const result = await withOrderActionLock(orderId, 'ticket reveal', async () => {
      await findTicketOrderStatus(orderId);

      await db
        .update(tickets)
        .set({
          revealedAt: sql`COALESCE(${tickets.revealedAt}, now())`,
        })
        .where(and(eq(tickets.orderId, orderId), sql`${tickets.voidedAt} IS NULL`, sql`${tickets.revealedAt} IS NULL`));

      return getGuestTicketViewByOrderId(orderId);
    });

    logger.info(
      {
        orderId,
        totalMs: Date.now() - totalStart,
      },
      'revealAllTickets end',
    );
    return result;
  } catch (error) {
    logger.error(
      {
        orderId,
        totalMs: Date.now() - totalStart,
        error,
      },
      'revealAllTickets end',
    );
    throw error;
  }
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
      order: {
        id: orders.id,
        publicId: orders.publicId,
        status: orders.status,
        includesLastOnePrize: orders.includesLastOnePrize,
        totalCents: orders.totalCents,
        currency: orders.currency,
        placedAt: orders.placedAt,
        createdAt: orders.createdAt,
      },
      customer: {
        id: customers.id,
        email: customers.email,
        firstName: customers.firstName,
        lastName: customers.lastName,
      },
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
  const [order] = await db
    .select({
      id: orders.id,
      publicId: orders.publicId,
      status: orders.status,
      confirmationEmailSentAt: orders.confirmationEmailSentAt,
    })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!order) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
  }

  if (order.status === 'refunded') {
    const detail = await getOrderDetailById(orderId);
    const email = getDeliverableOrderEmail(detail.customer.email);

    await sendRefundEmail({
      email,
      firstName: detail.customer.firstName,
      orderPublicId: detail.publicId,
      orderUrl: buildGuestOrderAccessUrl(detail.publicId),
      amountCents: detail.totalCents,
      currency: detail.currency,
      isFullyRefunded: true,
    });

    logger.info(
      {
        adminUserId: adminUserId ?? null,
        orderId: detail.id,
        publicId: detail.publicId,
        status: detail.status,
        email,
        confirmationEmailSentAt: order.confirmationEmailSentAt,
      },
      'Admin resent refund email for refunded order',
    );

    return {
      id: detail.id,
      publicId: detail.publicId,
      status: detail.status,
      email,
      confirmationEmailSentAt: order.confirmationEmailSentAt,
    };
  }

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

export const markOrderPacked = async (orderId: string) => {
  await withOrderActionLock(orderId, 'mark packed', async () => {
    await db.transaction(async (tx) => {
      const order = await loadLockedOrder(tx, orderId);

      if (order.status !== 'paid') {
        throw new Exception(HttpStatusCode.CONFLICT, 'Only paid orders can be packed');
      }

      assertOrderStatusTransition(order.status, 'packed');

      await tx
        .update(orders)
        .set({
          status: 'packed',
        })
        .where(eq(orders.id, orderId));
    });
  });

  return getOrderDetailById(orderId);
};

export const updateAdminOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
  if (!ADMIN_MUTABLE_ORDER_STATUSES.has(nextStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, `Admins cannot set orders to ${nextStatus}`);
  }

  if (nextStatus === 'packed') {
    return markOrderPacked(orderId);
  }

  await withOrderActionLock(orderId, 'admin status update', async () => {
    await db.transaction(async (tx) => {
      const order = await loadLockedOrder(tx, orderId);

      if (nextStatus === 'cancelled' && order.status !== 'pending_payment') {
        throw new Exception(HttpStatusCode.CONFLICT, 'Admins can only cancel unpaid orders');
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

      await tx.update(orders).set(updateValues).where(eq(orders.id, orderId));
    });
  });

  return getOrderDetailById(orderId);
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
  let didTransitionToShipped = false;
  let didUpdateShipmentDetails = false;

  await withOrderActionLock(orderId, 'shipment update', async () => {
    await db.transaction(async (tx) => {
      const order = await loadLockedOrder(tx, orderId);

      if (!['packed', 'shipped'].includes(order.status)) {
        throw new Exception(HttpStatusCode.CONFLICT, 'Order must be packed before shipment can be updated');
      }

      const [existingShipment] = await tx.select().from(shipments).where(eq(shipments.orderId, orderId)).limit(1);
      const shipmentData = {
        carrierName: resolveNullableTextPatch(payload.carrierName, existingShipment?.carrierName ?? null),
        trackingNumber: resolveNullableTextPatch(payload.trackingNumber, existingShipment?.trackingNumber ?? null),
        trackingUrl: resolveNullableTextPatch(payload.trackingUrl, existingShipment?.trackingUrl ?? null),
        shippedAt: resolveNullableDatePatch(
          payload.shippedAt,
          existingShipment?.shippedAt ?? (order.status === 'packed' ? new Date() : null),
        ),
        deliveredAt: resolveNullableDatePatch(payload.deliveredAt, existingShipment?.deliveredAt ?? null),
      };

      if (order.status === 'packed' && !shipmentData.shippedAt) {
        shipmentData.shippedAt = new Date();
      }

      if (order.status === 'shipped') {
        didUpdateShipmentDetails = hasMeaningfulShipmentChange(existingShipment, shipmentData);
      }

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

        didTransitionToShipped = true;
      }
    });
  });

  const detail = await getOrderDetailById(orderId);

  if (didTransitionToShipped) {
    await sendOrderShippedEmailSafely({
      orderId,
      detail,
    });
  } else if (didUpdateShipmentDetails) {
    await sendOrderShipmentUpdatedEmailSafely({
      orderId,
      detail,
    });
  }

  return detail;
};

export const refundOrder = async (orderId: string, amountCents?: number, reason?: string | null) => {
  return withOrderActionLock(orderId, 'refund', async () => {
    const { payment: paymentRow, order: orderRow, orderTickets } = await getRefundContext(orderId);
    const normalizedReason = normalizeRefundReason(reason);

    if (!paymentRow.providerPaymentIntentId) {
      throw new Exception(HttpStatusCode.CONFLICT, 'Stripe payment intent is missing for this order');
    }

    if (!isRefundableOrderStatus(orderRow.status)) {
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
      requestedRefundAmountCents,
      requestedReason: normalizedReason,
    });

    if (requestedRefundAmountCents > refundableAmountCents) {
      throw new Exception(HttpStatusCode.CONFLICT, 'Refund amount exceeds the remaining refundable amount');
    }

    const [existingRefund] = await db
      .select({
        providerRefundId: paymentRefunds.providerRefundId,
        status: paymentRefunds.status,
      })
      .from(paymentRefunds)
      .where(eq(paymentRefunds.idempotencyKey, refundIdempotencyKey))
      .limit(1);

    if (existingRefund && NON_FAILED_REFUND_STATUSES.has(normalizeStripeRefundStatus(existingRefund.status))) {
      logger.info(
        {
          orderId,
          providerRefundId: existingRefund.providerRefundId,
          requestedRefundAmountCents,
        },
        'Skipping duplicate refund request because the same refund was already created',
      );
      return getOrderDetailById(orderId);
    }

    let stripeRefund: Stripe.Refund;
    let refundSummary:
      | {
          refundedAmountCents: number;
          refundCount: number;
          isFullyRefunded: boolean;
          hasRefundDrift: boolean;
        }
      | undefined;
    try {
      stripeRefund = await stripe.refunds.create(
        {
          payment_intent: paymentRow.providerPaymentIntentId,
          amount: requestedRefundAmountCents,
          metadata: {
            orderId,
            paymentId: paymentRow.id,
            refundIdempotencyKey,
            ...(normalizedReason ? { adminRefundReason: normalizedReason } : {}),
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

        if (!isRefundableOrderStatus(lockedOrder.status)) {
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
          requestedReason: normalizedReason,
        });

        refundSummary = await syncRefundAggregate(tx, {
          order: lockedOrder,
          payment: lockedPayment,
          ticketVoidReason: normalizedReason,
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

    const detail = await getOrderDetailById(orderId);

    await sendOrderLifecycleEmailSafely({
      orderId,
      action: 'refund',
      detail,
      metadata: {
        refundAmountCents: requestedRefundAmountCents,
      },
      send: (email, orderUrl) =>
        sendRefundEmail({
          email,
          firstName: detail.customer.firstName,
          orderPublicId: detail.publicId,
          orderUrl,
          amountCents: requestedRefundAmountCents,
          currency: detail.currency,
          isFullyRefunded: refundSummary?.isFullyRefunded ?? detail.status === 'refunded',
        }),
    });

    return detail;
  });
};

export const reconcileOrderRefunds = async (orderId: string) => {
  return withOrderActionLock(orderId, 'refund reconciliation', async () => {
    const { payment } = await getRefundContext(orderId);

    if (!payment.providerPaymentIntentId) {
      throw new Exception(HttpStatusCode.CONFLICT, 'Stripe payment intent is missing for this order');
    }

    let stripeRefunds: Stripe.Refund[];
    try {
      stripeRefunds = await listAllStripeRefunds(payment.providerPaymentIntentId);
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

      for (const refund of stripeRefunds) {
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
        stripeRefundCount: stripeRefunds.length,
        localRefundCount: localRefunds.length,
        refundedAmountCents: summary.refundedAmountCents,
        isFullyRefunded: summary.isFullyRefunded,
        hasRefundDrift: summary.hasRefundDrift,
      },
      refunds: localRefunds,
    };
  });
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
