import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createChain, importFresh } from '../helpers/launch-test-kit';
import { shippingSettingsBodySchema, storeBannerSettingsBodySchema } from '../../src/schemas/admin';

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
vi.mock('../../src/middleware/admin-auth', () => ({
  default: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

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

describe('launch: store banner settings', () => {
  const defaultBannerSettings = {
    enabled: true,
    message: 'Free shipping across Canada on orders $149+ CAD · Otherwise flat rate $15.99',
    linkLabel: 'Shipping details',
    linkHref: '/legal/shipping-returns',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates and returns default DB settings when the store banner row is missing', async () => {
    mocks.db.select.mockReturnValueOnce(createChain([]));
    mocks.db.insert.mockReturnValueOnce(createChain([{ value: defaultBannerSettings }]));

    const { getStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await getStoreBannerSettings();

    expect(result).toEqual(defaultBannerSettings);
    expect(mocks.db.insert).toHaveBeenCalledTimes(1);
  });

  it('saves normalized store banner settings', async () => {
    const normalizedSettings = {
      enabled: true,
      message: 'Free shipping today',
      linkLabel: 'Details',
      linkHref: '/legal/shipping-returns',
    };
    const insertChain = createChain([{ value: normalizedSettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await updateStoreBannerSettings({
      enabled: true,
      message: '  Free shipping today  ',
      linkLabel: '  Details  ',
      linkHref: '  /legal/shipping-returns  ',
    });

    expect(result).toEqual(normalizedSettings);
    expect(insertChain.values).toHaveBeenCalledWith({
      key: 'store_banner',
      value: normalizedSettings,
    });
  });

  it('returns disabled banner settings with enabled false', async () => {
    const disabledSettings = {
      enabled: false,
      message: '',
      linkLabel: null,
      linkHref: null,
    };
    const insertChain = createChain([{ value: disabledSettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await updateStoreBannerSettings({
      enabled: false,
      message: '   ',
      linkLabel: null,
      linkHref: null,
    });

    expect(result).toEqual(disabledSettings);
  });

  it('trims strings and converts empty optional strings to null', async () => {
    const normalizedSettings = {
      enabled: true,
      message: 'Banner message',
      linkLabel: null,
      linkHref: null,
    };
    const insertChain = createChain([{ value: normalizedSettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await updateStoreBannerSettings({
      enabled: true,
      message: '  Banner message  ',
      linkLabel: '  ',
      linkHref: '',
    });

    expect(result).toEqual(normalizedSettings);
    expect(insertChain.values).toHaveBeenCalledWith({
      key: 'store_banner',
      value: normalizedSettings,
    });
  });

  it('rejects unsafe javascript store banner links before writing to the database', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        message: 'Banner message',
        linkLabel: 'Details',
        linkHref: 'javascript:alert(1)',
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it.each(['http://example.com', 'mailto:support@example.com', '//example.com/path'])(
    'rejects invalid store banner link protocol %s',
    async (linkHref) => {
      const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

      await expect(
        updateStoreBannerSettings({
          enabled: true,
          message: 'Banner message',
          linkLabel: 'Details',
          linkHref,
        }),
      ).rejects.toMatchObject({
        code: 400,
      });

      expect(mocks.db.insert).not.toHaveBeenCalled();
    },
  );

  it('rejects store banner link label without link href', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        message: 'Banner message',
        linkLabel: 'Details',
        linkHref: '',
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it('rejects enabled store banner with empty message', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        message: '   ',
        linkLabel: null,
        linkHref: null,
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it('rejects store banner message and link label values over max length', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        message: 'a'.repeat(161),
        linkLabel: null,
        linkHref: null,
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        message: 'Banner message',
        linkLabel: 'a'.repeat(41),
        linkHref: '/legal/shipping-returns',
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it('rejects invalid admin store banner request bodies at the route schema boundary', () => {
    expect(
      storeBannerSettingsBodySchema.safeParse({
        enabled: true,
        message: 'a'.repeat(161),
        linkLabel: null,
        linkHref: null,
      }).success,
    ).toBe(false);
    expect(
      storeBannerSettingsBodySchema.safeParse({
        enabled: true,
        message: 'Banner message',
        linkLabel: 'a'.repeat(41),
        linkHref: '/legal/shipping-returns',
      }).success,
    ).toBe(false);
    expect(
      storeBannerSettingsBodySchema.safeParse({
        enabled: 'true',
        message: 'Banner message',
        linkLabel: null,
        linkHref: null,
      }).success,
    ).toBe(false);
  });

  it('returns store banner settings publicly without admin auth', async () => {
    mocks.db.select.mockReturnValueOnce(createChain([{ value: defaultBannerSettings }]));

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/settings/store-banner');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(defaultBannerSettings);
  });

  it('does not expose generic public settings access', async () => {
    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/settings/shipping');

    expect(response.status).toBe(404);
    expect(mocks.db.select).not.toHaveBeenCalled();
  });

  it('updates store banner settings through the admin route', async () => {
    const normalizedSettings = {
      enabled: true,
      message: 'Free shipping today',
      linkLabel: 'Details',
      linkHref: 'https://example.com/shipping',
    };
    const insertChain = createChain([{ value: normalizedSettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).put('/api/v1/admin/settings/store-banner').send({
      enabled: true,
      message: '  Free shipping today  ',
      linkLabel: '  Details  ',
      linkHref: '  https://example.com/shipping  ',
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(normalizedSettings);
    expect(insertChain.values).toHaveBeenCalledWith({
      key: 'store_banner',
      value: normalizedSettings,
    });
  });
});
