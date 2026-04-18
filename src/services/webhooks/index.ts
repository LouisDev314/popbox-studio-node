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
import { buildStripeWebhookEventSnapshot } from '../../utils/stripe';
import { Sentry } from '../../integrations/sentry';

const getWebhookOrderContext = (event: Stripe.Event) => {
  const eventObject = event.data.object as {
    id?: string;
    metadata?: Record<string, string | undefined>;
  };

  return {
    stripeObjectId: typeof eventObject?.id === 'string' ? eventObject.id : null,
    orderId: eventObject?.metadata?.orderId ?? null,
    orderPublicId: eventObject?.metadata?.orderPublicId ?? null,
  };
};

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

  const webhookOrderContext = getWebhookOrderContext(event);
  const lockHandle = await tryAcquireAdvisoryLock(`stripe:webhook:${event.id}`);

  if (!lockHandle) {
    logger.info(
      {
        stripeEventId: event.id,
        eventType: event.type,
        ...webhookOrderContext,
      },
      'Skipping Stripe webhook because another worker is already processing it',
    );

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
        payload: buildStripeWebhookEventSnapshot(event),
      })
      .onConflictDoNothing({
        target: stripeWebhookEvents.stripeEventId,
      });

    const existing = await db
      .select({
        status: stripeWebhookEvents.status,
      })
      .from(stripeWebhookEvents)
      .where(eq(stripeWebhookEvents.stripeEventId, event.id))
      .limit(1);

    if (existing[0]?.status === 'processed') {
      logger.info(
        {
          stripeEventId: event.id,
          eventType: event.type,
          ...webhookOrderContext,
        },
        'Ignoring already-processed Stripe webhook delivery',
      );

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
    Sentry.captureException(error, {
      tags: {
        flow: 'stripe_webhook',
      },
      extra: {
        stripeEventId: event.id,
        eventType: event.type,
        stripeObjectId: webhookOrderContext.stripeObjectId,
        orderId: webhookOrderContext.orderId,
        orderPublicId: webhookOrderContext.orderPublicId,
      },
    });

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
          { stripeEventId: event.id, eventType: event.type, ...webhookOrderContext },
          'Stripe webhook failed before a failure state could be persisted',
        );
      }
    } catch (updateError) {
      logger.error(
        { error: updateError, stripeEventId: event.id, eventType: event.type, ...webhookOrderContext },
        'Failed to persist Stripe webhook failure state',
      );
    }

    logger.error(
      { error, stripeEventId: event.id, eventType: event.type, ...webhookOrderContext },
      'Stripe webhook processing failed',
    );
    throw error;
  } finally {
    try {
      await releaseAdvisoryLock(lockHandle);
    } catch (unlockError) {
      logger.error(
        { error: unlockError, stripeEventId: event.id, eventType: event.type, ...webhookOrderContext },
        'Failed to release Stripe webhook advisory lock',
      );
    }
  }
};
