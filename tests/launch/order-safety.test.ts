import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildCheckoutSession,
  createChain,
  createDbLikeMock,
  importFresh,
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
    sendOrderConfirmationEmailMock: vi.fn(),
    sendShipmentEmailMock: vi.fn(),
    sendShipmentUpdateEmailMock: vi.fn(),
    sendRefundEmailMock: vi.fn(),
    getOrderDetailByIdMock: vi.fn(),
    getGuestOrderViewMock: vi.fn(),
    getGuestTicketViewMock: vi.fn(),
    tryAcquireAdvisoryLockMock: vi.fn(),
    releaseAdvisoryLockMock: vi.fn(),
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/integrations/stripe', () => ({
  default: mocks.stripe,
}));
vi.mock('../../src/services/notifications', () => ({
  sendOrderConfirmationEmail: mocks.sendOrderConfirmationEmailMock,
  sendShipmentEmail: mocks.sendShipmentEmailMock,
  sendShipmentUpdateEmail: mocks.sendShipmentUpdateEmailMock,
  sendRefundEmail: mocks.sendRefundEmailMock,
}));
vi.mock('../../src/services/orders/helpers', () => ({
  getOrderDetailById: mocks.getOrderDetailByIdMock,
  getGuestOrderView: mocks.getGuestOrderViewMock,
  getGuestTicketView: mocks.getGuestTicketViewMock,
}));
vi.mock('../../src/jobs/advisory-lock', () => ({
  tryAcquireAdvisoryLock: mocks.tryAcquireAdvisoryLockMock,
  releaseAdvisoryLock: mocks.releaseAdvisoryLockMock,
}));

describe('launch: order and payment safety invariants', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.tryAcquireAdvisoryLockMock.mockResolvedValue({ key: 'lock' });
    mocks.releaseAdvisoryLockMock.mockResolvedValue(undefined);
    mocks.sendOrderConfirmationEmailMock.mockResolvedValue(undefined);
    mocks.sendShipmentEmailMock.mockResolvedValue(undefined);
    mocks.sendShipmentUpdateEmailMock.mockResolvedValue(undefined);
    mocks.sendRefundEmailMock.mockResolvedValue(undefined);
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
    mocks.getGuestTicketViewMock.mockResolvedValue({
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

  it('does not block checkout finalization when confirmation email sending fails', async () => {
    const session = buildCheckoutSession({
      id: 'cs_finalize_email_failure',
      metadata: {
        orderId: 'ord_launch',
        orderPublicId: 'PBX-LAUNCH',
      },
    });
    const tx = createDbLikeMock();
    const txUpdateChains: Array<ReturnType<typeof createChain>> = [];
    const dbUpdateChains: Array<ReturnType<typeof createChain>> = [];

    mocks.stripe.checkout.sessions.retrieve.mockResolvedValue(session);
    tx.execute
      .mockResolvedValueOnce([
        {
          publicId: 'PBX-LAUNCH',
          customerId: 'cust_1',
          stripeCheckoutSessionId: 'cs_finalize_email_failure',
          status: 'pending_payment',
          currency: 'CAD',
          subtotalCents: 1000,
          shippingCents: 1500,
        },
      ])
      .mockResolvedValueOnce([
        {
          onHand: 5,
          reserved: 1,
          productType: 'standard',
        },
      ]);
    tx.select
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ord_launch',
            customerId: 'cust_1',
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            id: 'cust_1',
            email: 'customer@example.com',
            firstName: 'Ada',
            lastName: 'Lovelace',
            phone: '+1 780 555 0100',
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            id: 'res_1',
            orderId: 'ord_launch',
            productId: 'prod_1',
            quantity: 1,
            status: 'active',
            expiresAt: new Date('2099-01-01T00:00:00.000Z'),
          },
        ]),
      )
      .mockReturnValueOnce(createChain([]));
    tx.update.mockImplementation(() => {
      const chain = createChain(undefined);
      txUpdateChains.push(chain);
      return chain;
    });
    tx.insert.mockReturnValue(createChain(undefined));
    tx.delete.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementationOnce(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          status: 'paid',
          confirmationEmailSentAt: null,
        },
      ]),
    );
    mocks.db.update.mockImplementation(() => {
      const chain = createChain(undefined);
      dbUpdateChains.push(chain);
      return chain;
    });
    mocks.sendOrderConfirmationEmailMock.mockRejectedValue(new Error('smtp unavailable'));

    const { finalizeCheckoutSession } = await importFresh(() => import('../../src/services/checkout/helpers'));
    const result = await finalizeCheckoutSession(session);

    expect(result).toEqual(
      expect.objectContaining({
        orderId: 'ord_launch',
        publicId: 'PBX-LAUNCH',
        needsAttention: false,
        alreadyFinalized: false,
      }),
    );
    expect(mocks.sendOrderConfirmationEmailMock).toHaveBeenCalledTimes(1);
    expect(txUpdateChains).not.toHaveLength(0);
    expect(dbUpdateChains).toHaveLength(1);
    expect(dbUpdateChains[0]?.set).toHaveBeenCalledWith(
      expect.objectContaining({
        confirmationEmailError: 'smtp unavailable',
      }),
    );
  });

  it('marks late payments after reservation expiry as paid_needs_attention', async () => {
    const session = buildCheckoutSession({
      id: 'cs_late_payment',
      metadata: {
        orderId: 'ord_launch',
        orderPublicId: 'PBX-LAUNCH',
      },
    });
    const initialTx = createDbLikeMock();
    const attentionTx = createDbLikeMock();
    const attentionUpdateChains: Array<ReturnType<typeof createChain>> = [];

    mocks.stripe.checkout.sessions.retrieve.mockResolvedValue(session);
    initialTx.execute.mockResolvedValueOnce([
      {
        publicId: 'PBX-LAUNCH',
        customerId: 'cust_1',
        stripeCheckoutSessionId: 'cs_late_payment',
        status: 'pending_payment',
        currency: 'CAD',
        subtotalCents: 1000,
        shippingCents: 1500,
      },
    ]);
    initialTx.select
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ord_launch',
            customerId: 'cust_1',
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            id: 'cust_1',
            email: 'customer@example.com',
            firstName: 'Ada',
            lastName: 'Lovelace',
            phone: '+1 780 555 0100',
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            id: 'res_1',
            orderId: 'ord_launch',
            productId: 'prod_1',
            quantity: 1,
            status: 'active',
            expiresAt: new Date('2000-01-01T00:00:00.000Z'),
          },
        ]),
      );
    initialTx.update.mockReturnValue(createChain(undefined));
    initialTx.insert.mockReturnValue(createChain(undefined));
    initialTx.delete.mockReturnValue(createChain(undefined));

    attentionTx.select
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ord_launch',
            customerId: 'cust_1',
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            id: 'cust_1',
            email: 'customer@example.com',
            firstName: 'Ada',
            lastName: 'Lovelace',
            phone: '+1 780 555 0100',
          },
        ]),
      );
    attentionTx.execute.mockResolvedValue(undefined);
    attentionTx.update.mockImplementation(() => {
      const chain = createChain(undefined);
      attentionUpdateChains.push(chain);
      return chain;
    });
    attentionTx.insert.mockReturnValue(createChain(undefined));
    attentionTx.delete.mockReturnValue(createChain(undefined));
    mocks.db.transaction
      .mockImplementationOnce(async (callback: (client: typeof initialTx) => Promise<unknown>) => callback(initialTx))
      .mockImplementationOnce(async (callback: (client: typeof attentionTx) => Promise<unknown>) => callback(attentionTx));
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          status: 'paid_needs_attention',
          confirmationEmailSentAt: new Date('2026-03-28T00:00:00.000Z'),
        },
      ]),
    );
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { finalizeCheckoutSession } = await importFresh(() => import('../../src/services/checkout/helpers'));
    const result = await finalizeCheckoutSession(session);

    expect(result).toEqual(
      expect.objectContaining({
        orderId: 'ord_launch',
        publicId: 'PBX-LAUNCH',
        needsAttention: true,
        alreadyFinalized: false,
      }),
    );
    expect(attentionUpdateChains.some((chain) => chain.set.mock.calls[0]?.[0]?.status === 'paid_needs_attention')).toBe(
      true,
    );
  });

  it('treats duplicate finalization on an already-paid order as already finalized without inventory conversion', async () => {
    const session = buildCheckoutSession({
      id: 'cs_already_paid',
      metadata: {
        orderId: 'ord_launch',
        orderPublicId: 'PBX-LAUNCH',
      },
    });
    const tx = createDbLikeMock();

    mocks.stripe.checkout.sessions.retrieve.mockResolvedValue(session);
    tx.execute.mockResolvedValueOnce([
      {
        publicId: 'PBX-LAUNCH',
        customerId: 'cust_1',
        stripeCheckoutSessionId: 'cs_already_paid',
        status: 'paid',
        currency: 'CAD',
        subtotalCents: 1000,
        shippingCents: 1500,
      },
    ]);
    tx.select.mockReturnValue(createChain([]));
    tx.update.mockReturnValue(createChain(undefined));
    tx.insert.mockReturnValue(createChain(undefined));
    tx.delete.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementationOnce(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          status: 'paid',
          confirmationEmailSentAt: new Date('2026-03-28T00:00:00.000Z'),
        },
      ]),
    );
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { finalizeCheckoutSession } = await importFresh(() => import('../../src/services/checkout/helpers'));
    const result = await finalizeCheckoutSession(session);

    expect(result).toEqual(
      expect.objectContaining({
        orderId: 'ord_launch',
        publicId: 'PBX-LAUNCH',
        alreadyFinalized: true,
      }),
    );
    expect(tx.select).not.toHaveBeenCalled();
    expect(tx.update).not.toHaveBeenCalled();
  });

  it('returns the same revealed ticket result when the same ticket is revealed twice', async () => {
    const ticketView = {
      id: 'ticket_1',
      ticketNumber: 'PBX-TKT-1',
      revealedAt: new Date('2026-03-28T00:00:00.000Z'),
      voidedAt: null,
      voidReason: null,
      prize: {
        id: 'prize_1',
        name: 'Prize A',
        description: null,
        imageUrl: null,
        prizeCode: 'A',
      },
      kujiProduct: {
        id: 'product_1',
        name: 'Kuji Box',
        slug: 'kuji-box',
        imageUrl: null,
        imageAltText: 'Kuji Box',
      },
      createdAt: new Date('2026-03-28T00:00:00.000Z'),
    };

    mocks.db.select
      .mockReturnValueOnce(createChain([{ status: 'paid' }]))
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ticket_1',
            orderId: 'ord_launch',
            revealedAt: new Date('2026-03-28T00:00:00.000Z'),
            voidedAt: null,
          },
        ]),
      );
    mocks.db.update.mockReturnValue(createChain(undefined));
    mocks.getOrderDetailByIdMock.mockResolvedValue({
      publicId: 'PBX-LAUNCH',
    });
    mocks.getGuestTicketViewMock.mockResolvedValue({
      tickets: [ticketView],
      revealed: [ticketView],
      unrevealed: [],
      counts: {
        total: 1,
        revealed: 1,
        unrevealed: 0,
      },
    });

    const { revealTicket } = await importFresh(() => import('../../src/services/orders'));
    const result = await revealTicket('ord_launch', 'ticket_1');

    expect(result).toEqual(ticketView);
    expect(mocks.db.update).not.toHaveBeenCalled();
  });

  it('keeps voided tickets non-revealable', async () => {
    mocks.db.select
      .mockReturnValueOnce(createChain([{ status: 'paid' }]))
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ticket_1',
            orderId: 'ord_launch',
            revealedAt: null,
            voidedAt: new Date('2026-03-28T00:00:00.000Z'),
          },
        ]),
      );
    mocks.db.update.mockReturnValue(createChain(undefined));

    const { revealTicket } = await importFresh(() => import('../../src/services/orders'));

    await expect(revealTicket('ord_launch', 'ticket_1')).rejects.toMatchObject({
      msg: 'Ticket is voided',
    });
    expect(mocks.db.update).not.toHaveBeenCalled();
  });

  it('disallows admins from generically setting orders back to paid', async () => {
    const { updateAdminOrderStatus } = await importFresh(() => import('../../src/services/orders'));

    await expect(updateAdminOrderStatus('ord_launch', 'paid')).rejects.toMatchObject({
      msg: 'Admins cannot set orders to paid',
    });
  });

  it('sends a shipment update email when tracking fields change on an already shipped order', async () => {
    const tx = createDbLikeMock();

    tx.execute.mockResolvedValueOnce([
      {
        id: 'ord_launch',
        status: 'shipped',
      },
    ]);
    tx.select.mockReturnValueOnce(
      createChain([
        {
          orderId: 'ord_launch',
          carrierName: 'Canada Post',
          trackingNumber: 'TRACK-OLD',
          trackingUrl: 'https://tracking.example.com/old',
          shippedAt: new Date('2026-03-28T00:00:00.000Z'),
          deliveredAt: null,
        },
      ]),
    );
    tx.update.mockReturnValue(createChain(undefined));
    tx.insert.mockReturnValue(createChain(undefined));
    tx.delete.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementationOnce(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    mocks.getOrderDetailByIdMock.mockResolvedValueOnce({
      id: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      status: 'shipped',
      currency: 'CAD',
      totalCents: 2630,
      customer: {
        email: 'customer@example.com',
        firstName: 'Ada',
      },
      shipment: {
        carrierName: 'Canada Post',
        trackingNumber: 'TRACK-NEW',
        trackingUrl: 'https://tracking.example.com/new',
        shippedAt: new Date('2026-03-28T00:00:00.000Z'),
        deliveredAt: null,
      },
      items: [],
      tickets: [],
    });

    const { updateShipment } = await importFresh(() => import('../../src/services/orders'));
    const result = await updateShipment('ord_launch', {
      trackingNumber: 'TRACK-NEW',
      trackingUrl: 'https://tracking.example.com/new',
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'ord_launch',
        status: 'shipped',
      }),
    );
    expect(mocks.sendShipmentUpdateEmailMock).toHaveBeenCalledTimes(1);
    expect(mocks.sendShipmentUpdateEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        orderPublicId: 'PBX-LAUNCH',
        trackingNumber: 'TRACK-NEW',
      }),
    );
    expect(mocks.sendShipmentEmailMock).not.toHaveBeenCalled();
  });

  it('does not send a shipment update email when only deliveredAt changes on an already shipped order', async () => {
    const tx = createDbLikeMock();

    tx.execute.mockResolvedValueOnce([
      {
        id: 'ord_launch',
        status: 'shipped',
      },
    ]);
    tx.select.mockReturnValueOnce(
      createChain([
        {
          orderId: 'ord_launch',
          carrierName: 'Canada Post',
          trackingNumber: 'TRACK-UNCHANGED',
          trackingUrl: 'https://tracking.example.com/same',
          shippedAt: new Date('2026-03-28T00:00:00.000Z'),
          deliveredAt: null,
        },
      ]),
    );
    tx.update.mockReturnValue(createChain(undefined));
    tx.insert.mockReturnValue(createChain(undefined));
    tx.delete.mockReturnValue(createChain(undefined));
    mocks.db.transaction.mockImplementationOnce(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx));
    mocks.getOrderDetailByIdMock.mockResolvedValueOnce({
      id: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      status: 'shipped',
      currency: 'CAD',
      totalCents: 2630,
      customer: {
        email: 'customer@example.com',
        firstName: 'Ada',
      },
      shipment: {
        carrierName: 'Canada Post',
        trackingNumber: 'TRACK-UNCHANGED',
        trackingUrl: 'https://tracking.example.com/same',
        shippedAt: new Date('2026-03-28T00:00:00.000Z'),
        deliveredAt: new Date('2026-03-29T00:00:00.000Z'),
      },
      items: [],
      tickets: [],
    });

    const { updateShipment } = await importFresh(() => import('../../src/services/orders'));
    await updateShipment('ord_launch', {
      deliveredAt: '2026-03-29T00:00:00.000Z',
    });

    expect(mocks.sendShipmentUpdateEmailMock).not.toHaveBeenCalled();
    expect(mocks.sendShipmentEmailMock).not.toHaveBeenCalled();
  });

  it('resends only the refund email for refunded orders', async () => {
    mocks.db.select.mockReturnValueOnce(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          status: 'refunded',
          confirmationEmailSentAt: new Date('2026-03-28T00:00:00.000Z'),
        },
      ]),
    );
    mocks.getOrderDetailByIdMock.mockResolvedValueOnce({
      id: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      status: 'refunded',
      currency: 'CAD',
      totalCents: 2630,
      customer: {
        email: 'customer@example.com',
        firstName: 'Ada',
      },
      shipment: null,
      items: [],
      tickets: [],
    });

    const { resendAdminOrderConfirmation } = await importFresh(() => import('../../src/services/orders'));
    const result = await resendAdminOrderConfirmation('ord_launch', 'admin_1');

    expect(result).toEqual(
      expect.objectContaining({
        id: 'ord_launch',
        publicId: 'PBX-LAUNCH',
        status: 'refunded',
        email: 'customer@example.com',
      }),
    );
    expect(mocks.sendRefundEmailMock).toHaveBeenCalledTimes(1);
    expect(mocks.sendOrderConfirmationEmailMock).not.toHaveBeenCalled();
  });

  it('keeps confirmation resend behavior for non-refunded orders', async () => {
    const confirmationSentAt = new Date('2026-03-28T00:00:00.000Z');

    mocks.db.select
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ord_launch',
            publicId: 'PBX-LAUNCH',
            status: 'paid',
            confirmationEmailSentAt: null,
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            id: 'ord_launch',
            publicId: 'PBX-LAUNCH',
            status: 'paid',
            confirmationEmailSentAt: null,
          },
        ]),
      );
    mocks.getOrderDetailByIdMock.mockResolvedValueOnce({
      id: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      status: 'paid',
      currency: 'CAD',
      totalCents: 2630,
      customer: {
        email: 'customer@example.com',
        firstName: 'Ada',
      },
      shipment: null,
      items: [],
      tickets: [],
    });
    const dbUpdateChain = createChain(undefined);
    mocks.db.update.mockReturnValueOnce(dbUpdateChain);

    const RealDate = Date;
    vi.useFakeTimers();
    vi.setSystemTime(confirmationSentAt);

    try {
      const { resendAdminOrderConfirmation } = await importFresh(() => import('../../src/services/orders'));
      const result = await resendAdminOrderConfirmation('ord_launch', 'admin_1');

      expect(result).toEqual(
        expect.objectContaining({
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          status: 'paid',
          email: 'customer@example.com',
          confirmationEmailSentAt: confirmationSentAt,
        }),
      );
      expect(mocks.sendOrderConfirmationEmailMock).toHaveBeenCalledTimes(1);
      expect(mocks.sendRefundEmailMock).not.toHaveBeenCalled();
      expect(dbUpdateChain.set).toHaveBeenCalledWith(
        expect.objectContaining({
          confirmationEmailSentAt: new RealDate(confirmationSentAt),
          confirmationEmailError: null,
        }),
      );
    } finally {
      vi.useRealTimers();
    }
  });
});
