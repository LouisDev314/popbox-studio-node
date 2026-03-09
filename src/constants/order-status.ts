import Exception from '../utils/Exception';
import HttpStatusCode from './http-status-code';

export const ORDER_STATUSES = [
  'pending_payment',
  'paid',
  'packed',
  'shipped',
  'cancelled',
  'refunded',
  'paid_needs_attention',
  'expired',
];

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_payment: ['paid', 'cancelled', 'expired', 'paid_needs_attention'],
  paid: ['packed', 'refunded', 'paid_needs_attention'],
  packed: ['shipped', 'refunded'],
  shipped: ['refunded'],
  cancelled: [],
  refunded: [],
  paid_needs_attention: ['paid', 'packed', 'refunded', 'cancelled'],
  expired: [],
};

export const assertOrderStatusTransition = (currentStatus: OrderStatus, nextStatus: OrderStatus) => {
  const allowed = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];

  if (!allowed.includes(nextStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, `Order cannot move from ${currentStatus} to ${nextStatus}`);
  }
};
