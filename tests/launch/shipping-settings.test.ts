import { readFileSync } from 'fs';
import { resolve } from 'path';
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
    items: [
      {
        id: '00000000-0000-4000-8000-000000000001',
        message: 'Free shipping across Canada on orders $149+ CAD · Otherwise flat rate $15.99',
        linkLabel: 'Shipping details',
        linkHref: '/legal/shipping-returns',
        sortOrder: 0,
        isActive: true,
      },
    ],
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

  it('converts legacy flat store banner settings when reading', async () => {
    mocks.db.select.mockReturnValueOnce(
      createChain([
        {
          value: {
            enabled: true,
            message: '  Free shipping today  ',
            linkLabel: '  Details  ',
            linkHref: '  /legal/shipping-returns  ',
          },
        },
      ]),
    );

    const { getStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await getStoreBannerSettings();

    expect(result).toEqual({
      enabled: true,
      items: [
        {
          id: expect.any(String),
          message: 'Free shipping today',
          linkLabel: 'Details',
          linkHref: '/legal/shipping-returns',
          sortOrder: 0,
          isActive: true,
        },
      ],
    });
  });

  it('converts legacy blank store banner messages to an empty items array', async () => {
    mocks.db.select.mockReturnValueOnce(
      createChain([
        {
          value: {
            enabled: true,
            message: '   ',
            linkLabel: null,
            linkHref: null,
          },
        },
      ]),
    );

    const { getStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await getStoreBannerSettings();

    expect(result).toEqual({
      enabled: true,
      items: [],
    });
  });

  it('saves normalized store banner settings with sorted items', async () => {
    const normalizedSettings = {
      enabled: true,
      items: [
        {
          id: 'first',
          message: 'First banner',
          linkLabel: 'Details',
          linkHref: '/legal/shipping-returns',
          sortOrder: 1,
          isActive: true,
        },
        {
          id: 'second',
          message: 'Second banner',
          linkLabel: null,
          linkHref: null,
          sortOrder: 2,
          isActive: false,
        },
      ],
    };
    const insertChain = createChain([{ value: normalizedSettings }]);
    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await updateStoreBannerSettings({
      enabled: true,
      items: [
        {
          id: ' second ',
          message: '  Second banner  ',
          linkLabel: '  ',
          linkHref: '',
          sortOrder: 2,
          isActive: false,
        },
        {
          id: ' first ',
          message: '  First banner  ',
          linkLabel: '  Details  ',
          linkHref: '  /legal/shipping-returns  ',
          sortOrder: 1,
          isActive: true,
        },
      ],
    });

    expect(result).toEqual(normalizedSettings);
    expect(insertChain.values).toHaveBeenCalledWith({
      key: 'store_banner',
      value: normalizedSettings,
    });
  });

  it('generates missing store banner item ids before saving', async () => {
    const insertChain = createChain([{ value: { enabled: true, items: [] } }]);
    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    await updateStoreBannerSettings({
      enabled: true,
      items: [
        {
          message: 'Banner message',
          linkLabel: null,
          linkHref: null,
          sortOrder: 0,
          isActive: true,
        },
      ],
    });

    expect(insertChain.values.mock.calls[0]?.[0]?.value).toEqual({
      enabled: true,
      items: [
        {
          id: expect.any(String),
          message: 'Banner message',
          linkLabel: null,
          linkHref: null,
          sortOrder: 0,
          isActive: true,
        },
      ],
    });
  });

  it('allows enabled store banner settings with no items', async () => {
    const emptySettings = {
      enabled: true,
      items: [],
    };
    const insertChain = createChain([{ value: emptySettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await updateStoreBannerSettings(emptySettings);

    expect(result).toEqual(emptySettings);
  });

  it('returns disabled banner settings with enabled false', async () => {
    const disabledSettings = {
      enabled: false,
      items: [],
    };
    const insertChain = createChain([{ value: disabledSettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));
    const result = await updateStoreBannerSettings(disabledSettings);

    expect(result).toEqual(disabledSettings);
  });

  it('rejects unsafe javascript store banner links before writing to the database', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: [
          {
            id: 'banner-1',
            message: 'Banner message',
            linkLabel: 'Details',
            linkHref: 'javascript:alert(1)',
            sortOrder: 0,
            isActive: true,
          },
        ],
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
          items: [
            {
              id: 'banner-1',
              message: 'Banner message',
              linkLabel: 'Details',
              linkHref,
              sortOrder: 0,
              isActive: true,
            },
          ],
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
        items: [
          {
            id: 'banner-1',
            message: 'Banner message',
            linkLabel: 'Details',
            linkHref: '',
            sortOrder: 0,
            isActive: true,
          },
        ],
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it('rejects invalid store banner items before writing to the database', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: [
          {
            id: 'banner-1',
            message: '   ',
            linkLabel: null,
            linkHref: null,
            sortOrder: 0,
            isActive: true,
          },
        ],
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: [
          {
            id: 'banner-1',
            message: 'Banner message',
            linkLabel: null,
            linkHref: null,
            sortOrder: -1,
            isActive: true,
          },
        ],
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: [
          {
            id: 'banner-1',
            message: 'Banner message',
            linkLabel: null,
            linkHref: null,
            sortOrder: 0,
            isActive: 'true',
          },
        ],
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
        items: [
          {
            id: 'banner-1',
            message: 'a'.repeat(161),
            linkLabel: null,
            linkHref: null,
            sortOrder: 0,
            isActive: true,
          },
        ],
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: [
          {
            id: 'banner-1',
            message: 'Banner message',
            linkLabel: 'a'.repeat(41),
            linkHref: '/legal/shipping-returns',
            sortOrder: 0,
            isActive: true,
          },
        ],
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    expect(mocks.db.insert).not.toHaveBeenCalled();
  });

  it('rejects non-array and too many store banner items before writing to the database', async () => {
    const { updateStoreBannerSettings } = await importFresh(() => import('../../src/services/settings'));

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: null,
      }),
    ).rejects.toMatchObject({
      code: 400,
    });

    await expect(
      updateStoreBannerSettings({
        enabled: true,
        items: Array.from({ length: 6 }, (_, index) => ({
          id: `banner-${index}`,
          message: `Banner ${index}`,
          linkLabel: null,
          linkHref: null,
          sortOrder: index,
          isActive: true,
        })),
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
        items: [
          {
            message: 'a'.repeat(161),
            linkLabel: null,
            linkHref: null,
            sortOrder: 0,
            isActive: true,
          },
        ],
      }).success,
    ).toBe(false);
    expect(
      storeBannerSettingsBodySchema.safeParse({
        enabled: true,
        items: [
          {
            message: 'Banner message',
            linkLabel: 'a'.repeat(41),
            linkHref: '/legal/shipping-returns',
            sortOrder: 0,
            isActive: true,
          },
        ],
      }).success,
    ).toBe(false);
    expect(
      storeBannerSettingsBodySchema.safeParse({
        enabled: 'true',
        items: [],
      }).success,
    ).toBe(false);
    expect(
      storeBannerSettingsBodySchema.safeParse({
        enabled: true,
        items: Array.from({ length: 6 }, (_, index) => ({
          message: `Banner ${index}`,
          linkLabel: null,
          linkHref: null,
          sortOrder: index,
          isActive: true,
        })),
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
      items: [
        {
          id: 'banner-1',
          message: 'Free shipping today',
          linkLabel: 'Details',
          linkHref: 'https://example.com/shipping',
          sortOrder: 0,
          isActive: true,
        },
      ],
    };
    const insertChain = createChain([{ value: normalizedSettings }]);

    mocks.db.insert.mockReturnValueOnce(insertChain);

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp())
      .put('/api/v1/admin/settings/store-banner')
      .send({
        enabled: true,
        items: [
          {
            id: 'banner-1',
            message: '  Free shipping today  ',
            linkLabel: '  Details  ',
            linkHref: '  https://example.com/shipping  ',
            sortOrder: 0,
            isActive: true,
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(normalizedSettings);
    expect(insertChain.values).toHaveBeenCalledWith({
      key: 'store_banner',
      value: normalizedSettings,
    });
  });
});
