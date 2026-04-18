import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  TEST_CLIENT_BASE_URL,
  createChain,
  importFresh,
  readCookie,
} from '../helpers/launch-test-kit';

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
    getGuestOrderMock: vi.fn(),
    getGuestTicketsMock: vi.fn(),
    revealTicketMock: vi.fn(),
    revealAllTicketsMock: vi.fn(),
  };
});

vi.mock('../../src/db', () => mocks.dbModule);
vi.mock('../../src/services/orders', async () => {
  const actual = await vi.importActual<typeof import('../../src/services/orders')>('../../src/services/orders');

  return {
    ...actual,
    getGuestOrder: mocks.getGuestOrderMock,
    getGuestTickets: mocks.getGuestTicketsMock,
    revealTicket: mocks.revealTicketMock,
    revealAllTickets: mocks.revealAllTicketsMock,
  };
});

describe('launch: guest order access hardening', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getGuestOrderMock.mockResolvedValue({
      id: 'ord_launch',
      publicId: 'PBX-LAUNCH',
      status: 'paid',
      items: [],
      tickets: [],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('accepts a valid bootstrap token and sets the guest session cookie', async () => {
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          guestAccessTokenHash: 'legacy-hash',
        },
      ]),
    );

    const { createGuestOrderAccessToken } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const token = createGuestOrderAccessToken('PBX-LAUNCH');
    const { createApp } = await importFresh(() => import('../../src/app'));

    const response = await request(createApp()).get(
      `/api/v1/orders/PBX-LAUNCH/access?token=${encodeURIComponent(token)}`,
    );

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(`${TEST_CLIENT_BASE_URL}/orders/PBX-LAUNCH`);
    expect(readCookie(response, 'guest_order_session')).toContain('guest_order_session=');
  });

  it('builds customer email links against the storefront order route', async () => {
    const { buildGuestOrderAccessUrl } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const link = buildGuestOrderAccessUrl('PBX-LAUNCH');
    const url = new URL(link);

    expect(url.origin).toBe(TEST_CLIENT_BASE_URL);
    expect(url.pathname).toBe('/orders/PBX-LAUNCH');
    expect(url.searchParams.get('token')).toBeTruthy();
  });

  it('rejects an invalid bootstrap token', async () => {
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          guestAccessTokenHash: 'legacy-hash',
        },
      ]),
    );

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/orders/PBX-LAUNCH/access?token=not-valid');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid order access token');
  });

  it('rejects an expired bootstrap token', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00.000Z'));
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          guestAccessTokenHash: 'legacy-hash',
        },
      ]),
    );

    const { createGuestOrderAccessToken } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const token = createGuestOrderAccessToken('PBX-LAUNCH');
    vi.useRealTimers();

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get(
      `/api/v1/orders/PBX-LAUNCH/access?token=${encodeURIComponent(token)}`,
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid order access token');
  });

  it('rejects the old query-token flow on the normal order route', async () => {
    const { createGuestOrderAccessToken } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const token = createGuestOrderAccessToken('PBX-LAUNCH');
    const { createApp } = await importFresh(() => import('../../src/app'));

    const response = await request(createApp()).get(`/api/v1/orders/PBX-LAUNCH?token=${encodeURIComponent(token)}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Valid order session is required');
  });

  it('rejects x-order-token on the normal order route', async () => {
    const { createGuestOrderAccessToken } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const token = createGuestOrderAccessToken('PBX-LAUNCH');
    const { createApp } = await importFresh(() => import('../../src/app'));

    const response = await request(createApp())
      .get('/api/v1/orders/PBX-LAUNCH')
      .set('x-order-token', token);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Valid order session is required');
  });

  it('allows clean cookie-backed access on the normal order route', async () => {
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          guestAccessTokenHash: 'legacy-hash',
        },
      ]),
    );

    const {
      GUEST_ORDER_SESSION_COOKIE_NAME,
      createGuestOrderSessionToken,
    } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const sessionToken = createGuestOrderSessionToken('PBX-LAUNCH');
    const { createApp } = await importFresh(() => import('../../src/app'));

    const response = await request(createApp())
      .get('/api/v1/orders/PBX-LAUNCH')
      .set('Cookie', `${GUEST_ORDER_SESSION_COOKIE_NAME}=${sessionToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.publicId).toBe('PBX-LAUNCH');
  });

  it('allows clean cookie-backed access on the guest tickets route', async () => {
    mocks.db.select.mockReturnValue(
      createChain([
        {
          id: 'ord_launch',
          publicId: 'PBX-LAUNCH',
          guestAccessTokenHash: 'legacy-hash',
        },
      ]),
    );
    mocks.getGuestTicketsMock.mockResolvedValue({
      tickets: [
        {
          id: 'ticket_1',
          ticketNumber: 'PBX-TKT-1',
          revealedAt: null,
          voidedAt: null,
          voidReason: null,
          prize: null,
          kujiProduct: {
            id: 'product_1',
            name: 'Kuji Box',
            slug: 'kuji-box',
            imageUrl: null,
            imageAltText: 'Kuji Box',
          },
          createdAt: new Date('2026-03-28T00:00:00.000Z'),
        },
      ],
      revealed: [],
      unrevealed: [
        {
          id: 'ticket_1',
          ticketNumber: 'PBX-TKT-1',
          revealedAt: null,
          voidedAt: null,
          voidReason: null,
          prize: null,
          kujiProduct: {
            id: 'product_1',
            name: 'Kuji Box',
            slug: 'kuji-box',
            imageUrl: null,
            imageAltText: 'Kuji Box',
          },
          createdAt: new Date('2026-03-28T00:00:00.000Z'),
        },
      ],
      counts: {
        total: 1,
        revealed: 0,
        unrevealed: 1,
      },
    });

    const {
      GUEST_ORDER_SESSION_COOKIE_NAME,
      createGuestOrderSessionToken,
    } = await importFresh(() => import('../../src/utils/guest-order-access'));
    const sessionToken = createGuestOrderSessionToken('PBX-LAUNCH');
    const { createApp } = await importFresh(() => import('../../src/app'));

    const response = await request(createApp())
      .get('/api/v1/orders/PBX-LAUNCH/tickets')
      .set('Cookie', `${GUEST_ORDER_SESSION_COOKIE_NAME}=${sessionToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.tickets[0]?.prize).toBeNull();
    expect(mocks.getGuestTicketsMock).toHaveBeenCalledWith('PBX-LAUNCH');
  });
});
