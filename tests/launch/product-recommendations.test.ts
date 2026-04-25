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

const buildProductCardRow = (
  overrides: Partial<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    productType: 'standard' | 'kuji';
    status: 'draft' | 'active' | 'archived';
    priceCents: number;
    currency: string;
    collections: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    imageId: string | null;
    imageStorageKey: string | null;
    imageAltText: string | null;
    imageSortOrder: number | null;
    inventoryOnHand: number | null;
    inventoryReserved: number | null;
    inventoryLowStockThreshold: number | null;
    remainingTickets: number;
    totalTickets: number;
  }> = {},
) => ({
  id: 'prod_in_stock',
  name: 'In Stock Figure',
  slug: 'in-stock-figure',
  description: null,
  productType: 'standard' as const,
  status: 'active' as const,
  priceCents: 4999,
  currency: 'CAD',
  collections: [
    {
      id: 'col_1',
      name: 'Featured',
      slug: 'featured',
    },
  ],
  imageId: 'img_1',
  imageStorageKey: 'products/in-stock-figure/main.webp',
  imageAltText: 'In Stock Figure',
  imageSortOrder: 1,
  inventoryOnHand: 10,
  inventoryReserved: 2,
  inventoryLowStockThreshold: 3,
  remainingTickets: 0,
  totalTickets: 0,
  ...overrides,
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

describe('launch: product recommendations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('filters sold-out recommendations at SQL level and preserves ranked item order', async () => {
    mocks.db.select.mockReturnValueOnce(
      createChain([
        {
          id: 'prod_source',
          productType: 'standard',
          priceCents: 5000,
          currency: 'CAD',
        },
      ]),
    );

    mocks.db.execute
      .mockResolvedValueOnce([
        {
          id: 'prod_in_stock',
          score: 78,
          inStock: true,
        },
        {
          id: 'prod_kuji_in_stock',
          score: 63,
          inStock: true,
        },
      ])
      .mockResolvedValueOnce([
        buildProductCardRow({
          id: 'prod_kuji_in_stock',
          name: 'In Stock Kuji',
          slug: 'in-stock-kuji',
          productType: 'kuji',
          priceCents: 3999,
          imageStorageKey: 'products/in-stock-kuji/main.webp',
          imageAltText: 'In Stock Kuji',
          inventoryOnHand: 5,
          inventoryReserved: 1,
          remainingTickets: 23,
          totalTickets: 80,
        }),
        buildProductCardRow(),
      ]);

    const { getProductRecommendationsBySlug } = await importFresh(() => import('../../src/services/product'));
    const result = await getProductRecommendationsBySlug('source-product', 4);

    expect(result).toEqual({
      items: [
        {
          id: 'prod_in_stock',
          name: 'In Stock Figure',
          slug: 'in-stock-figure',
          description: null,
          productType: 'standard',
          status: 'active',
          priceCents: 4999,
          currency: 'CAD',
          collections: [
            {
              id: 'col_1',
              name: 'Featured',
              slug: 'featured',
            },
          ],
          images: [
            {
              id: 'img_1',
              storageKey: 'products/in-stock-figure/main.webp',
              altText: 'In Stock Figure',
              sortOrder: 1,
              url: 'https://supabase.example.com/storage/v1/object/public/product-images/products/in-stock-figure/main.webp',
            },
          ],
          inventory: {
            onHand: 10,
            reserved: 2,
            available: 8,
            lowStockThreshold: 3,
          },
        },
        {
          id: 'prod_kuji_in_stock',
          name: 'In Stock Kuji',
          slug: 'in-stock-kuji',
          description: null,
          productType: 'kuji',
          status: 'active',
          priceCents: 3999,
          currency: 'CAD',
          collections: [
            {
              id: 'col_1',
              name: 'Featured',
              slug: 'featured',
            },
          ],
          images: [
            {
              id: 'img_1',
              storageKey: 'products/in-stock-kuji/main.webp',
              altText: 'In Stock Kuji',
              sortOrder: 1,
              url: 'https://supabase.example.com/storage/v1/object/public/product-images/products/in-stock-kuji/main.webp',
            },
          ],
          inventory: {
            onHand: 5,
            reserved: 1,
            available: 4,
            lowStockThreshold: 3,
          },
          ticketSummary: {
            remainingTickets: 23,
            totalTickets: 80,
          },
        },
      ],
      meta: {
        count: 2,
        limit: 4,
      },
    });

    const recommendationQuery = mocks.db.execute.mock.calls[0]?.[0];
    const normalizedQuery = flattenSql(recommendationQuery).replace(/\s+/g, ' ').trim();

    expect(normalizedQuery).toContain("WHERE p.status = 'active' AND p.id <> ");
    expect(normalizedQuery).toContain('source_collections AS');
    expect(normalizedQuery).not.toContain('p.collection_id');
    expect(normalizedQuery).toContain('AND COALESCE(inventory.on_hand - inventory.reserved, 0) > 0');
    expect(normalizedQuery).toContain('ORDER BY "score" DESC, "inStock" DESC, p.created_at DESC, p.id DESC');

    const productCardQuery = mocks.db.execute.mock.calls[1]?.[0];
    const normalizedProductCardQuery = flattenSql(productCardQuery).replace(/\s+/g, ' ').trim();

    expect(normalizedProductCardQuery).toContain('ticket_summary."remainingTickets" AS "remainingTickets"');
    expect(normalizedProductCardQuery).toContain('ticket_summary."totalTickets" AS "totalTickets"');
    expect(normalizedProductCardQuery).toContain('collection_rows.collections AS "collections"');
    expect(normalizedProductCardQuery).toContain('COALESCE(sum(GREATEST(kp.remaining_quantity, 0)), 0)::int');
    expect(normalizedProductCardQuery).toContain('COALESCE(sum(GREATEST(kp.initial_quantity, 0)), 0)::int');
    expect(normalizedProductCardQuery).toContain('UPPER(BTRIM(kp.prize_code)) <>');
  });
});
