import Exception from './Exception';
import HttpStatusCode from '../constant/http-status-code';

export const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  pending_payment: ['paid', 'cancelled', 'expired', 'paid_needs_attention'],
  paid: ['packed', 'refunded', 'paid_needs_attention'],
  packed: ['shipped', 'refunded'],
  shipped: ['refunded'],
  cancelled: [],
  refunded: [],
  paid_needs_attention: ['paid', 'packed', 'refunded', 'cancelled'],
  expired: [],
};

export const assertOrderStatusTransition = (currentStatus: string, nextStatus: string) => {
  const allowed = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];

  if (!allowed.includes(nextStatus)) {
    throw new Exception(HttpStatusCode.CONFLICT, `Order cannot move from ${currentStatus} to ${nextStatus}`);
  }
};
