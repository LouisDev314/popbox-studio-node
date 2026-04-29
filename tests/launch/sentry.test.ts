import express from 'express';
import request from 'supertest';
import type { ErrorRequestHandler, Express } from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { importFresh } from '../helpers/launch-test-kit';

const mocks = vi.hoisted(() => {
  const expressIntegration = vi.fn(() => ({ name: 'Express' }));

  return {
    init: vi.fn(),
    expressIntegration,
    setupExpressErrorHandler: vi.fn(),
    captureException: vi.fn(),
  };
});

vi.mock('@sentry/node', () => ({
  init: mocks.init,
  expressIntegration: mocks.expressIntegration,
  setupExpressErrorHandler: mocks.setupExpressErrorHandler,
  captureException: mocks.captureException,
}));

type SentryExpressHandlerOptions = {
  shouldHandleError?: (error: unknown) => boolean;
};

const installMockSentryErrorHandler = () => {
  mocks.setupExpressErrorHandler.mockImplementation((app: Express, options?: SentryExpressHandlerOptions) => {
    const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
      if (options?.shouldHandleError?.(error) ?? true) {
        mocks.captureException(error);
        res.sentry = 'test-event-id';
      }

      next(error);
    };

    app.use(errorHandler);
  });
};

describe('launch: sentry integration', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_RELEASE: process.env.SENTRY_RELEASE,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = 'production';
    process.env.SENTRY_DSN = 'https://public@example.ingest.sentry.io/1';
    process.env.SENTRY_RELEASE = 'backend@1.2.3';
  });

  afterEach(() => {
    vi.doUnmock('../../src/routes');

    for (const [key, value] of Object.entries(originalEnv)) {
      if (typeof value === 'undefined') {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  });

  it('initializes Sentry with the expected backend config', async () => {
    const { initSentry } = await importFresh(() => import('../../src/integrations/sentry'));

    initSentry();

    expect(mocks.expressIntegration).toHaveBeenCalledTimes(1);
    expect(mocks.init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: 'https://public@example.ingest.sentry.io/1',
        enabled: true,
        environment: 'production',
        release: 'backend@1.2.3',
        tracesSampleRate: 0.1,
        sendDefaultPii: false,
        integrations: [{ name: 'Express' }],
      }),
    );
  });

  it('redacts sensitive request query values and headers on captured errors and transactions', async () => {
    const { initSentry } = await importFresh(() => import('../../src/integrations/sentry'));

    initSentry();

    const options = mocks.init.mock.calls[0]?.[0];
    const beforeSend = options.beforeSend as (event: Record<string, unknown>, hint: Record<string, unknown>) => unknown;
    const beforeSendTransaction = options.beforeSendTransaction as (event: Record<string, unknown>) => unknown;

    const inputEvent = {
      request: {
        url: 'https://api.example.com/orders/PBX-123?token=abc&session_id=cs_1&checkout_session_id=cs_2&safe=ok',
        query_string: 'token=abc&safe=ok',
        headers: {
          authorization: 'Bearer secret',
          cookie: 'session=secret',
          'set-cookie': 'guest_order_session=secret',
          'x-order-token': 'guest-secret',
          'stripe-signature': 'keep-me',
        },
      },
    };

    const sanitizedEvent = beforeSend(inputEvent, {}) as {
      request: {
        url: string;
        query_string: string;
        headers: Record<string, string>;
      };
    };
    const sanitizedTransaction = beforeSendTransaction(inputEvent) as typeof sanitizedEvent;

    for (const value of [sanitizedEvent, sanitizedTransaction]) {
      expect(value.request.url).toContain('token=%5BREDACTED%5D');
      expect(value.request.url).toContain('session_id=%5BREDACTED%5D');
      expect(value.request.url).toContain('checkout_session_id=%5BREDACTED%5D');
      expect(value.request.query_string).toBe('token=%5BREDACTED%5D&safe=ok');
      expect(value.request.headers.authorization).toBe('[REDACTED]');
      expect(value.request.headers.cookie).toBe('[REDACTED]');
      expect(value.request.headers['set-cookie']).toBe('[REDACTED]');
      expect(value.request.headers['x-order-token']).toBe('[REDACTED]');
      expect(value.request.headers['stripe-signature']).toBe('keep-me');
    }
  });

  it('redacts breadcrumb url-shaped fields without adding missing optional fields', async () => {
    const { initSentry } = await importFresh(() => import('../../src/integrations/sentry'));

    initSentry();

    const options = mocks.init.mock.calls[0]?.[0];
    const beforeBreadcrumb = options.beforeBreadcrumb as (breadcrumb: Record<string, unknown>) => unknown;
    const beforeSend = options.beforeSend as (event: Record<string, unknown>, hint: Record<string, unknown>) => unknown;

    const sanitizedBreadcrumb = beforeBreadcrumb({
      category: 'http',
      data: {
        url: 'https://api.example.com/orders?token=abc',
        from: '/orders/PBX-123?session_id=cs_1',
        to: '/checkout/success?checkout_session_id=cs_2',
        headers: {
          authorization: 'Bearer secret',
          cookie: 'session=secret',
          'x-order-token': 'guest-secret',
          accept: 'application/json',
        },
      },
    }) as {
      data: {
        url: string;
        from: string;
        to: string;
        headers: Record<string, string>;
      };
    };

    expect(sanitizedBreadcrumb.data.url).toContain('token=%5BREDACTED%5D');
    expect(sanitizedBreadcrumb.data.from).toContain('session_id=%5BREDACTED%5D');
    expect(sanitizedBreadcrumb.data.to).toContain('checkout_session_id=%5BREDACTED%5D');
    expect(sanitizedBreadcrumb.data.headers.authorization).toBe('[REDACTED]');
    expect(sanitizedBreadcrumb.data.headers.cookie).toBe('[REDACTED]');
    expect(sanitizedBreadcrumb.data.headers['x-order-token']).toBe('[REDACTED]');
    expect(sanitizedBreadcrumb.data.headers.accept).toBe('application/json');

    const sanitizedMinimalEvent = beforeSend(
      {
        request: {
          url: 'https://api.example.com/orders?token=abc',
        },
      },
      {},
    ) as {
      request: Record<string, unknown>;
    };

    expect(sanitizedMinimalEvent.request.url).toBe('https://api.example.com/orders?token=%5BREDACTED%5D');
    expect(sanitizedMinimalEvent.request).not.toHaveProperty('headers');
    expect(sanitizedMinimalEvent.request).not.toHaveProperty('query_string');
  });

  it('returns a clean unmatched-route 404 without reporting to Sentry', async () => {
    installMockSentryErrorHandler();

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        code: 404,
        success: false,
        message: 'Route not found',
        errors: {
          path: '/api/v1/does-not-exist',
        },
      }),
    );
    expect(mocks.captureException).not.toHaveBeenCalled();
  });

  it('does not report expected Exception 4xx errors to Sentry', async () => {
    const { createApp } = await importFresh(() => import('../../src/app'));
    const { default: Exception } = await import('../../src/utils/Exception');

    createApp();

    const options = mocks.setupExpressErrorHandler.mock.calls[0]?.[1] as SentryExpressHandlerOptions | undefined;

    expect(options?.shouldHandleError?.(Exception.notFound('Missing product'))).toBe(false);
    expect(options?.shouldHandleError?.(Exception.internal('Database failed'))).toBe(true);
    expect(options?.shouldHandleError?.(new Error('boom'))).toBe(true);
  });

  it('still reports real unhandled 5xx exceptions to Sentry', async () => {
    installMockSentryErrorHandler();

    const testRouter = express.Router();
    testRouter.get('/v1/boom', () => {
      throw new Error('boom');
    });
    vi.doMock('../../src/routes', () => ({
      default: testRouter,
    }));

    const { createApp } = await importFresh(() => import('../../src/app'));
    const response = await request(createApp()).get('/api/v1/boom');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        code: 500,
        success: false,
        message: 'Internal server error',
      }),
    );
    expect(mocks.captureException).toHaveBeenCalledWith(expect.any(Error));
  });
});
