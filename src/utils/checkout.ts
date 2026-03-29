import {
  DEFAULT_STRIPE_CHECKOUT_TTL_MS,
  STRIPE_CHECKOUT_MIN_EXPIRES_IN_SECONDS,
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
  const reservationExpiresAtMs = now.getTime() + validatedTtlMs;
  const minimumStripeExpiresAt = Math.ceil(
    (now.getTime() + STRIPE_CHECKOUT_MIN_EXPIRES_IN_SECONDS * 1000) / 1000,
  );
  const stripeExpiresAt = Math.max(
    Math.ceil(reservationExpiresAtMs / 1000),
    minimumStripeExpiresAt,
  );

  return {
    reservationExpiresAt: new Date(reservationExpiresAtMs),
    reservationTtlSeconds: validatedTtlMs / 1000,
    stripeExpiresAt,
  };
};
