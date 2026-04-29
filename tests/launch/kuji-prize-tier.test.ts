import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, importFresh } from '../helpers/launch-test-kit';
import { kujiPrizeBodySchema, kujiPrizePatchBodySchema } from '../../src/schemas/admin';

const mocks = vi.hoisted(() => {
  const storageRemove = vi.fn().mockResolvedValue({ error: null });
  const storageFrom = vi.fn(() => ({
    remove: storageRemove,
  }));
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
    logger: {
      error: vi.fn(),
    },
    storageFrom,
    storageRemove,
    supabaseModule: {
      supabaseAdmin: {
        storage: {
          from: storageFrom,
        },
      },
    },
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/integrations/supabase', () => mocks.supabaseModule);
vi.mock('../../src/utils/logger', () => ({
  default: mocks.logger,
}));

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

const buildKujiPrize = (
  overrides: Partial<{ id: string; prizeCode: string; prizeTier: string; imageUrl: string | null }> = {},
) => ({
  id: overrides.id ?? 'prize_1',
  productId: 'prod_kuji',
  prizeCode: overrides.prizeCode ?? 'A1',
  prizeTier: overrides.prizeTier ?? 'A',
  name: 'Prize A',
  description: null,
  imageUrl: 'imageUrl' in overrides ? (overrides.imageUrl ?? null) : null,
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

const buildManagedKujiPrizeImageUrl = (fileName: string) =>
  `https://supabase.example.com/storage/v1/object/public/product-images/products/prod_kuji/kuji-prizes/${fileName}`;

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
    mocks.storageRemove.mockResolvedValue({ error: null });
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

  it('clears an existing managed kuji prize image and removes the old storage object', async () => {
    const oldImageUrl = buildManagedKujiPrizeImageUrl('old-prize.webp');
    const updateChain = createChain([buildKujiPrize({ imageUrl: null })]);

    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.execute.mockResolvedValueOnce([buildKujiPrize({ imageUrl: oldImageUrl })]);
    mocks.db.update.mockReturnValueOnce(updateChain);
    mockInventorySync();

    const { updateKujiPrize } = await importFresh(() => import('../../src/services/admin'));
    const result = await updateKujiPrize('prod_kuji', 'prize_1', {
      imageUrl: null,
    });

    expect(result.imageUrl).toBeNull();
    expect(updateChain.set).toHaveBeenCalledWith(expect.objectContaining({ imageUrl: null }));
    expect(mocks.storageFrom).toHaveBeenCalledWith('product-images');
    expect(mocks.storageRemove).toHaveBeenCalledWith(['products/prod_kuji/kuji-prizes/old-prize.webp']);
    expect(mocks.logger.error).not.toHaveBeenCalled();
  });

  it('replaces an existing managed kuji prize image and removes only the old storage object', async () => {
    const oldImageUrl = buildManagedKujiPrizeImageUrl('old-prize.webp');
    const newImageUrl = buildManagedKujiPrizeImageUrl('new-prize.webp');
    const updateChain = createChain([buildKujiPrize({ imageUrl: newImageUrl })]);

    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.execute.mockResolvedValueOnce([buildKujiPrize({ imageUrl: oldImageUrl })]);
    mocks.db.update.mockReturnValueOnce(updateChain);
    mockInventorySync();

    const { updateKujiPrize } = await importFresh(() => import('../../src/services/admin'));
    const result = await updateKujiPrize('prod_kuji', 'prize_1', {
      imageUrl: newImageUrl,
    });

    expect(result.imageUrl).toBe(newImageUrl);
    expect(updateChain.set).toHaveBeenCalledWith(expect.objectContaining({ imageUrl: newImageUrl }));
    expect(mocks.storageRemove).toHaveBeenCalledTimes(1);
    expect(mocks.storageRemove).toHaveBeenCalledWith(['products/prod_kuji/kuji-prizes/old-prize.webp']);
  });

  it('does not remove storage when the kuji prize image URL is unchanged', async () => {
    const imageUrl = buildManagedKujiPrizeImageUrl('same-prize.webp');
    const updateChain = createChain([buildKujiPrize({ imageUrl })]);

    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.execute.mockResolvedValueOnce([buildKujiPrize({ imageUrl })]);
    mocks.db.update.mockReturnValueOnce(updateChain);
    mockInventorySync();

    const { updateKujiPrize } = await importFresh(() => import('../../src/services/admin'));
    const result = await updateKujiPrize('prod_kuji', 'prize_1', {
      imageUrl,
    });

    expect(result.imageUrl).toBe(imageUrl);
    expect(mocks.storageRemove).not.toHaveBeenCalled();
  });

  it('logs kuji prize image cleanup failures while still returning the updated prize', async () => {
    const oldImageUrl = buildManagedKujiPrizeImageUrl('old-prize.webp');
    const newImageUrl = buildManagedKujiPrizeImageUrl('new-prize.webp');
    const cleanupError = { message: 'storage remove failed' };
    const updateChain = createChain([buildKujiPrize({ imageUrl: newImageUrl })]);

    mocks.storageRemove.mockResolvedValueOnce({ error: cleanupError });
    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.execute.mockResolvedValueOnce([buildKujiPrize({ imageUrl: oldImageUrl })]);
    mocks.db.update.mockReturnValueOnce(updateChain);
    mockInventorySync();

    const { updateKujiPrize } = await importFresh(() => import('../../src/services/admin'));
    const result = await updateKujiPrize('prod_kuji', 'prize_1', {
      imageUrl: newImageUrl,
    });

    expect(result.imageUrl).toBe(newImageUrl);
    expect(mocks.logger.error).toHaveBeenCalledWith(
      {
        productId: 'prod_kuji',
        prizeId: 'prize_1',
        storageKey: 'products/prod_kuji/kuji-prizes/old-prize.webp',
        error: cleanupError,
      },
      'Kuji prize image cleanup failed',
    );
  });

  it('does not remove storage when the kuji prize update fails', async () => {
    mocks.db.select.mockReturnValueOnce(createChain([buildKujiProduct()]));
    mocks.db.transaction.mockRejectedValueOnce(new Error('update failed'));

    const { updateKujiPrize } = await importFresh(() => import('../../src/services/admin'));

    await expect(
      updateKujiPrize('prod_kuji', 'prize_1', {
        imageUrl: buildManagedKujiPrizeImageUrl('new-prize.webp'),
      }),
    ).rejects.toThrow('update failed');
    expect(mocks.storageRemove).not.toHaveBeenCalled();
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
