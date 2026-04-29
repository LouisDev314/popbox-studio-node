import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  TEST_CLIENT_BASE_URL,
  buildCheckoutSession,
  createChain,
  importFresh,
  readCookie,
} from '../helpers/launch-test-kit';

const mocks = vi.hoisted(() => {
  const db = {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    execute: vi.fn(),
    transaction: vi.fn(),
  };
  const stripe = {
    checkout: {
      sessions: {
        retrieve: vi.fn(),
      },
    },
  };

  return {
    db,
    dbModule: {
      db,
      verifyDatabaseConnection: vi.fn().mockResolvedValue(undefined),
      pgInit: vi.fn().mockResolvedValue(undefined),
      pgStop: vi.fn().mockResolvedValue(undefined),
    },
    stripe,
    getGuestOrderViewMock: vi.fn(),
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/integrations/stripe', () => ({
  default: mocks.stripe,
}));
vi.mock('../../src/services/orders/helpers', () => ({
  getGuestOrderView: mocks.getGuestOrderViewMock,
}));

describe('launch: checkout success', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 202 while webhook finalization is still pending and sets no guest cookie', async () => {
    mocks.stripe.checkout.sessions.retrieve.mockResolvedValue(
      buildCheckoutSession({
        id: 'cs_pending_launch',
        metadata: {
          orderId: 'ord_pending',
          orderPublicId: 'PBX-PENDING',
        },
      }),
    );
    mocks.db.select.mockReturnValue(createChain([{ status: 'pending_payment' }]));

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/checkout/success').query({
      session_id: 'cs_pending_launch',
    });

    expect(response.status).toBe(202);
    expect(response.body.message).toBe('Order payment is still awaiting webhook finalization');
    expect(readCookie(response, 'guest_order_session')).toBeNull();
  });

  it('returns 200 and sets the guest session cookie once the order is finalized', async () => {
    mocks.stripe.checkout.sessions.retrieve.mockResolvedValue(
      buildCheckoutSession({
        id: 'cs_paid_launch',
        metadata: {
          orderId: 'ord_paid',
          orderPublicId: 'PBX-PAID',
        },
      }),
    );
    mocks.db.select.mockReturnValue(createChain([{ status: 'paid', publicId: 'PBX-PAID' }]));
    mocks.getGuestOrderViewMock.mockResolvedValue({
      id: 'ord_paid',
      publicId: 'PBX-PAID',
      status: 'paid',
      customer: {
        email: 'customer@example.com',
      },
      items: [],
      tickets: [
        {
          id: 'ticket_1',
          ticketNumber: 'PBX-TKT-1',
          revealedAt: null,
          voidedAt: null,
          voidReason: null,
          prize: null,
          kujiProduct: {
            id: 'product_1',
            name: 'Kuji Box',
            slug: 'kuji-box',
            imageUrl: null,
            imageAltText: 'Kuji Box',
          },
          createdAt: new Date('2026-03-28T00:00:00.000Z'),
        },
      ],
    });

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/checkout/success').query({
      session_id: 'cs_paid_launch',
    });

    expect(response.status).toBe(200);
    expect(response.body.data.pending).toBe(false);
    expect(response.body.data.clientOrderUrl).toBe(`${TEST_CLIENT_BASE_URL}/orders/PBX-PAID`);
    expect(response.body.data.order.tickets[0]?.prize).toBeNull();
    expect(mocks.getGuestOrderViewMock).toHaveBeenCalledWith('PBX-PAID');
    expect(readCookie(response, 'guest_order_session')).toContain('guest_order_session=');
  });

  it('requires Stripe payment_status to be paid before treating the checkout as finalized', async () => {
    mocks.stripe.checkout.sessions.retrieve.mockResolvedValue(
      buildCheckoutSession({
        id: 'cs_unpaid_launch',
        payment_status: 'unpaid',
      }),
    );

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/checkout/success').query({
      session_id: 'cs_unpaid_launch',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Checkout session has not been paid yet');
    expect(readCookie(response, 'guest_order_session')).toBeNull();
  });
});
