import {
  DEFAULT_STRIPE_CHECKOUT_TTL_MS,
  STRIPE_CHECKOUT_TTL_EXACT_MS,
} from '../constants/checkout';

export const validateStripeCheckoutReservationTtlMs = (ttlMs: number) => {
  if (!Number.isInteger(ttlMs)) {
    throw new Error('STRIPE_CHECK_SESSION_RESERVATION_TTL must be an integer number of milliseconds');
  }

  if (ttlMs % 1000 !== 0) {
    throw new Error('STRIPE_CHECK_SESSION_RESERVATION_TTL must be divisible by 1000 so Stripe and local expiry match');
  }

  if (ttlMs !== STRIPE_CHECKOUT_TTL_EXACT_MS) {
    throw new Error(
      `STRIPE_CHECK_SESSION_RESERVATION_TTL must be exactly ${STRIPE_CHECKOUT_TTL_EXACT_MS} milliseconds (10 minutes)`,
    );
  }

  return ttlMs;
};

export const parseStripeCheckoutReservationTtlMs = (rawValue: string | undefined) => {
  if (!rawValue?.trim()) {
    return DEFAULT_STRIPE_CHECKOUT_TTL_MS;
  }

  return validateStripeCheckoutReservationTtlMs(Number(rawValue));
};

export const getCheckoutSessionExpiry = (ttlMs: number, now = new Date()) => {
  const validatedTtlMs = validateStripeCheckoutReservationTtlMs(ttlMs);
  const expiresAtMs = now.getTime() + validatedTtlMs;
  const stripeExpiresAt = Math.floor(expiresAtMs / 1000);

  return {
    expiresAt: new Date(stripeExpiresAt * 1000),
    stripeExpiresAt,
    ttlSeconds: validatedTtlMs / 1000,
  };
};
