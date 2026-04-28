import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, importFresh } from '../helpers/launch-test-kit';
import { kujiPrizeBodySchema, kujiPrizePatchBodySchema } from '../../src/schemas/admin';

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

const buildKujiProduct = () => ({
  id: 'prod_kuji',
  name: 'Ichiban Kuji',
  slug: 'ichiban-kuji',
  description: null,
  productType: 'kuji' as const,
  status: 'active' as const,
  priceCents: 1200,
  currency: 'CAD',
  sku: 'KUJI-1',
  searchVector: '',
  createdAt: new Date('2026-04-12T00:00:00.000Z'),
  updatedAt: new Date('2026-04-12T00:00:00.000Z'),
});

const buildKujiPrize = (overrides: Partial<{ id: string; prizeCode: string; prizeTier: string }> = {}) => ({
  id: overrides.id ?? 'prize_1',
  productId: 'prod_kuji',
  prizeCode: overrides.prizeCode ?? 'A1',
  prizeTier: overrides.prizeTier ?? 'A',
  name: 'Prize A',
  description: null,
  imageUrl: null,
  initialQuantity: 1,
  remainingQuantity: 1,
  sortOrder: 0,
  createdAt: new Date('2026-04-12T00:00:00.000Z'),
  updatedAt: new Date('2026-04-12T00:00:00.000Z'),
});

const mockInventorySync = () => {
  mocks.db.select.mockReturnValueOnce(createChain([{ remaining: 2 }]));
  mocks.db.execute.mockResolvedValueOnce([{ onHand: 2, reserved: 0 }]);
};

describe('launch: kuji prize tier validation', () => {
  it('requires prizeTier when creating a kuji prize', () => {
    const result = kujiPrizeBodySchema.safeParse({
      prizeCode: 'A1',
      name: 'Prize A',
      initialQuantity: 1,
    });

    expect(result.success).toBe(false);
  });

  it('normalizes prizeCode and prizeTier while allowing patch payloads to omit prizeTier', () => {
    const createResult = kujiPrizeBodySchema.safeParse({
      prizeCode: ' a1 ',
      prizeTier: ' a ',
      name: 'Prize A',
      initialQuantity: 1,
    });
    const patchResult = kujiPrizePatchBodySchema.safeParse({
      prizeCode: ' b2 ',
    });

    expect(createResult.success).toBe(true);
    expect(patchResult.success).toBe(true);

    if (!createResult.success || !patchResult.success) {
      throw new Error('Expected kuji prize schemas to parse');
    }

    expect(createResult.data).toMatchObject({
      prizeCode: 'A1',
      prizeTier: 'A',
    });
    expect(patchResult.data).toMatchObject({
      prizeCode: 'B2',
    });
  });
});

describe('launch: admin kuji prize tier writes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.db.transaction.mockImplementation(async (callback) => callback(mocks.db));
  });

  it('creates A1 and A2 under the same product with display tier A', async () => {
    const insertA1 = createChain([buildKujiPrize({ id: 'prize_a1', prizeCode: 'A1', prizeTier: 'A' })]);
    const insertA2 = createChain([buildKujiPrize({ id: 'prize_a2', prizeCode: 'A2', prizeTier: 'A' })]);

    mocks.db.select
      .mockReturnValueOnce(createChain([buildKujiProduct()]))
      .mockReturnValueOnce(createChain([{ remaining: 2 }]))
      .mockReturnValueOnce(createChain([buildKujiProduct()]))
      .mockReturnValueOnce(createChain([{ remaining: 2 }]));
    mocks.db.insert.mockReturnValueOnce(insertA1).mockReturnValueOnce(insertA2);
    mocks.db.execute.mockResolvedValue([{ onHand: 2, reserved: 0 }]);

    const { createKujiPrize } = await importFresh(() => import('../../src/services/admin'));
    const first = await createKujiPrize('prod_kuji', {
      prizeCode: ' a1 ',
      prizeTier: ' a ',
      name: 'Prize A1',
      initialQuantity: 1,
    });
    const second = await createKujiPrize('prod_kuji', {
      prizeCode: 'a2',
      prizeTier: 'a',
      name: 'Prize A2',
      initialQuantity: 1,
    });

    expect(first.prizeCode).toBe('A1');
    expect(second.prizeCode).toBe('A2');
    expect(insertA1.values).toHaveBeenCalledWith(expect.objectContaining({ prizeCode: 'A1', prizeTier: 'A' }));
    expect(insertA2.values).toHaveBeenCalledWith(expect.objectContaining({ prizeCode: 'A2', prizeTier: 'A' }));
  });

  it('returns conflict when a duplicate prizeCode violates the product/code unique constraint', async () => {
    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.transaction.mockRejectedValueOnce({
      code: '23505',
      constraint_name: 'kuji_prizes_product_code_unique',
    });

    const { createKujiPrize } = await importFresh(() => import('../../src/services/admin'));

    await expect(
      createKujiPrize('prod_kuji', {
        prizeCode: 'A1',
        prizeTier: 'A',
        name: 'Prize A',
        initialQuantity: 1,
      }),
    ).rejects.toMatchObject({
      code: 409,
      msg: 'Kuji prize code already exists for this product',
    });
  });

  it('updates prizeCode and preserves existing prizeTier when omitted', async () => {
    const updateChain = createChain([buildKujiPrize({ prizeCode: 'B1', prizeTier: 'A' })]);

    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.execute.mockResolvedValueOnce([buildKujiPrize({ prizeCode: 'A1', prizeTier: 'A' })]);
    mocks.db.update.mockReturnValueOnce(updateChain);
    mockInventorySync();

    const { updateKujiPrize } = await importFresh(() => import('../../src/services/admin'));
    const result = await updateKujiPrize('prod_kuji', 'prize_1', {
      prizeCode: ' b1 ',
    });

    expect(result.prizeCode).toBe('B1');
    expect(updateChain.set).toHaveBeenCalledWith(expect.objectContaining({ prizeCode: 'B1', prizeTier: 'A' }));
  });
});

describe('launch: kuji prize tier product response', () => {
  it('includes prizeCode and prizeTier in kuji prize API payloads', async () => {
    const { mapProduct } = await importFresh(() => import('../../src/services/product'));
    const result = mapProduct(buildKujiProduct(), {
      images: new Map(),
      tags: new Map(),
      inventory: new Map(),
      collections: new Map(),
      kujiPrizes: new Map([['prod_kuji', [buildKujiPrize({ prizeCode: 'A1', prizeTier: 'A' })]]]),
    });

    expect(result.kujiPrizes[0]).toMatchObject({
      prizeCode: 'A1',
      prizeTier: 'A',
    });
  });
});
