import 'dotenv/config';
import { parseStripeCheckoutReservationTtlMs } from '../utils/checkout';

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'dev',
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:3001',
  adminBaseUrl: process.env.ADMIN_BASE_URL || 'http://localhost:3001/admin',

  // Supabase
  databaseUrl: process.env.DATABASE_URL || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabasePublicKey: process.env.SUPABASE_PUBLIC_KEY || '',
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || '',
  supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET || '',

  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  stripeShippingRateCents: Number(process.env.STRIPE_SHIPPING_RATE_CENTS) || 1500,
  stripeSuccessUrl: process.env.STRIPE_SUCCESS_URL || '',
  stripeCancelUrl: process.env.STRIPE_CANCEL_URL || '',
  stripeCheckoutSessionReservationTtl: parseStripeCheckoutReservationTtlMs(
    process.env.STRIPE_CHECK_SESSION_RESERVATION_TTL,
  ),

  // SMTP
  resendApiKey: process.env.RESEND_API_KEY || '',
  resendFromEmail: process.env.RESEND_FROM_EMAIL || '',

  // Salt
  orderTokenPepper: process.env.ORDER_TOKEN_PEPPER || '',
};

const getEnvConfig = () => {
  return Object.freeze({
    ...env,
  });
};

export default getEnvConfig;
