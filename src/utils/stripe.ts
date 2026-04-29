import type Stripe from 'stripe';

const normalizeCurrency = (currency: string | null | undefined) => currency?.trim().toUpperCase() || null;

export const buildStripeCheckoutSessionSnapshot = (session: Stripe.Checkout.Session): Record<string, unknown> => ({
  id: session.id,
  status: session.status ?? null,
  paymentStatus: session.payment_status ?? null,
  mode: session.mode ?? null,
  currency: normalizeCurrency(session.currency),
  amountSubtotal: session.amount_subtotal ?? null,
  amountTotal: session.amount_total ?? null,
  amountShipping: session.total_details?.amount_shipping ?? null,
  amountTax: session.total_details?.amount_tax ?? null,
  amountDiscount: session.total_details?.amount_discount ?? null,
  paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
  customerEmail: session.customer_email ?? session.customer_details?.email ?? null,
  metadata: session.metadata ?? {},
  created: session.created,
});

export const buildStripeRefundSnapshot = (refund: Stripe.Refund): Record<string, unknown> => ({
  id: refund.id,
  status: refund.status ?? null,
  amount: refund.amount,
  currency: normalizeCurrency(refund.currency),
  paymentIntentId: typeof refund.payment_intent === 'string' ? refund.payment_intent : null,
  chargeId: typeof refund.charge === 'string' ? refund.charge : null,
  reason: refund.reason ?? null,
  metadata: refund.metadata ?? {},
  created: refund.created,
});

export const buildStripeWebhookEventSnapshot = (event: Stripe.Event): Record<string, unknown> => {
  const eventObject = event.data.object as {
    id?: string;
    metadata?: Record<string, string | undefined>;
    payment_status?: string | null;
    status?: string | null;
    amount_total?: number | null;
    amount_subtotal?: number | null;
    currency?: string | null;
    payment_intent?: string | Stripe.PaymentIntent | null;
  };

  return {
    id: event.id,
    type: event.type,
    apiVersion: event.api_version ?? null,
    created: event.created,
    livemode: event.livemode,
    objectId: typeof eventObject?.id === 'string' ? eventObject.id : null,
    orderId: eventObject?.metadata?.orderId ?? null,
    orderPublicId: eventObject?.metadata?.orderPublicId ?? null,
    objectStatus: eventObject?.status ?? null,
    paymentStatus: eventObject?.payment_status ?? null,
    amountTotal: eventObject?.amount_total ?? null,
    amountSubtotal: eventObject?.amount_subtotal ?? null,
    currency: normalizeCurrency(eventObject?.currency),
    paymentIntentId: typeof eventObject?.payment_intent === 'string' ? eventObject.payment_intent : null,
  };
};
