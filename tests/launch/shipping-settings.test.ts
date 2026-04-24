import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createChain, importFresh } from '../helpers/launch-test-kit';
import { shippingSettingsBodySchema } from '../../src/schemas/admin';

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

describe('launch: shipping settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    { subtotalCents: 14899, flatShippingCents: 1200, freeShippingThresholdCents: 14900, expected: 1200 },
    { subtotalCents: 14900, flatShippingCents: 1200, freeShippingThresholdCents: 14900, expected: 0 },
    { subtotalCents: 20000, flatShippingCents: 1200, freeShippingThresholdCents: 14900, expected: 0 },
    { subtotalCents: 1000, flatShippingCents: 0, freeShippingThresholdCents: 14900, expected: 0 },
  ])('calculates shipping for subtotal $subtotalCents', async (scenario) => {
    const { calculateShippingCents } = await importFresh(() => import('../../src/services/settings'));

    expect(
      calculateShippingCents({
        subtotalCents: scenario.subtotalCents,
        flatShippingCents: scenario.flatShippingCents,
        freeShippingThresholdCents: scenario.freeShippingThresholdCents,
      }),
    ).toBe(scenario.expected);
  });

  it('rejects invalid admin shipping settings before writing to the database', async () => {
    const { updateShippingSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateShippingSettings({
        flatShippingCents: -1,
        freeShippingThresholdCents: 14900,
        currency: 'CAD',
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateShippingSettings({
        flatShippingCents: 1200.5,
        freeShippingThresholdCents: 14900,
        currency: 'CAD',
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateShippingSettings({
        flatShippingCents: 1200,
        freeShippingThresholdCents: 14900,
        currency: 'USD',
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it('rejects invalid admin request bodies at the route schema boundary', () => {
    expect(
      shippingSettingsBodySchema.safeParse({
        flatShippingCents: -1,
        freeShippingThresholdCents: 14900,
        currency: 'CAD',
      }).success,
    ).toBe(false);
    expect(
      shippingSettingsBodySchema.safeParse({
        flatShippingCents: 1200,
        freeShippingThresholdCents: 14900.5,
        currency: 'CAD',
      }).success,
    ).toBe(false);
    expect(
      shippingSettingsBodySchema.safeParse({
        flatShippingCents: 1200,
        freeShippingThresholdCents: 14900,
        currency: 'USD',
      }).success,
    ).toBe(false);
  });

  it('creates and returns default DB settings when the shipping row is missing', async () => {
    const defaultSettings = {
      flatShippingCents: 1200,
      freeShippingThresholdCents: 14900,
      currency: 'CAD',
    };

    mocks.db.select.mockReturnValueOnce(createChain([]));
    mocks.db.insert.mockReturnValueOnce(createChain([{ value: defaultSettings }]));

    const { getShippingSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await getShippingSettings();

    expect(result).toEqual(defaultSettings);
    expect(mocks.db.insert).toHaveBeenCalledTimes(1);
  });
});
