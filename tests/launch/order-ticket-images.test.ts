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

  return {
    db,
    dbModule: {
      db,
      verifyDatabaseConnection: vi.fn().mockResolvedValue(undefined),
      pgInit: vi.fn().mockResolvedValue(undefined),
      pgStop: vi.fn().mockResolvedValue(undefined),
    },
  };
});

vi.mock('../../src/db', () => mocks.dbModule);

const buildOrderRecord = () => ({
  order: {
    id: 'ord_launch',
    publicId: 'PBX-LAUNCH',
    customerId: 'cust_1',
    status: 'paid',
    includesLastOnePrize: false,
    currency: 'CAD',
    subtotalCents: 1200,
    taxCents: 0,
    shippingCents: 0,
    totalCents: 1200,
    placedAt: new Date('2026-04-13T00:00:00.000Z'),
    paidAt: new Date('2026-04-13T00:01:00.000Z'),
    cancelledAt: null,
    refundedAt: null,
    shippingAddressJson: {},
    billingAddressJson: null,
    customerDetailsJson: null,
    createdAt: new Date('2026-04-13T00:00:00.000Z'),
    updatedAt: new Date('2026-04-13T00:01:00.000Z'),
    guestAccessTokenHash: null,
    orderNotificationSentAt: null,
    stripeCheckoutSessionId: null,
    stripePaymentIntentId: null,
    reservationExpiresAt: null,
  },
  customer: {
    id: 'cust_1',
    email: 'guest@example.com',
    firstName: 'Guest',
    lastName: 'Buyer',
    phone: null,
    isGuest: true,
    createdAt: new Date('2026-04-13T00:00:00.000Z'),
    updatedAt: new Date('2026-04-13T00:00:00.000Z'),
  },
});

const buildTicketJoinRow = (overrides?: {
  revealedAt?: Date | null;
  productName?: string;
  productId?: string;
}) => ({
  ticket: {
    id: 'ticket_1',
    orderId: 'ord_launch',
    orderItemId: 'item_1',
    customerId: 'cust_1',
    kujiProductId: overrides?.productId ?? 'prod_kuji',
    kujiPrizeId: 'prize_1',
    ticketNumber: 'PBX-TKT-1',
    revealedAt: overrides?.revealedAt ?? new Date('2026-04-13T00:02:00.000Z'),
    voidedAt: null,
    voidReason: null,
    createdAt: new Date('2026-04-13T00:00:30.000Z'),
    updatedAt: new Date('2026-04-13T00:02:00.000Z'),
  },
  prize: {
    id: 'prize_1',
    productId: overrides?.productId ?? 'prod_kuji',
    prizeCode: 'A',
    name: 'Prize A',
    description: null,
    imageUrl: 'https://example.com/prize-a.png',
    initialQuantity: 10,
    remainingQuantity: 5,
    sortOrder: 1,
    createdAt: new Date('2026-04-12T00:00:00.000Z'),
    updatedAt: new Date('2026-04-12T00:00:00.000Z'),
  },
  product: {
    id: overrides?.productId ?? 'prod_kuji',
    collectionId: null,
    name: overrides?.productName ?? 'Ichiban Kuji Box',
    slug: 'ichiban-kuji-box',
    description: null,
    productType: 'kuji' as const,
    status: 'active' as const,
    priceCents: 1200,
    currency: 'CAD',
    sku: 'KUJI-1',
    searchVector: '',
    createdAt: new Date('2026-04-12T00:00:00.000Z'),
    updatedAt: new Date('2026-04-12T00:00:00.000Z'),
  },
});

const buildProductImage = (overrides?: {
  id?: string;
  productId?: string;
  storageKey?: string;
  sortOrder?: number;
  altText?: string | null;
  createdAt?: Date;
}) => ({
  id: overrides?.id ?? 'img_1',
  productId: overrides?.productId ?? 'prod_kuji',
  storageKey: overrides?.storageKey ?? 'products/prod_kuji/cover.webp',
  sortOrder: overrides?.sortOrder ?? 1,
  altText: overrides?.altText ?? null,
  createdAt: overrides?.createdAt ?? new Date('2026-04-12T00:00:00.000Z'),
  updatedAt: new Date('2026-04-12T00:00:00.000Z'),
});

describe('launch: guest ticket kuji product images', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the deterministic first kuji product image ordered by sort order then creation time', async () => {
    mocks.db.select
      .mockReturnValueOnce(createChain([buildOrderRecord()]))
      .mockReturnValueOnce(createChain([]))
      .mockReturnValueOnce(createChain([]))
      .mockReturnValueOnce(createChain([buildTicketJoinRow()]));
    mocks.db.execute.mockReturnValueOnce(
      createChain([
        buildProductImage({
          id: 'img_oldest_sort_1',
          storageKey: 'products/prod_kuji/primary.webp',
          sortOrder: 1,
          altText: null,
          createdAt: new Date('2026-04-10T00:00:00.000Z'),
        }),
      ]),
    );

    const { getGuestTicketView } = await importFresh(() => import('../../src/services/orders/helpers'));
    const result = await getGuestTicketView('PBX-LAUNCH');

    expect(result.counts.total).toBe(1);
    expect(result.tickets[0]?.kujiProduct.imageUrl).toBe(
      'https://supabase.example.com/storage/v1/object/public/product-images/products/prod_kuji/primary.webp',
    );
    expect(result.tickets[0]?.kujiProduct.imageAltText).toBe('Ichiban Kuji Box');
  });

  it('returns a null kuji product imageUrl when the product has no images', async () => {
    mocks.db.select
      .mockReturnValueOnce(createChain([buildOrderRecord()]))
      .mockReturnValueOnce(createChain([]))
      .mockReturnValueOnce(createChain([]))
      .mockReturnValueOnce(createChain([buildTicketJoinRow({ productName: 'No Image Kuji' })]));
    mocks.db.execute.mockReturnValueOnce(createChain([]));

    const { getGuestTicketView } = await importFresh(() => import('../../src/services/orders/helpers'));
    const result = await getGuestTicketView('PBX-LAUNCH');

    expect(result.tickets[0]?.kujiProduct.imageUrl).toBeNull();
    expect(result.tickets[0]?.kujiProduct.imageAltText).toBe('No Image Kuji');
  });
});
