import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, buildWebhookRequest, importFresh } from '../helpers/launch-test-kit';

const mocks = vi.hoisted(() => {
  const db = {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    execute: vi.fn(),
    transaction: vi.fn(),
  };

  return {
    db,
    dbModule: {
      db,
      verifyDatabaseConnection: vi.fn().mockResolvedValue(undefined),
      pgInit: vi.fn().mockResolvedValue(undefined),
      pgStop: vi.fn().mockResolvedValue(undefined),
    },
    tryAcquireAdvisoryLockMock: vi.fn(),
    releaseAdvisoryLockMock: vi.fn(),
    finalizeCheckoutSessionMock: vi.fn(),
    releaseReservationsForOrderMock: vi.fn(),
    captureExceptionMock: vi.fn(),
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/integrations/sentry', () => ({
  Sentry: {
    captureException: mocks.captureExceptionMock,
    setupExpressErrorHandler: vi.fn(),
  },
}));
vi.mock('../../src/jobs/advisory-lock', () => ({
  tryAcquireAdvisoryLock: mocks.tryAcquireAdvisoryLockMock,
  releaseAdvisoryLock: mocks.releaseAdvisoryLockMock,
}));
vi.mock('../../src/services/checkout/helpers', () => ({
  finalizeCheckoutSession: mocks.finalizeCheckoutSessionMock,
  releaseReservationsForOrder: mocks.releaseReservationsForOrderMock,
}));

describe('launch: Stripe webhooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.tryAcquireAdvisoryLockMock.mockResolvedValue({ key: 'stripe:webhook:evt_launch_1' });
    mocks.releaseAdvisoryLockMock.mockResolvedValue(undefined);
    mocks.finalizeCheckoutSessionMock.mockResolvedValue({
      orderId: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      orderUrl: 'https://client.example.com/orders/PBX-LAUNCH',
      needsAttention: false,
      alreadyFinalized: false,
    });
    mocks.releaseReservationsForOrderMock.mockResolvedValue(undefined);
  });

  it('accepts a signed webhook through the real raw-body route', async () => {
    const { payload, signature } = buildWebhookRequest();

    mocks.db.insert.mockReturnValue(createChain(undefined));
    mocks.db.select.mockReturnValue(createChain([{ status: 'received' }]));
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp())
      .post('/api/v1/webhooks/stripe')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', signature)
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({
      received: true,
      duplicate: false,
    });
    expect(mocks.finalizeCheckoutSessionMock).toHaveBeenCalledTimes(1);
  });

  it('rejects an invalid Stripe signature', async () => {
    const { payload } = buildWebhookRequest();

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp())
      .post('/api/v1/webhooks/stripe')
      .set('Content-Type', 'application/json')
      .set('stripe-signature', 'invalid-signature')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Stripe signature');
    expect(mocks.finalizeCheckoutSessionMock).not.toHaveBeenCalled();
  });

  it('processes a valid checkout completion event and persists processed state', async () => {
    const { payload, signature } = buildWebhookRequest();
    const updateChains: Array<ReturnType<typeof createChain>> = [];

    mocks.db.insert.mockReturnValue(createChain(undefined));
    mocks.db.select.mockReturnValue(createChain([{ status: 'received' }]));
    mocks.db.update.mockImplementation(() => {
      const chain = createChain(undefined);
      updateChains.push(chain);
      return chain;
    });

    const { handleStripeWebhook } = await importFresh(() => import('../../src/services/webhooks'));
    const result = await handleStripeWebhook(signature, Buffer.from(payload, 'utf8'));

    expect(result).toEqual({
      received: true,
      duplicate: false,
    });
    expect(mocks.finalizeCheckoutSessionMock).toHaveBeenCalledTimes(1);
    expect(updateChains).toHaveLength(1);
    expect(updateChains[0]?.set).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'processed',
        errorMessage: null,
      }),
    );
  });

  it('treats replayed processed events as idempotent duplicates', async () => {
    const { payload, signature } = buildWebhookRequest();

    mocks.db.insert.mockReturnValue(createChain(undefined));
    mocks.db.select.mockReturnValue(createChain([{ status: 'processed' }]));
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { handleStripeWebhook } = await importFresh(() => import('../../src/services/webhooks'));
    const result = await handleStripeWebhook(signature, Buffer.from(payload, 'utf8'));

    expect(result).toEqual({
      received: true,
      duplicate: true,
    });
    expect(mocks.finalizeCheckoutSessionMock).not.toHaveBeenCalled();
  });

  it('captures webhook processing failures before rethrowing them', async () => {
    const { payload, signature } = buildWebhookRequest();
    const failure = new Error('finalize exploded');

    mocks.db.insert.mockReturnValue(createChain(undefined));
    mocks.db.select.mockReturnValue(createChain([{ status: 'received' }]));
    mocks.db.update.mockReturnValue(createChain([{ stripeEventId: 'evt_launch_1' }]));
    mocks.finalizeCheckoutSessionMock.mockRejectedValue(failure);

    const { handleStripeWebhook } = await importFresh(() => import('../../src/services/webhooks'));

    await expect(handleStripeWebhook(signature, Buffer.from(payload, 'utf8'))).rejects.toThrow('finalize exploded');
    expect(mocks.captureExceptionMock).toHaveBeenCalledWith(
      failure,
      expect.objectContaining({
        tags: {
          flow: 'stripe_webhook',
        },
        extra: expect.objectContaining({
          stripeEventId: 'evt_launch_1',
          eventType: 'checkout.session.completed',
          stripeObjectId: 'cs_test_launch',
          orderId: 'ord_launch',
          orderPublicId: 'PBX-LAUNCH',
        }),
      }),
    );
  });
});
