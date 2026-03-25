import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';

type CreateLimiterOpts = {
  windowMs: number;
  limit: number;
  message?: string;
};

const createLimiter = (opts: CreateLimiterOpts): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: opts.windowMs,
    limit: opts.limit,

    // good defaults
    standardHeaders: 'draft-7',
    legacyHeaders: false,

    // avoid surprises behind proxies (Render)
    message: { ok: false, error: opts.message ?? 'Too many requests, please try again later.' },
  });
};

// Global: generous burst protection
export const globalLimiter = createLimiter({
  windowMs: 5 * 60 * 1000, // 5 min
  limit: 300, // 300 req / 5 min / IP
});

// Auth: strict (brute force protection)
export const authLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  limit: 20, // 20 attempts / 10 min / IP
  message: 'Too many attempts, please try again later.',
});

// Checkout/payment-router initiation: moderate
export const checkoutLimiter = createLimiter({
  windowMs: 10 * 60 * 1000,
  limit: 60,
});

// Webhooks: either skip limiter or set very high
export const webhookLimiter = createLimiter({
  windowMs: 60 * 1000,
  limit: 600, // effectively not limiting for your scale
});

export const contactLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  limit: 5, // 5 submissions / 10 min / IP
  message: 'Too many contact requests, please try again later.',
});
