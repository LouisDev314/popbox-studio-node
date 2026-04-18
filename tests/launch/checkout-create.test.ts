import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, importFresh } from '../helpers/launch-test-kit';

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
        create: vi.fn(),
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
    createGuestAccessTokenMock: vi.fn(() => 'guest-token'),
    createPublicIdMock: vi.fn(() => 'PBX-NEW'),
    hashGuestAccessTokenMock: vi.fn(() => 'guest-token-hash'),
    createOrUpdateCustomerMock: vi.fn(),
    ensurePaymentSessionMetadataMock: vi.fn(),
    incrementReservedInventoryForCheckoutMock: vi.fn(),
    lockProductsForCheckoutMock: vi.fn(),
    normalizeEmailMock: vi.fn((email: string) => email.trim().toLowerCase()),
    normalizeItemsMock: vi.fn(),
    releaseReservationsForOrderMock: vi.fn(),
    getCheckoutSessionExpiryMock: vi.fn(),
    captureExceptionMock: vi.fn(),
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/integrations/stripe', () => ({
  default: mocks.stripe,
}));
vi.mock('../../src/integrations/sentry', () => ({
  Sentry: {
    captureException: mocks.captureExceptionMock,
  },
}));
vi.mock('../../src/utils/crypto', () => ({
  createGuestAccessToken: mocks.createGuestAccessTokenMock,
  createPublicId: mocks.createPublicIdMock,
  hashGuestAccessToken: mocks.hashGuestAccessTokenMock,
}));
vi.mock('../../src/utils/checkout', () => ({
  getCheckoutSessionExpiry: mocks.getCheckoutSessionExpiryMock,
  parseStripeCheckoutReservationTtlMs: vi.fn(() => 600000),
}));
vi.mock('../../src/services/checkout/helpers', () => ({
  createOrUpdateCustomer: mocks.createOrUpdateCustomerMock,
  ensurePaymentSessionMetadata: mocks.ensurePaymentSessionMetadataMock,
  incrementReservedInventoryForCheckout: mocks.incrementReservedInventoryForCheckoutMock,
  lockProductsForCheckout: mocks.lockProductsForCheckoutMock,
  normalizeEmail: mocks.normalizeEmailMock,
  normalizeItems: mocks.normalizeItemsMock,
  releaseReservationsForOrder: mocks.releaseReservationsForOrderMock,
}));

describe('launch: checkout session creation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createOrUpdateCustomerMock.mockResolvedValue({ id: 'cust_1' });
    mocks.normalizeItemsMock.mockReturnValue([{ productId: 'prod_1', quantity: 1 }]);
    mocks.lockProductsForCheckoutMock.mockResolvedValue(
      new Map([
        [
          'prod_1',
          {
            productId: 'prod_1',
            slug: 'ichiban-figure',
            name: 'Ichiban Figure',
            description: 'Prize figure',
            productType: 'standard',
            status: 'active',
            priceCents: 2500,
            onHand: 3,
            reserved: 0,
          },
        ],
      ]),
    );
    mocks.incrementReservedInventoryForCheckoutMock.mockResolvedValue(undefined);
    mocks.getCheckoutSessionExpiryMock.mockReturnValue({
      reservationExpiresAt: new Date('2099-01-01T00:00:00.000Z'),
      stripeExpiresAt: 4102444800,
    });
  });

  it('captures checkout session creation failures before rethrowing a gateway error', async () => {
    const stripeFailure = new Error('Stripe API unavailable');
    const tx = {
      insert: vi.fn(),
      update: vi.fn(),
    };
    let insertCount = 0;

    tx.insert.mockImplementation(() => {
      insertCount += 1;

      if (insertCount === 1) {
        return createChain([
          {
            id: 'ord_1',
            publicId: 'PBX-NEW',
          },
        ]);
      }

      if (insertCount === 2) {
        return createChain([{ id: 'item_1' }]);
      }

      if (insertCount === 3) {
        return createChain([{ id: 'reservation_1' }]);
      }

      return createChain(undefined);
    });
    tx.update.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementation(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    mocks.stripe.checkout.sessions.create.mockRejectedValue(stripeFailure);
    mocks.releaseReservationsForOrderMock.mockResolvedValue(undefined);

    const { createCheckoutSession } = await importFresh(() => import('../../src/services/checkout/index'));

    await expect(
      createCheckoutSession(
        {
          email: 'customer@example.com',
          items: [{ productId: 'prod_1', quantity: 1 }],
        },
        'idem_1',
      ),
    ).rejects.toMatchObject({
      msg: 'Unable to create checkout session',
    });

    expect(mocks.captureExceptionMock).toHaveBeenCalledWith(
      stripeFailure,
      expect.objectContaining({
        tags: {
          flow: 'checkout_session_create',
        },
        extra: {
          orderId: 'ord_1',
          orderPublicId: 'PBX-NEW',
        },
      }),
    );
    expect(mocks.releaseReservationsForOrderMock).toHaveBeenCalledWith(tx, 'ord_1', 'released');
    expect(tx.update).toHaveBeenCalledTimes(2);
  });
});
