import 'dotenv/config';

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'production',
  logLevel: process.env.LOG_LEVEL || 'info',

  // B2
  b2KeyId: process.env.B2_KEY_ID || '',
  b2AppKey: process.env.B2_APP_KEY || '',
  b2BucketName: process.env.B2_BUCKET_NAME || '',
  b2S3Endpoint: process.env.B2_S3_ENDPOINT || '',

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisOtpExpiry: Number(process.env.REDIS_OTP_EXPIRY) || 600,
  redisProductsExpiry: Number(process.env.REDIS_PRODUCTS_EXPIRY) || 1800,

  // Supabase
  databaseUrl: process.env.DATABASE_URL || '',

  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
};

const getEnvConfig = () => {
  return Object.freeze({
    ...env,
  });
};

export default getEnvConfig;
