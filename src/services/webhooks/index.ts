import HttpStatusCode from '../../constants/http-status-code';
import Exception from '../../utils/Exception';
import Stripe from 'stripe';
import stripe from '../../integrations/stripe';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { orders, stripeWebhookEvents } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { finalizeCheckoutSession, releaseReservationsForOrder } from '../checkout/helpers';
import { releaseAdvisoryLock, tryAcquireAdvisoryLock } from '../../jobs/advisory-lock';
import logger from '../../utils/logger';

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

  const lockHandle = await tryAcquireAdvisoryLock(`stripe:webhook:${event.id}`);

  if (!lockHandle) {
    return {
      received: true,
      duplicate: true,
    };
  }

  try {
    await db
      .insert(stripeWebhookEvents)
      .values({
        stripeEventId: event.id,
        eventType: event.type,
        status: 'received',
        payload: event as unknown as Record<string, unknown>,
      })
      .onConflictDoNothing({
        target: stripeWebhookEvents.stripeEventId,
      });

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
    try {
      const updateResult = await db
        .update(stripeWebhookEvents)
        .set({
          status: 'failed',
          processedAt: null,
          errorMessage: error instanceof Error ? error.message : 'Unknown webhook error',
        })
        .where(eq(stripeWebhookEvents.stripeEventId, event.id))
        .returning({
          stripeEventId: stripeWebhookEvents.stripeEventId,
        });

      if (updateResult.length === 0) {
        logger.error(
          { stripeEventId: event.id, eventType: event.type },
          'Stripe webhook failed before a failure state could be persisted',
        );
      }
    } catch (updateError) {
      logger.error({ error: updateError, stripeEventId: event.id }, 'Failed to persist Stripe webhook failure state');
    }

    logger.error({ error, stripeEventId: event.id, eventType: event.type }, 'Stripe webhook processing failed');
    throw error;
  } finally {
    try {
      await releaseAdvisoryLock(lockHandle);
    } catch (unlockError) {
      logger.error({ error: unlockError, stripeEventId: event.id }, 'Failed to release Stripe webhook advisory lock');
    }
  }
};
