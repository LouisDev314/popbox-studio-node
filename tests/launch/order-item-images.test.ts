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
    status: 'paid',
    includesLastOnePrize: false,
    currency: 'CAD',
    subtotalCents: 3200,
    taxCents: 0,
    shippingCents: 0,
    totalCents: 3200,
    placedAt: new Date('2026-04-13T00:00:00.000Z'),
    paidAt: new Date('2026-04-13T00:01:00.000Z'),
    cancelledAt: null,
    refundedAt: null,
    shippingAddressJson: {},
    billingAddressJson: null,
    customerDetailsJson: null,
  },
  customer: {
    id: 'cust_1',
    email: 'guest@example.com',
    firstName: 'Guest',
    lastName: 'Buyer',
    phone: null,
  },
});

const buildOrderItem = (
  overrides: {
    id?: string;
    productId?: string;
    productName?: string;
    productType?: 'standard' | 'kuji';
    unitPriceCents?: number;
    quantity?: number;
    lineTotalCents?: number;
    metadata?: Record<string, unknown> | null;
  } = {},
) => ({
  id: overrides.id ?? 'item_1',
  productId: overrides.productId ?? 'prod_standard',
  productName: overrides.productName ?? 'Snapshot Figure Name',
  productType: overrides.productType ?? 'standard',
  unitPriceCents: overrides.unitPriceCents ?? 1600,
  quantity: overrides.quantity ?? 2,
  lineTotalCents: overrides.lineTotalCents ?? 3200,
  metadata: overrides.metadata ?? { sku: 'SNAP-1' },
});

const buildProductImage = (
  overrides: {
    id?: string;
    productId?: string;
    storageKey?: string;
    altText?: string | null;
  } = {},
) => ({
  productId: overrides.productId ?? 'prod_standard',
  storageKey: overrides.storageKey ?? 'products/prod_standard/primary.webp',
  altText: 'altText' in overrides ? (overrides.altText ?? null) : 'Primary figure image',
  id: overrides.id ?? 'img_1',
});

const flattenSql = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => flattenSql(item)).join('');
  }

  if (!value || typeof value !== 'object') {
    return '';
  }

  if ('queryChunks' in value) {
    return flattenSql((value as { queryChunks: unknown[] }).queryChunks);
  }

  if ('value' in value) {
    return flattenSql((value as { value: unknown }).value);
  }

  return '';
};

const mockOrderDetailQueries = (itemRows: ReturnType<typeof buildOrderItem>[], imageRows: ReturnType<typeof buildProductImage>[]) => {
  mocks.db.select
    .mockReturnValueOnce(createChain([buildOrderRecord()]))
    .mockReturnValueOnce(createChain(itemRows))
    .mockReturnValueOnce(createChain([]))
    .mockReturnValueOnce(createChain([]));
  mocks.db.execute.mockReturnValueOnce(createChain(imageRows));
};

describe('launch: guest order item images', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns order item image fields from product media while preserving snapshot fields', async () => {
    mockOrderDetailQueries(
      [
        buildOrderItem({
          productName: 'Historical Figure Name',
          unitPriceCents: 1800,
          quantity: 3,
          lineTotalCents: 5400,
          metadata: { checkoutName: 'Historical Figure Name', sku: 'HIST-1' },
        }),
      ],
      [buildProductImage({ altText: 'Current product image' })],
    );

    const { getGuestOrderViewByOrderId } = await importFresh(() => import('../../src/services/orders/helpers'));
    const result = await getGuestOrderViewByOrderId('ord_launch');

    expect(result.items[0]).toEqual({
      id: 'item_1',
      productId: 'prod_standard',
      productName: 'Historical Figure Name',
      productType: 'standard',
      unitPriceCents: 1800,
      quantity: 3,
      lineTotalCents: 5400,
      metadata: { checkoutName: 'Historical Figure Name', sku: 'HIST-1' },
      imageUrl:
        'https://supabase.example.com/storage/v1/object/public/product-images/products/prod_standard/primary.webp',
      imageAltText: 'Current product image',
    });
  });

  it('returns null image fields when an order item product has no image', async () => {
    mockOrderDetailQueries([buildOrderItem({ productName: 'No Image Snapshot' })], []);

    const { getGuestOrderViewByOrderId } = await importFresh(() => import('../../src/services/orders/helpers'));
    const result = await getGuestOrderViewByOrderId('ord_launch');

    expect(result.items[0]).toEqual(
      expect.objectContaining({
        productName: 'No Image Snapshot',
        imageUrl: null,
        imageAltText: null,
      }),
    );
  });

  it('uses deterministic primary product image ordering for order item images', async () => {
    mockOrderDetailQueries(
      [buildOrderItem()],
      [
        buildProductImage({
          id: 'img_lowest_sort_oldest_id',
          storageKey: 'products/prod_standard/selected.webp',
          altText: null,
        }),
      ],
    );

    const { getGuestOrderViewByOrderId } = await importFresh(() => import('../../src/services/orders/helpers'));
    const result = await getGuestOrderViewByOrderId('ord_launch');

    expect(result.items[0]?.imageUrl).toBe(
      'https://supabase.example.com/storage/v1/object/public/product-images/products/prod_standard/selected.webp',
    );
    expect(result.items[0]?.imageAltText).toBeNull();

    const normalizedQuery = flattenSql(mocks.db.execute.mock.calls[0]?.[0]).replace(/\s+/g, ' ').trim();
    expect(normalizedQuery).toContain('SELECT DISTINCT ON (pi.product_id)');
    expect(normalizedQuery).toContain('pi.sort_order ASC');
    expect(normalizedQuery).toContain('pi.created_at ASC');
    expect(normalizedQuery).toContain('pi.id ASC');
  });

  it('looks up item images in one batch for multiple products', async () => {
    mockOrderDetailQueries(
      [
        buildOrderItem({ id: 'item_1', productId: 'prod_one' }),
        buildOrderItem({ id: 'item_2', productId: 'prod_two', productName: 'Second Snapshot' }),
      ],
      [
        buildProductImage({ productId: 'prod_one', storageKey: 'products/prod_one/primary.webp' }),
        buildProductImage({ productId: 'prod_two', storageKey: 'products/prod_two/primary.webp' }),
      ],
    );

    const { getGuestOrderViewByOrderId } = await importFresh(() => import('../../src/services/orders/helpers'));
    const result = await getGuestOrderViewByOrderId('ord_launch');

    expect(result.items.map((item) => item.imageUrl)).toEqual([
      'https://supabase.example.com/storage/v1/object/public/product-images/products/prod_one/primary.webp',
      'https://supabase.example.com/storage/v1/object/public/product-images/products/prod_two/primary.webp',
    ]);
    expect(mocks.db.execute).toHaveBeenCalledTimes(1);
  });
});
