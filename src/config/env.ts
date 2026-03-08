import 'dotenv/config';
import { z } from 'zod';

const DEFAULT_STORAGE_BUCKET = 'product-images';

const trimEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const looksLikePlaceholder = (name: string, value: string) => {
  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  if (name === 'SUPABASE_URL' && normalized.includes('your-project.supabase.co')) {
    return true;
  }

  return name === 'SUPABASE_SERVICE_ROLE_KEY' && normalized.startsWith('your-supabase-');
};

const requiredString = (name: string) =>
  z
    .string()
    .trim()
    .min(1, `${name} is required`)
    .refine((value) => !looksLikePlaceholder(name, value), `${name} must be set to a real value`);

const requiredUrl = (name: string) =>
  requiredString(name).refine((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, `${name} must be a valid URL`);

const rawCustomerAppBaseUrl =
  trimEnv(process.env.CUSTOMER_APP_BASE_URL) ?? trimEnv(process.env.FRONTEND_BASE_URL);

const envSchema = z
  .object({
    port: z.coerce.number().int().min(1).max(65535).default(3000),
    nodeEnv: z.string().trim().min(1).default('development'),
    logLevel: z.string().trim().min(1).default('info'),
    customerAppBaseUrl: requiredUrl('CUSTOMER_APP_BASE_URL'),
    corsOrigin: requiredString('CORS_ORIGIN'),
    databaseUrl: requiredString('DATABASE_URL').refine(
      (value) => value.startsWith('postgres://') || value.startsWith('postgresql://'),
      'DATABASE_URL must be a valid Postgres connection string',
    ),
    supabaseUrl: requiredUrl('SUPABASE_URL'),
    supabaseServiceRoleKey: requiredString('SUPABASE_SERVICE_ROLE_KEY'),
    supabaseStorageBucket: z.string().trim().min(1).default(DEFAULT_STORAGE_BUCKET),
    stripeSecretKey: requiredString('STRIPE_SECRET_KEY').refine(
      (value) => value.startsWith('sk_'),
      'STRIPE_SECRET_KEY must look like a Stripe secret key',
    ),
    stripeWebhookSecret: requiredString('STRIPE_WEBHOOK_SECRET').refine(
      (value) => value.startsWith('whsec_'),
      'STRIPE_WEBHOOK_SECRET must look like a Stripe webhook secret',
    ),
    stripeSuccessUrl: requiredUrl('STRIPE_SUCCESS_URL'),
    stripeCancelUrl: requiredUrl('STRIPE_CANCEL_URL'),
    stripeShippingRateCents: z.coerce.number().int().min(0, 'STRIPE_SHIPPING_RATE_CENTS must be 0 or greater'),
    resendApiKey: z.string().trim().optional().default(''),
    resendFromEmail: z.string().trim().optional().default(''),
    orderTokenPepper: requiredString('ORDER_TOKEN_PEPPER').refine(
      (value) => value.length >= 16,
      'ORDER_TOKEN_PEPPER must be at least 16 characters long',
    ),
  })
  .superRefine((value, ctx) => {
    const resendConfigured = Boolean(value.resendApiKey || value.resendFromEmail);

    if (resendConfigured && (!value.resendApiKey || !value.resendFromEmail)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'RESEND_API_KEY and RESEND_FROM_EMAIL must be set together when email sending is enabled',
      });
    }
  });

type EnvConfig = Readonly<z.infer<typeof envSchema>>;

let cachedEnv: EnvConfig | null = null;

const buildRawEnv = () => ({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  corsOrigin: trimEnv(process.env.CORS_ORIGIN) ?? rawCustomerAppBaseUrl,
  customerAppBaseUrl: rawCustomerAppBaseUrl,
  databaseUrl: trimEnv(process.env.DATABASE_URL),
  supabaseUrl: trimEnv(process.env.SUPABASE_URL),
  supabaseServiceRoleKey: trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ?? trimEnv(process.env.SUPABASE_SECRET_KEY),
  supabaseStorageBucket: trimEnv(process.env.SUPABASE_STORAGE_BUCKET) ?? DEFAULT_STORAGE_BUCKET,
  stripeSecretKey: trimEnv(process.env.STRIPE_SECRET_KEY),
  stripeWebhookSecret: trimEnv(process.env.STRIPE_WEBHOOK_SECRET),
  stripeSuccessUrl:
    trimEnv(process.env.STRIPE_SUCCESS_URL) ??
    (rawCustomerAppBaseUrl ? `${rawCustomerAppBaseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}` : undefined),
  stripeCancelUrl: trimEnv(process.env.STRIPE_CANCEL_URL) ?? (rawCustomerAppBaseUrl ? `${rawCustomerAppBaseUrl}/cart` : undefined),
  stripeShippingRateCents: process.env.STRIPE_SHIPPING_RATE_CENTS,
  resendApiKey: trimEnv(process.env.RESEND_API_KEY),
  resendFromEmail: trimEnv(process.env.RESEND_FROM_EMAIL),
  orderTokenPepper: trimEnv(process.env.ORDER_TOKEN_PEPPER),
});

const getEnvConfig = () => {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(buildRawEnv());
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => issue.message).join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  cachedEnv = Object.freeze(parsed.data);
  return cachedEnv;
};

export default getEnvConfig;
