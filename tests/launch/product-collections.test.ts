import { readFileSync } from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, importFresh } from '../helpers/launch-test-kit';
import HttpStatusCode from '../../src/constants/http-status-code';
import { productBodySchema, productPatchBodySchema } from '../../src/schemas/admin';
import { decodeCursor, encodeCursor } from '../../src/utils/cursor';

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

const buildProductRow = () => ({
  id: 'prod_1',
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
});

const buildProductCardRow = () => ({
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
      name: 'Featured',
      slug: 'featured',
    },
  ],
  imageId: null,
  imageStorageKey: null,
  imageAltText: null,
  imageSortOrder: null,
  inventoryOnHand: null,
  inventoryReserved: null,
  inventoryLowStockThreshold: null,
  remainingTickets: 0,
  totalTickets: 0,
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

  if ('name' in value && typeof value.name === 'string') {
    return value.name;
  }

  const tableName = getDrizzleName(value);
  if (tableName) {
    return tableName;
  }

  if ('queryChunks' in value) {
    return flattenSql((value as { queryChunks: unknown[] }).queryChunks);
  }

  if ('value' in value) {
    return flattenSql((value as { value: unknown }).value);
  }

  return '';
};

const getDrizzleName = (value: unknown): string | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const nameSymbol = Object.getOwnPropertySymbols(value).find((symbol) => symbol.description === 'drizzle:Name');
  if (!nameSymbol) {
    return null;
  }

  const name = (value as Record<symbol, unknown>)[nameSymbol];
  return typeof name === 'string' ? name : null;
};

const mockProductReadAfterWrite = (productRow = buildProductRow()) => {
  mocks.db.select
    .mockReturnValueOnce(createChain([productRow]))
    .mockReturnValueOnce(createChain([]))
    .mockReturnValueOnce(createChain([]))
    .mockReturnValueOnce(createChain([]))
    .mockReturnValueOnce(
      createChain([
        {
          productId: 'prod_1',
          collection: {
            id: 'col_1',
            name: 'Featured',
            slug: 'featured',
          },
        },
        {
          productId: 'prod_1',
          collection: {
            id: 'col_2',
            name: 'One Piece',
            slug: 'one-piece',
          },
        },
      ]),
    )
    .mockReturnValueOnce(createChain([]));
};

describe('launch: product collections migration and validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds the product_collections join table and backfills legacy product collection data', () => {
    const migration = readFileSync('supabase/migrations/20260425000000_add_product_collections.sql', 'utf8');

    expect(migration).toContain('CREATE TABLE public.product_collections');
    expect(migration).toContain('PRIMARY KEY (product_id, collection_id)');
    expect(migration).toContain('CREATE INDEX product_collections_collection_sort_idx');
    expect(migration).toContain('CREATE INDEX product_collections_product_id_idx');
    expect(migration).toContain('SELECT id, collection_id, 0');
    expect(migration).toContain('WHERE collection_id IS NOT NULL');
    expect(migration).toContain('ON CONFLICT DO NOTHING');
  });

  it('requires collectionIds on create and rejects legacy collectionId payloads', () => {
    expect(
      productBodySchema.safeParse({
        collectionIds: [],
        name: 'One Piece Figure',
        productType: 'standard',
        status: 'active',
        priceCents: 4999,
      }).success,
    ).toBe(true);

    expect(
      productBodySchema.safeParse({
        collectionIds: [],
        collectionId: '00000000-0000-0000-0000-000000000001',
        name: 'One Piece Figure',
        productType: 'standard',
        status: 'active',
        priceCents: 4999,
      }).success,
    ).toBe(false);

    expect(productPatchBodySchema.safeParse({ collectionIds: [] }).success).toBe(true);
  });
});

describe('launch: product collection helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deduplicates, validates, and writes multiple product collections with stable sort order', async () => {
    const selectChain = createChain([{ id: 'col_1' }, { id: 'col_2' }]);
    const deleteChain = createChain([]);
    const insertChain = createChain([]);
    mocks.db.select.mockReturnValueOnce(selectChain);
    mocks.db.delete.mockReturnValueOnce(deleteChain);
    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { replaceProductCollections } = await importFresh(() => import('../../src/utils/product'));
    await replaceProductCollections(mocks.db, 'prod_1', ['col_1', 'col_2', 'col_1']);

    expect(insertChain.values).toHaveBeenCalledWith([
      {
        productId: 'prod_1',
        collectionId: 'col_1',
        sortOrder: 0,
      },
      {
        productId: 'prod_1',
        collectionId: 'col_2',
        sortOrder: 1,
      },
    ]);
  });

  it('rejects missing collection ids before replacing assignments', async () => {
    mocks.db.select.mockReturnValueOnce(createChain([{ id: 'col_1' }]));

    const { replaceProductCollections } = await importFresh(() => import('../../src/utils/product'));
    await expect(replaceProductCollections(mocks.db, 'prod_1', ['col_1', 'missing_col'])).rejects.toMatchObject({
      code: HttpStatusCode.BAD_REQUEST,
      msg: 'One or more collections do not exist',
      data: {
        collectionIds: ['missing_col'],
      },
    });

    expect(mocks.db.delete).not.toHaveBeenCalled();
  });
});

describe('launch: product collection queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCardHydration = () => {
    mocks.db.execute.mockResolvedValueOnce([buildProductCardRow()]).mockResolvedValueOnce([]);
  };

  it('filters public collection pages through product_collections and returns product collections', async () => {
    const productListChain = createChain([
      {
        id: 'prod_1',
        createdAt: new Date('2026-04-12T11:00:00.000Z'),
        priceCents: 4999,
        name: 'One Piece Figure',
        collectionSortOrder: 0,
      },
    ]);

    mocks.db.select.mockReturnValueOnce(productListChain);
    mockCardHydration();

    const { listProducts } = await importFresh(() => import('../../src/services/product'));
    const result = await listProducts({
      collection: 'featured',
      limit: 10,
    });

    expect(result.items[0]?.collections).toEqual([
      {
        id: 'col_1',
        name: 'Featured',
        slug: 'featured',
      },
    ]);

    const whereClause = productListChain.where.mock.calls[0]?.[0];
    const orderArgs = productListChain.orderBy.mock.calls[0] ?? [];
    const normalizedWhere = flattenSql(whereClause).replace(/\s+/g, ' ').trim();
    const normalizedOrder = flattenSql(orderArgs).replace(/\s+/g, ' ').trim();

    expect(getDrizzleName(productListChain.from.mock.calls[0]?.[0])).toBe('collections');
    expect(getDrizzleName(productListChain.innerJoin.mock.calls[0]?.[0])).toBe('product_collections');
    expect(getDrizzleName(productListChain.innerJoin.mock.calls[1]?.[0])).toBe('products');
    expect(normalizedWhere).not.toContain('EXISTS (');
    expect(normalizedWhere).not.toContain('SELECT product_collections.sort_order');
    expect(normalizedWhere).toContain('featured');
    expect(orderArgs).toHaveLength(3);
    expect(normalizedOrder).toContain('sort_order');
    expect(normalizedOrder).toContain('created_at');
    expect(normalizedOrder).toContain('id');
    expect(normalizedOrder).not.toContain('featured');
  });

  it('uses collection sort order with the newest cursor tuple', async () => {
    const productListChain = createChain([
      {
        id: 'prod_1',
        createdAt: new Date('2026-04-12T11:00:00.000Z'),
        priceCents: 4999,
        name: 'One Piece Figure',
        collectionSortOrder: 3,
      },
      {
        id: 'prod_2',
        createdAt: new Date('2026-04-12T10:00:00.000Z'),
        priceCents: 3999,
        name: 'Second Figure',
        collectionSortOrder: 4,
      },
    ]);

    mocks.db.select.mockReturnValueOnce(productListChain);
    mockCardHydration();

    const { listProducts } = await importFresh(() => import('../../src/services/product'));
    const result = await listProducts({
      collection: 'featured',
      limit: 1,
      cursor: encodeCursor({
        id: 'prod_cursor',
        createdAt: '2026-04-12T12:00:00.000Z',
        collectionSortOrder: 3,
      }),
    });

    const whereClause = productListChain.where.mock.calls[0]?.[0];
    const normalizedWhere = flattenSql(whereClause).replace(/\s+/g, ' ').trim();

    expect(normalizedWhere).toContain('sort_order');
    expect(normalizedWhere).toContain('created_at');
    expect(normalizedWhere).toContain('id');
    expect(normalizedWhere).not.toContain('EXISTS (');
    expect(decodeCursor(result.nextCursor)).toEqual({
      id: 'prod_1',
      createdAt: '2026-04-12T11:00:00.000Z',
      collectionSortOrder: 3,
    });
  });

  it('keeps collection sort order in price and name cursors', async () => {
    const priceListChain = createChain([
      {
        id: 'prod_1',
        createdAt: new Date('2026-04-12T11:00:00.000Z'),
        priceCents: 4999,
        name: 'One Piece Figure',
        collectionSortOrder: 2,
      },
      {
        id: 'prod_2',
        createdAt: new Date('2026-04-12T10:00:00.000Z'),
        priceCents: 5999,
        name: 'Second Figure',
        collectionSortOrder: 2,
      },
    ]);
    const nameListChain = createChain([
      {
        id: 'prod_1',
        createdAt: new Date('2026-04-12T11:00:00.000Z'),
        priceCents: 4999,
        name: 'One Piece Figure',
        collectionSortOrder: 2,
      },
      {
        id: 'prod_2',
        createdAt: new Date('2026-04-12T10:00:00.000Z'),
        priceCents: 5999,
        name: 'Second Figure',
        collectionSortOrder: 2,
      },
    ]);

    mocks.db.select.mockReturnValueOnce(priceListChain).mockReturnValueOnce(nameListChain);
    mockCardHydration();
    mockCardHydration();

    const { listProducts } = await importFresh(() => import('../../src/services/product'));
    const priceResult = await listProducts({
      collection: 'featured',
      sort: 'price_asc',
      limit: 1,
    });
    const nameResult = await listProducts({
      collection: 'featured',
      sort: 'name_asc',
      limit: 1,
    });

    expect(decodeCursor(priceResult.nextCursor)).toEqual({
      id: 'prod_1',
      priceCents: 4999,
      collectionSortOrder: 2,
    });
    expect(decodeCursor(nameResult.nextCursor)).toEqual({
      id: 'prod_1',
      name: 'One Piece Figure',
      collectionSortOrder: 2,
    });
  });

  it('returns an empty collection page without hydrating product cards', async () => {
    mocks.db.select.mockReturnValueOnce(createChain([]));

    const { listProducts } = await importFresh(() => import('../../src/services/product'));
    const result = await listProducts({
      collection: 'missing',
      limit: 10,
    });

    expect(result).toEqual({
      items: [],
      nextCursor: null,
    });
    expect(mocks.db.execute).not.toHaveBeenCalled();
  });

  it('keeps collection type and tag filters on product listings', async () => {
    const typeListChain = createChain([]);
    const tagListChain = createChain([]);
    mocks.db.select.mockReturnValueOnce(typeListChain).mockReturnValueOnce(tagListChain);

    const { listProducts } = await importFresh(() => import('../../src/services/product'));
    await listProducts({
      collection: 'featured',
      type: 'kuji',
      limit: 10,
    });
    await listProducts({
      collection: 'featured',
      tag: 'figure',
      limit: 10,
    });

    const typeWhere = flattenSql(typeListChain.where.mock.calls[0]?.[0]).replace(/\s+/g, ' ').trim();
    const tagWhere = flattenSql(tagListChain.where.mock.calls[0]?.[0]).replace(/\s+/g, ' ').trim();

    expect(typeWhere).toContain('kuji');
    expect(tagWhere).toContain('figure');
    expect(tagWhere).toContain('product_tags');
    expect(tagWhere).toContain('tags');
  });
});

describe('launch: admin product collection writes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.db.transaction.mockImplementation(async (callback) => callback(mocks.db));
  });

  it('creates a product with multiple collectionIds and returns collections only', async () => {
    const productInsertChain = createChain([buildProductRow()]);
    const collectionInsertChain = createChain([]);
    const inventoryInsertChain = createChain([]);

    mocks.db.select.mockReturnValueOnce(createChain([])).mockReturnValueOnce(createChain([{ id: 'col_1' }, { id: 'col_2' }]));
    mockProductReadAfterWrite();
    mocks.db.insert
      .mockReturnValueOnce(productInsertChain)
      .mockReturnValueOnce(collectionInsertChain)
      .mockReturnValueOnce(inventoryInsertChain);
    mocks.db.delete.mockReturnValueOnce(createChain([])).mockReturnValueOnce(createChain([]));

    const { createProduct } = await importFresh(() => import('../../src/services/admin'));
    const result = await createProduct({
      collectionIds: ['col_1', 'col_2'],
      name: 'One Piece Figure',
      productType: 'standard',
      status: 'active',
      priceCents: 4999,
    });

    expect(productInsertChain.values.mock.calls[0]?.[0]).not.toHaveProperty('collectionId');
    expect(collectionInsertChain.values).toHaveBeenCalledWith([
      {
        productId: 'prod_1',
        collectionId: 'col_1',
        sortOrder: 0,
      },
      {
        productId: 'prod_1',
        collectionId: 'col_2',
        sortOrder: 1,
      },
    ]);
    expect(result).toMatchObject({
      id: 'prod_1',
      collections: [
        {
          id: 'col_1',
          name: 'Featured',
          slug: 'featured',
        },
        {
          id: 'col_2',
          name: 'One Piece',
          slug: 'one-piece',
        },
      ],
    });
    expect(result).not.toHaveProperty('collection');
    expect(result).not.toHaveProperty('collectionId');
  });

  it('replaces product collection assignments with an empty array on update', async () => {
    const updatedProduct = buildProductRow();
    const updateChain = createChain([updatedProduct]);
    const deleteChain = createChain([]);

    mocks.db.select.mockReturnValueOnce(createChain([buildProductRow()]));
    mockProductReadAfterWrite(updatedProduct);
    mocks.db.update.mockReturnValueOnce(updateChain);
    mocks.db.delete.mockReturnValueOnce(deleteChain);

    const { updateProduct } = await importFresh(() => import('../../src/services/admin'));
    await updateProduct('prod_1', {
      collectionIds: [],
    });

    expect(deleteChain.where).toHaveBeenCalledTimes(1);
    expect(mocks.db.insert).not.toHaveBeenCalled();
  });
});
