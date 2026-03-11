import HttpStatusCode from '../../constants/http-status-code';
import Exception from '../../utils/Exception';
import Stripe from 'stripe';
import stripe from '../../integrations/stripe';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { orders, stripeWebhookEvents } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { finalizeCheckoutSession, releaseReservationsForOrder } from '../checkout/helpers';

export const handleStripeWebhook = async (signature: string | string[] | undefined, rawBody: Buffer) => {
  if (!signature || Array.isArray(signature)) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Stripe signature header is required');
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, getEnvConfig().stripeWebhookSecret);
  } catch {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Invalid Stripe signature');
  }

  const existing = await db
    .select()
    .from(stripeWebhookEvents)
    .where(eq(stripeWebhookEvents.stripeEventId, event.id))
    .limit(1);

  if (existing[0]?.status === 'processed') {
    return {
      received: true,
      duplicate: true,
    };
  }

  if (!existing[0]) {
    await db.insert(stripeWebhookEvents).values({
      stripeEventId: event.id,
      eventType: event.type,
      status: 'received',
      payload: event as unknown as Record<string, unknown>,
    });
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      await finalizeCheckoutSession(event.data.object as Stripe.Checkout.Session);
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await db.transaction(async (tx) => {
          await releaseReservationsForOrder(tx, orderId, 'expired');
          await tx
            .update(orders)
            .set({
              status: 'expired',
            })
            .where(and(eq(orders.id, orderId), eq(orders.status, 'pending_payment')));
        });
      }
    }

    await db
      .update(stripeWebhookEvents)
      .set({
        status: 'processed',
        processedAt: new Date(),
        errorMessage: null,
      })
      .where(eq(stripeWebhookEvents.stripeEventId, event.id));

    return {
      received: true,
      duplicate: false,
    };
  } catch (error) {
    await db
      .update(stripeWebhookEvents)
      .set({
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown webhook error',
      })
      .where(eq(stripeWebhookEvents.stripeEventId, event.id));

    throw error;
  }
};
