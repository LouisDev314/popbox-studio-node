import 'dotenv/config';
import { parseStripeCheckoutReservationTtlMs } from '../utils/checkout';

type EnvConfig = Readonly<{
  port: number;
  nodeEnv: string;
  logLevel: string;
  corsOrigin: string;
  clientBaseUrl: string;
  adminBaseUrl: string;
  apiBaseUrl: string;
  databaseUrl: string;
  supabaseUrl: string;
  supabasePublicKey: string;
  supabaseSecretKey: string;
  supabaseStorageBucket: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  stripeShippingRateCents: number;
  stripeSuccessUrl: string;
  stripeCancelUrl: string;
  stripeCheckoutSessionReservationTtl: number;
  resendApiKey: string;
  resendFromEmail: string;
  orderTokenPepper: string;
}>;

const DEFAULT_PORT = 3000;
const DEFAULT_LOG_LEVEL = 'info';
const DEFAULT_STRIPE_SHIPPING_RATE_CENTS = 1500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cachedEnvConfig: EnvConfig | null = null;

const normalizeTrimmed = (value: string) => value.trim();

const normalizeUrlString = (value: string, trimTrailingSlash: boolean) => {
  const normalizedValue = value.trim();
  return trimTrailingSlash ? normalizedValue.replace(/\/+$/, '') : normalizedValue;
};

const parseInteger = (value: string, fallback: number, envName: string, errors: string[]) => {
  if (!value.trim()) {
    return fallback;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue)) {
    errors.push(`${envName} must be an integer`);
    return fallback;
  }

  return parsedValue;
};

const readRequiredString = (envName: string, rawValue: string | undefined, errors: string[]) => {
  const value = rawValue?.trim() || '';

  if (!value) {
    errors.push(`${envName} is required`);
  }

  return value;
};

const parseRequiredHttpUrl = (
  envName: string,
  rawValue: string | undefined,
  errors: string[],
  options: {
    trimTrailingSlash: boolean;
  },
) => {
  const value = readRequiredString(envName, rawValue, errors);

  if (!value) {
    return '';
  }

  try {
    const url = new URL(value);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      errors.push(`${envName} must use http or https`);
      return '';
    }

    return normalizeUrlString(url.toString(), options.trimTrailingSlash);
  } catch {
    errors.push(`${envName} must be a valid absolute URL`);
    return '';
  }
};

const parseRequiredPostgresUrl = (envName: string, rawValue: string | undefined, errors: string[]) => {
  const value = readRequiredString(envName, rawValue, errors);

  if (!value) {
    return '';
  }

  try {
    const url = new URL(value);

    if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
      errors.push(`${envName} must use postgres or postgresql`);
      return '';
    }

    return value;
  } catch {
    errors.push(`${envName} must be a valid PostgreSQL connection string`);
    return '';
  }
};

const parseRequiredEmail = (envName: string, rawValue: string | undefined, errors: string[]) => {
  const value = readRequiredString(envName, rawValue, errors);

  if (!value) {
    return '';
  }

  if (!EMAIL_REGEX.test(value)) {
    errors.push(`${envName} must be a valid email address`);
    return '';
  }

  return value;
};

const parseRequiredPositivePort = (rawValue: string | undefined, errors: string[]) => {
  const parsedPort = parseInteger(rawValue || '', DEFAULT_PORT, 'PORT', errors);

  if (parsedPort < 1 || parsedPort > 65535) {
    errors.push('PORT must be between 1 and 65535');
    return DEFAULT_PORT;
  }

  return parsedPort;
};

const parseShippingRateCents = (rawValue: string | undefined, errors: string[]) => {
  const parsedShippingRate = parseInteger(
    rawValue || '',
    DEFAULT_STRIPE_SHIPPING_RATE_CENTS,
    'STRIPE_SHIPPING_RATE_CENTS',
    errors,
  );

  if (parsedShippingRate < 0) {
    errors.push('STRIPE_SHIPPING_RATE_CENTS must be 0 or greater');
    return DEFAULT_STRIPE_SHIPPING_RATE_CENTS;
  }

  return parsedShippingRate;
};

const parseStripeCheckoutReservationTtl = (rawValue: string | undefined, errors: string[]) => {
  try {
    return parseStripeCheckoutReservationTtlMs(rawValue);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'STRIPE_CHECK_SESSION_RESERVATION_TTL is invalid');
    return parseStripeCheckoutReservationTtlMs(undefined);
  }
};

const createEnvConfig = (): EnvConfig => {
  const errors: string[] = [];
  const port = parseRequiredPositivePort(process.env.PORT, errors);
  const clientBaseUrl = parseRequiredHttpUrl('CLIENT_BASE_URL', process.env.CLIENT_BASE_URL, errors, {
    trimTrailingSlash: true,
  });

  const envConfig = {
    port,
    nodeEnv: normalizeTrimmed(process.env.NODE_ENV || 'dev'),
    logLevel: normalizeTrimmed(process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL),
    corsOrigin: parseRequiredHttpUrl('CORS_ORIGIN', process.env.CORS_ORIGIN, errors, {
      trimTrailingSlash: true,
    }),
    clientBaseUrl,
    adminBaseUrl: process.env.ADMIN_BASE_URL?.trim()
      ? parseRequiredHttpUrl('ADMIN_BASE_URL', process.env.ADMIN_BASE_URL, errors, {
          trimTrailingSlash: true,
        })
      : `${clientBaseUrl}/admin`,
    apiBaseUrl: parseRequiredHttpUrl('API_BASE_URL', process.env.API_BASE_URL, errors, {
      trimTrailingSlash: true,
    }),

    databaseUrl: parseRequiredPostgresUrl('DATABASE_URL', process.env.DATABASE_URL, errors),
    supabaseUrl: parseRequiredHttpUrl('SUPABASE_URL', process.env.SUPABASE_URL, errors, {
      trimTrailingSlash: true,
    }),
    supabasePublicKey: readRequiredString('SUPABASE_PUBLIC_KEY', process.env.SUPABASE_PUBLIC_KEY, errors),
    supabaseSecretKey: readRequiredString('SUPABASE_SECRET_KEY', process.env.SUPABASE_SECRET_KEY, errors),
    supabaseStorageBucket: readRequiredString(
      'SUPABASE_STORAGE_BUCKET',
      process.env.SUPABASE_STORAGE_BUCKET,
      errors,
    ),

    stripeSecretKey: readRequiredString('STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY, errors),
    stripeWebhookSecret: readRequiredString('STRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET, errors),
    stripeShippingRateCents: parseShippingRateCents(process.env.STRIPE_SHIPPING_RATE_CENTS, errors),
    stripeSuccessUrl: parseRequiredHttpUrl('STRIPE_SUCCESS_URL', process.env.STRIPE_SUCCESS_URL, errors, {
      trimTrailingSlash: false,
    }),
    stripeCancelUrl: parseRequiredHttpUrl('STRIPE_CANCEL_URL', process.env.STRIPE_CANCEL_URL, errors, {
      trimTrailingSlash: false,
    }),
    stripeCheckoutSessionReservationTtl: parseStripeCheckoutReservationTtl(
      process.env.STRIPE_CHECK_SESSION_RESERVATION_TTL,
      errors,
    ),

    resendApiKey: readRequiredString('RESEND_API_KEY', process.env.RESEND_API_KEY, errors),
    resendFromEmail: parseRequiredEmail('RESEND_FROM_EMAIL', process.env.RESEND_FROM_EMAIL, errors),

    orderTokenPepper: readRequiredString('ORDER_TOKEN_PEPPER', process.env.ORDER_TOKEN_PEPPER, errors),
  } satisfies EnvConfig;

  if (errors.length > 0) {
    throw new Error(`Invalid environment configuration:\n- ${errors.join('\n- ')}`);
  }

  return Object.freeze(envConfig);
};

const getEnvConfig = () => {
  if (!cachedEnvConfig) {
    cachedEnvConfig = createEnvConfig();
  }

  return cachedEnvConfig;
};

export type { EnvConfig };
export default getEnvConfig;
