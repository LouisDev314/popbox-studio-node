import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_STRIPE_CHECKOUT_TTL_MS,
  STRIPE_CHECKOUT_TTL_EXACT_MS,
} from '../../src/constants/checkout';
import {
  getCheckoutSessionExpiry,
  parseStripeCheckoutReservationTtlMs,
  validateStripeCheckoutReservationTtlMs,
} from '../../src/utils/checkout';
import { importFresh } from '../helpers/launch-test-kit';

const mocks = vi.hoisted(() => {
  return {
    scheduleMock: vi.fn(),
    cleanupExpiredReservationsMock: vi.fn(),
    cleanupExpiredPendingOrdersMock: vi.fn(),
  };
});

vi.mock('node-cron', () => ({
  default: {
    schedule: mocks.scheduleMock,
  },
  schedule: mocks.scheduleMock,
}));
vi.mock('../../src/jobs/helpers', () => ({
  cleanupExpiredReservations: mocks.cleanupExpiredReservationsMock,
  cleanupExpiredPendingOrders: mocks.cleanupExpiredPendingOrdersMock,
}));

describe('launch: reservation TTL and cleanup cadence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('defaults the checkout reservation TTL to exactly 10 minutes', () => {
    expect(STRIPE_CHECKOUT_TTL_EXACT_MS).toBe(600000);
    expect(DEFAULT_STRIPE_CHECKOUT_TTL_MS).toBe(600000);
    expect(parseStripeCheckoutReservationTtlMs(undefined)).toBe(600000);
    expect(validateStripeCheckoutReservationTtlMs(600000)).toBe(600000);
  });

  it('rejects invalid TTL values that do not exactly match 10 minutes', () => {
    expect(() => parseStripeCheckoutReservationTtlMs('600500')).toThrow(
      'STRIPE_CHECK_SESSION_RESERVATION_TTL must be divisible by 1000 so Stripe and local expiry match',
    );
    expect(() => parseStripeCheckoutReservationTtlMs('601000')).toThrow(
      'STRIPE_CHECK_SESSION_RESERVATION_TTL must be exactly 600000 milliseconds (10 minutes)',
    );
    expect(() => parseStripeCheckoutReservationTtlMs('ten-minutes')).toThrow(
      'STRIPE_CHECK_SESSION_RESERVATION_TTL must be an integer number of milliseconds',
    );
  });

  it('computes checkout expiry using the exact 10-minute reservation window', () => {
    const now = new Date('2026-03-28T12:00:00.000Z');
    const expiry = getCheckoutSessionExpiry(600000, now);

    expect(expiry.ttlSeconds).toBe(600);
    expect(expiry.expiresAt.toISOString()).toBe('2026-03-28T12:10:00.000Z');
    expect(expiry.stripeExpiresAt).toBe(Math.floor(new Date('2026-03-28T12:10:00.000Z').getTime() / 1000));
  });

  it('schedules both cleanup jobs every 2 minutes in UTC', async () => {
    const stopFirstTask = vi.fn();
    const stopSecondTask = vi.fn();
    mocks.scheduleMock
      .mockReturnValueOnce({ stop: stopFirstTask })
      .mockReturnValueOnce({ stop: stopSecondTask });

    const { startBackgroundJobs } = await importFresh(() => import('../../src/jobs'));
    const stopJobs = startBackgroundJobs();

    expect(mocks.scheduleMock).toHaveBeenCalledTimes(2);
    expect(mocks.scheduleMock).toHaveBeenNthCalledWith(
      1,
      '*/2 * * * *',
      expect.any(Function),
      expect.objectContaining({
        timezone: 'UTC',
      }),
    );
    expect(mocks.scheduleMock).toHaveBeenNthCalledWith(
      2,
      '*/2 * * * *',
      expect.any(Function),
      expect.objectContaining({
        timezone: 'UTC',
      }),
    );

    stopJobs();
    expect(stopFirstTask).toHaveBeenCalledTimes(1);
    expect(stopSecondTask).toHaveBeenCalledTimes(1);
  });
});
