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
    getShippingSettingsMock: vi.fn(),
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
vi.mock('../../src/services/settings', () => ({
  getShippingSettings: mocks.getShippingSettingsMock,
  calculateShippingCents: vi.fn(
    ({
      subtotalCents,
      flatShippingCents,
      freeShippingThresholdCents,
    }: {
      subtotalCents: number;
      flatShippingCents: number;
      freeShippingThresholdCents: number;
    }) => (subtotalCents >= freeShippingThresholdCents ? 0 : flatShippingCents),
  ),
}));

describe('launch: checkout session creation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getShippingSettingsMock.mockResolvedValue({
      flatShippingCents: 1200,
      freeShippingThresholdCents: 14900,
      currency: 'CAD',
    });
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

  it('uses DB shipping settings for saved order, pending payment, and Stripe Checkout', async () => {
    const orderInsertChain = createChain([
      {
        id: 'ord_1',
        publicId: 'PBX-NEW',
      },
    ]);
    const orderItemsInsertChain = createChain([{ id: 'item_1' }]);
    const reservationsInsertChain = createChain([{ id: 'reservation_1' }]);
    const paymentInsertChain = createChain(undefined);
    const tx = {
      insert: vi
        .fn()
        .mockReturnValueOnce(orderInsertChain)
        .mockReturnValueOnce(orderItemsInsertChain)
        .mockReturnValueOnce(reservationsInsertChain)
        .mockReturnValueOnce(paymentInsertChain),
      update: vi.fn(),
    };

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
            priceCents: 14900,
            currency: 'CAD',
            onHand: 3,
            reserved: 0,
          },
        ],
      ]),
    );
    tx.update.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementation(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    mocks.db.update.mockReturnValue(createChain(undefined));
    mocks.stripe.checkout.sessions.create.mockResolvedValue({
      id: 'cs_test_shipping',
      url: 'https://checkout.example.com/session',
      payment_intent: 'pi_test_shipping',
    });

    const { createCheckoutSession } = await importFresh(() => import('../../src/services/checkout/index'));
    const result = await createCheckoutSession(
      {
        email: 'customer@example.com',
        items: [{ productId: 'prod_1', quantity: 1 }],
      },
      'idem_1',
    );

    expect(result).toEqual({
      checkoutUrl: 'https://checkout.example.com/session',
      sessionId: 'cs_test_shipping',
      publicId: 'PBX-NEW',
      orderId: 'ord_1',
    });
    expect(orderInsertChain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        subtotalCents: 14900,
        shippingCents: 0,
        taxCents: 0,
        totalCents: 14900,
      }),
    );
    expect(paymentInsertChain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        amountCents: 14900,
        currency: 'CAD',
        status: 'pending',
      }),
    );
    expect(mocks.stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        shipping_options: [
          expect.objectContaining({
            shipping_rate_data: expect.objectContaining({
              fixed_amount: {
                amount: 0,
                currency: 'cad',
              },
            }),
          }),
        ],
      }),
      {
        idempotencyKey: 'idem_1',
      },
    );
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
