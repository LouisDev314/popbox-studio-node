import { beforeEach, describe, expect, it, vi } from 'vitest';
import type Stripe from 'stripe';
import { buildWebhookRequest, createChain, importFresh } from '../helpers/launch-test-kit';

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
    isPlaceholderCustomerEmailMock: vi.fn(),
    normalizeEmailMock: vi.fn((email: string) => email.trim().toLowerCase()),
    sendOrderConfirmationEmailForOrderMock: vi.fn(),
    getOrderDetailByIdMock: vi.fn(),
    getGuestOrderViewMock: vi.fn(),
    getGuestOrderViewByOrderIdMock: vi.fn(),
    getGuestTicketViewMock: vi.fn(),
    getGuestTicketViewByIdMock: vi.fn(),
    getGuestTicketViewByOrderIdMock: vi.fn(),
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/jobs/advisory-lock', () => ({
  tryAcquireAdvisoryLock: mocks.tryAcquireAdvisoryLockMock,
  releaseAdvisoryLock: mocks.releaseAdvisoryLockMock,
}));
vi.mock('../../src/services/checkout/helpers', () => ({
  finalizeCheckoutSession: mocks.finalizeCheckoutSessionMock,
  releaseReservationsForOrder: mocks.releaseReservationsForOrderMock,
  isPlaceholderCustomerEmail: mocks.isPlaceholderCustomerEmailMock,
  normalizeEmail: mocks.normalizeEmailMock,
  sendOrderConfirmationEmailForOrder: mocks.sendOrderConfirmationEmailForOrderMock,
}));
vi.mock('../../src/services/orders/helpers', () => ({
  getOrderDetailById: mocks.getOrderDetailByIdMock,
  getGuestOrderView: mocks.getGuestOrderViewMock,
  getGuestOrderViewByOrderId: mocks.getGuestOrderViewByOrderIdMock,
  getGuestTicketView: mocks.getGuestTicketViewMock,
  getGuestTicketViewById: mocks.getGuestTicketViewByIdMock,
  getGuestTicketViewByOrderId: mocks.getGuestTicketViewByOrderIdMock,
}));

describe('launch: performance and stability hardening', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.tryAcquireAdvisoryLockMock.mockResolvedValue({ key: 'lock' });
    mocks.releaseAdvisoryLockMock.mockResolvedValue(undefined);
    mocks.finalizeCheckoutSessionMock.mockResolvedValue({
      orderId: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      orderUrl: 'https://client.example.com/orders/PBX-LAUNCH',
      needsAttention: false,
      alreadyFinalized: false,
    });
    mocks.releaseReservationsForOrderMock.mockResolvedValue(undefined);
    mocks.isPlaceholderCustomerEmailMock.mockReturnValue(false);
    mocks.sendOrderConfirmationEmailForOrderMock.mockResolvedValue(undefined);
    mocks.getOrderDetailByIdMock.mockResolvedValue({
      id: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      status: 'paid',
      customer: {
        email: 'customer@example.com',
        firstName: 'Ada',
      },
      items: [],
      tickets: [],
    });
    mocks.getGuestTicketViewByIdMock.mockResolvedValue({
      id: 'ticket_1',
      ticketNumber: 'PBX-TKT-1',
      revealedAt: new Date('2026-04-18T00:00:00.000Z'),
      voidedAt: null,
      voidReason: null,
      prize: {
        id: 'prize_1',
        name: 'Prize A',
        description: null,
        imageUrl: null,
        prizeCode: 'A',
        prizeTier: 'A',
      },
      kujiProduct: {
        id: 'product_1',
        name: 'Kuji Box',
        slug: 'kuji-box',
        imageUrl: null,
        imageAltText: 'Kuji Box',
      },
      createdAt: new Date('2026-04-18T00:00:00.000Z'),
    });
    mocks.getGuestTicketViewByOrderIdMock.mockResolvedValue({
      tickets: [],
      revealed: [],
      unrevealed: [],
      counts: {
        total: 0,
        revealed: 0,
        unrevealed: 0,
      },
    });
  });

  it('rejects checkout requests with more than 50 line items', async () => {
    const { checkoutBodySchema } = await importFresh(() => import('../../src/schemas/checkout'));

    const result = checkoutBodySchema.safeParse({
      items: Array.from({ length: 51 }, (_, index) => ({
        productId: '00000000-0000-0000-0000-000000000000',
        quantity: 1,
      })),
    });

    expect(result.success).toBe(false);
  });

  it('persists slim Stripe webhook snapshots instead of raw event payloads', async () => {
    const { payload, signature } = buildWebhookRequest();
    const insertChain = createChain(undefined);

    mocks.db.insert.mockReturnValue(insertChain);
    mocks.db.select.mockReturnValue(createChain([{ status: 'received' }]));
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { handleStripeWebhook } = await importFresh(() => import('../../src/services/webhooks'));
    await handleStripeWebhook(signature, Buffer.from(payload, 'utf8'));

    expect(insertChain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          id: 'evt_launch_1',
          type: 'checkout.session.completed',
          objectId: 'cs_test_launch',
          orderId: 'ord_launch',
          orderPublicId: 'PBX-LAUNCH',
          amountTotal: 2630,
        }),
      }),
    );
  });

  it('does not fail a successful reveal when advisory unlock release errors', async () => {
    mocks.releaseAdvisoryLockMock.mockRejectedValue(new Error('unlock failed'));
    mocks.db.select.mockReturnValue(
      createChain([
        {
          orderStatus: 'paid',
          ticketId: 'ticket_1',
          revealedAt: null,
          voidedAt: null,
        },
      ]),
    );
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { revealTicket } = await importFresh(() => import('../../src/services/orders'));
    const result = await revealTicket('ord_launch', 'ticket_1');

    expect(result).toEqual(
      expect.objectContaining({
        id: 'ticket_1',
        ticketNumber: 'PBX-TKT-1',
      }),
    );
  });

  it('paginates Stripe refund reconciliation and reports the full remote count', async () => {
    const refundOne = {
      id: 're_1',
      amount: 500,
      currency: 'cad',
      created: 1774656000,
      status: 'succeeded',
      reason: null,
      metadata: {},
      payment_intent: 'pi_launch',
      charge: 'ch_launch',
    } as Stripe.Refund;
    const refundTwo = {
      ...refundOne,
      id: 're_2',
      amount: 700,
      created: 1774657000,
    } as Stripe.Refund;
    const tx = {
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      execute: vi.fn(),
      transaction: vi.fn(),
    };
    const refundsListMock = vi.fn();

    mocks.db.select
      .mockReturnValueOnce(createChain([{ id: 'pay_1', providerPaymentIntentId: 'pi_launch' }]))
      .mockReturnValueOnce(createChain([{ id: 'ord_launch' }]))
      .mockReturnValueOnce(createChain([]))
      .mockReturnValueOnce(
        createChain([
          {
            providerRefundId: 're_2',
            amountCents: 700,
            currency: 'CAD',
            status: 'succeeded',
            reason: null,
            providerCreatedAt: new Date('2026-04-18T00:10:00.000Z'),
          },
          {
            providerRefundId: 're_1',
            amountCents: 500,
            currency: 'CAD',
            status: 'succeeded',
            reason: null,
            providerCreatedAt: new Date('2026-04-18T00:00:00.000Z'),
          },
        ]),
      );
    refundsListMock
      .mockResolvedValueOnce({
        data: [refundOne],
        has_more: true,
      })
      .mockResolvedValueOnce({
        data: [refundTwo],
        has_more: false,
      });
    vi.doMock('../../src/integrations/stripe', () => ({
      default: {
        refunds: {
          list: refundsListMock,
          create: vi.fn(),
        },
        checkout: {
          sessions: {
            retrieve: vi.fn(),
          },
        },
      },
    }));
    tx.select
      .mockReturnValueOnce(createChain([{ id: 'ord_launch', status: 'paid' }]))
      .mockReturnValueOnce(
        createChain([
          {
            id: 'pay_1',
            amountCents: 1200,
            refundedAmountCents: 0,
            status: 'paid',
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            refundCount: 2,
            refundedAmountCents: 1200,
          },
        ]),
      );
    tx.insert.mockReturnValue(createChain(undefined));
    tx.update.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementationOnce(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));

    const { reconcileOrderRefunds } = await importFresh(() => import('../../src/services/orders'));
    const result = await reconcileOrderRefunds('ord_launch');

    expect(refundsListMock).toHaveBeenNthCalledWith(1, {
      payment_intent: 'pi_launch',
      limit: 100,
    });
    expect(refundsListMock).toHaveBeenNthCalledWith(2, {
      payment_intent: 'pi_launch',
      limit: 100,
      starting_after: 're_1',
    });
    expect(result.summary).toEqual(
      expect.objectContaining({
        stripeRefundCount: 2,
        localRefundCount: 2,
        refundedAmountCents: 1200,
        isFullyRefunded: true,
      }),
    );
  });
});
