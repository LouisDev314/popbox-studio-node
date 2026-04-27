import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, importFresh } from '../helpers/launch-test-kit';
import { decodeCursor } from '../../src/utils/cursor';

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

const buildProductRow = (
  overrides: Partial<{
    id: string;
    collectionId: string | null;
    name: string;
    slug: string;
    description: string | null;
    productType: 'standard' | 'kuji';
    status: 'draft' | 'active' | 'archived';
    priceCents: number;
    currency: string;
    sku: string | null;
    searchVector: string;
    createdAt: Date;
    updatedAt: Date;
  }> = {},
) => ({
  id: 'prod_1',
  collectionId: 'col_1',
  name: 'One Piece Figure',
  slug: 'one-piece-figure',
  description: null,
  productType: 'standard' as const,
  status: 'active' as const,
  priceCents: 4999,
  currency: 'CAD',
  sku: 'OP-001',
  searchVector: '',
  createdAt: new Date('2026-04-12T11:00:00.000Z'),
  updatedAt: new Date('2026-04-12T12:00:00.000Z'),
  ...overrides,
});

const buildTagRow = (
  overrides: Partial<{
    id: string;
    name: string;
    slug: string;
    tagType: string;
    createdAt: Date;
    updatedAt: Date;
  }> = {},
) => ({
  id: 'tag_1',
  name: 'Figure',
  slug: 'figure',
  tagType: 'category',
  createdAt: new Date('2026-04-10T00:00:00.000Z'),
  updatedAt: new Date('2026-04-10T00:00:00.000Z'),
  ...overrides,
});

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
  }> = {},
) => ({
  id: 'prod_1',
  name: 'One Piece Figure',
  slug: 'one-piece-figure',
  description: null,
  productType: 'standard' as const,
  status: 'active' as const,
  priceCents: 4999,
  currency: 'CAD',
  collections: [
    {
      id: 'col_1',
      name: 'One Piece',
      slug: 'one-piece',
    },
  ],
  imageId: 'img_1',
  imageStorageKey: 'products/one-piece-figure/main.webp',
  imageAltText: 'One Piece Figure',
  imageSortOrder: 1,
  inventoryOnHand: 12,
  inventoryReserved: 2,
  inventoryLowStockThreshold: 3,
  ...overrides,
});

describe('launch: admin product list contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns tags, primaryImage, inventory.available, and preserves cursor pagination', async () => {
    const updatedAt = new Date('2026-04-12T12:00:00.000Z');

    mocks.db.select
      .mockReturnValueOnce(
        createChain([
          {
            product: buildProductRow({
              id: 'prod_1',
              updatedAt,
            }),
            inventorySortValue: 10,
          },
          {
            product: buildProductRow({
              id: 'prod_2',
              name: 'Naruto Figure',
              slug: 'naruto-figure',
              sku: 'NA-001',
              updatedAt: new Date('2026-04-11T12:00:00.000Z'),
            }),
            inventorySortValue: 8,
          },
        ]),
      )
      .mockReturnValueOnce(
        createChain([
          {
            productId: 'prod_1',
            tag: buildTagRow({
              id: 'tag_1',
              name: 'Figure',
              slug: 'figure',
            }),
          },
          {
            productId: 'prod_1',
            tag: buildTagRow({
              id: 'tag_2',
              name: 'Limited',
              slug: 'limited',
            }),
          },
        ]),
      );

    mocks.db.execute.mockResolvedValueOnce([
      buildProductCardRow({
        id: 'prod_1',
        inventoryOnHand: 12,
        inventoryReserved: 2,
        inventoryLowStockThreshold: 3,
      }),
    ]);
    mocks.db.execute.mockResolvedValueOnce([
      {
        id: 'img_1',
        productId: 'prod_1',
        storageKey: 'products/one-piece-figure/main.webp',
        altText: 'One Piece Figure',
        sortOrder: 1,
      },
    ]);

    const { listAdminProducts } = await importFresh(() => import('../../src/services/admin'));
    const result = await listAdminProducts({
      limit: 1,
      sort: 'inventory_desc',
    });

    expect(result.items).toEqual([
      {
        id: 'prod_1',
        name: 'One Piece Figure',
        slug: 'one-piece-figure',
        sku: 'OP-001',
        status: 'active',
        productType: 'standard',
        priceCents: 4999,
        currency: 'CAD',
        collections: [
          {
            id: 'col_1',
            name: 'One Piece',
            slug: 'one-piece',
          },
        ],
        inventory: {
          onHand: 12,
          reserved: 2,
          available: 10,
          lowStockThreshold: 3,
        },
        tags: [
          {
            id: 'tag_1',
            name: 'Figure',
            slug: 'figure',
          },
          {
            id: 'tag_2',
            name: 'Limited',
            slug: 'limited',
          },
        ],
        primaryImage: {
          url: 'https://supabase.example.com/storage/v1/object/public/product-images/products/one-piece-figure/main.webp',
          storageKey: 'products/one-piece-figure/main.webp',
          altText: 'One Piece Figure',
        },
        updatedAt,
      },
    ]);
    expect(result.items[0]).not.toHaveProperty('createdAt');
    expect(decodeCursor(result.nextCursor)).toEqual({
      id: 'prod_1',
      inventorySortValue: 10,
    });
  });

  it('returns strict null and empty defaults when collection, inventory, tags, and image are absent', async () => {
    const updatedAt = new Date('2026-04-12T12:30:00.000Z');

    mocks.db.select
      .mockReturnValueOnce(
        createChain([
          {
            product: buildProductRow({
              id: 'prod_3',
              collectionId: null,
              name: 'Mystery Item',
              slug: 'mystery-item',
              sku: null,
              updatedAt,
            }),
            inventorySortValue: 0,
          },
        ]),
      )
      .mockReturnValueOnce(createChain([]));

    mocks.db.execute.mockResolvedValueOnce([
      buildProductCardRow({
        id: 'prod_3',
        name: 'Mystery Item',
        slug: 'mystery-item',
        collections: [],
        inventoryOnHand: null,
        inventoryReserved: null,
        inventoryLowStockThreshold: null,
      }),
    ]);
    mocks.db.execute.mockResolvedValueOnce([]);

    const { listAdminProducts } = await importFresh(() => import('../../src/services/admin'));
    const result = await listAdminProducts({
      limit: 10,
    });

    expect(result.items).toEqual([
      {
        id: 'prod_3',
        name: 'Mystery Item',
        slug: 'mystery-item',
        sku: null,
        status: 'active',
        productType: 'standard',
        priceCents: 4999,
        currency: 'CAD',
        collections: [],
        inventory: null,
        tags: [],
        primaryImage: null,
        updatedAt,
      },
    ]);
    expect(result.items[0]).not.toHaveProperty('createdAt');
    expect(result.nextCursor).toBeNull();
  });
});
