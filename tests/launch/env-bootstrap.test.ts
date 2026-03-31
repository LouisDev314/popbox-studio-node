import { afterEach, describe, expect, it, vi } from 'vitest';

describe('launch: test env bootstrap', () => {
  const bootstrapKeys = [
    'CLIENT_BASE_URL',
    'CONTACT_EMAIL',
    'ORDER_NOTIFICATION_EMAIL',
    'STRIPE_CHECK_SESSION_RESERVATION_TTL',
  ] as const;

  const originalEnv = Object.fromEntries(bootstrapKeys.map((key) => [key, process.env[key]]));

  afterEach(() => {
    vi.resetModules();

    for (const key of bootstrapKeys) {
      const originalValue = originalEnv[key];

      if (typeof originalValue === 'undefined') {
        delete process.env[key];
      } else {
        process.env[key] = originalValue;
      }
    }
  });

  it('provides required env defaults without relying on local dotenv files', async () => {
    for (const key of bootstrapKeys) {
      delete process.env[key];
    }

    vi.resetModules();
    await import('../setup/env');
    const { default: getEnvConfig } = await import('../../src/config/env');
    const env = getEnvConfig();

    expect(env.clientBaseUrl).toBe('https://client.example.com');
    expect(env.contactEmail).toBe('contact@popbox.example.com');
    expect(env.orderNotificationEmail).toBe('orders@popbox.example.com');
    expect(env.stripeCheckoutSessionReservationTtl).toBe(600000);
  });
});
