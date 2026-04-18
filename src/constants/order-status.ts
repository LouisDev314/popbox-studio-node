import Exception from '../utils/Exception';
import HttpStatusCode from './http-status-code';

export const ORDER_STATUS = {
  PENDING_PAYMENT: 'pending_payment',
  PAID: 'paid',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  PAID_NEEDS_ATTENTION: 'paid_needs_attention',
  EXPIRED: 'expired',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const CHECKOUT_FINALIZED_ORDER_STATUSES = [
  ORDER_STATUS.PAID,
  ORDER_STATUS.PACKED,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.REFUNDED,
  ORDER_STATUS.PAID_NEEDS_ATTENTION,
] as const;

export const REFUNDABLE_ORDER_STATUSES = [
  ORDER_STATUS.PAID,
  ORDER_STATUS.PACKED,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.PAID_NEEDS_ATTENTION,
] as const;

export const isCheckoutFinalizedOrderStatus = (
  status: OrderStatus,
): status is (typeof CHECKOUT_FINALIZED_ORDER_STATUSES)[number] =>
  CHECKOUT_FINALIZED_ORDER_STATUSES.some((finalizedStatus) => finalizedStatus === status);

export const isRefundableOrderStatus = (
  status: OrderStatus,
): status is (typeof REFUNDABLE_ORDER_STATUSES)[number] =>
  REFUNDABLE_ORDER_STATUSES.some((refundableStatus) => refundableStatus === status);

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_payment: ['paid', 'cancelled', 'expired', 'paid_needs_attention'],
  paid: ['packed', 'refunded', 'paid_needs_attention'],
  packed: ['shipped', 'refunded'],
  shipped: ['refunded'],
  cancelled: [],
  refunded: [],
  paid_needs_attention: ['paid', 'packed', 'refunded', 'cancelled'],
  expired: [],
} as const;

export const assertOrderStatusTransition = (currentStatus: OrderStatus, nextStatus: OrderStatus) => {
  const allowed = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];

  if (!allowed.includes(nextStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, `Order cannot move from ${currentStatus} to ${nextStatus}`);
  }
};
