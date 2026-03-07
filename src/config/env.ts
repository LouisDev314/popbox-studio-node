import 'dotenv/config';

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3001',
  adminBaseUrl: process.env.ADMIN_BASE_URL || 'http://localhost:3001/admin',

  // Supabase
  databaseUrl: process.env.DATABASE_URL || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabasePublicKey: process.env.SUPABASE_PUBLIC_KEY || '',
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || '',
  supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET || 'product-images',

  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  stripeSuccessUrl:
    process.env.STRIPE_SUCCESS_URL || 'http://localhost:3001/checkout/success?session_id={CHECKOUT_SESSION_ID}',
  stripeCancelUrl: process.env.STRIPE_CANCEL_URL || 'http://localhost:3001/cart',
  stripeShippingRateCents: Number(process.env.STRIPE_SHIPPING_RATE_CENTS) || 1500,

  // Resend
  resendApiKey: process.env.RESEND_API_KEY || '',
  resendFromEmail: process.env.RESEND_FROM_EMAIL || '',

  // Guest access
  orderTokenPepper: process.env.ORDER_TOKEN_PEPPER || '',
};

const getEnvConfig = () => {
  return Object.freeze({
    ...env,
  });
};

export default getEnvConfig;
