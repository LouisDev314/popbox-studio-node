process.env.TZ = 'UTC';
process.env.PORT = process.env.PORT ?? '3000';
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? 'silent';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'https://client.example.com';
process.env.CLIENT_BASE_URL = process.env.CLIENT_BASE_URL ?? 'https://client.example.com';
process.env.ADMIN_BASE_URL = process.env.ADMIN_BASE_URL ?? 'https://client.example.com/admin';
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/popbox_test';
process.env.SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://supabase.example.com';
process.env.SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY ?? 'supabase-public-key';
process.env.SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? 'supabase-secret-key';
process.env.SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? 'product-images';
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? 'sk_test_launch';
process.env.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_launch_test';
process.env.STRIPE_SUCCESS_URL =
  process.env.STRIPE_SUCCESS_URL ?? 'https://client.example.com/checkout/success?session_id={CHECKOUT_SESSION_ID}';
process.env.STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL ?? 'https://client.example.com/cart';
process.env.STRIPE_CHECK_SESSION_RESERVATION_TTL = process.env.STRIPE_CHECK_SESSION_RESERVATION_TTL ?? '600000';
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY ?? 're_test_launch';
process.env.RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@popbox.example.com';
process.env.ORDER_NOTIFICATION_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL ?? 'orders@popbox.example.com';
process.env.CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'contact@popbox.example.com';
process.env.ORDER_TOKEN_PEPPER = process.env.ORDER_TOKEN_PEPPER ?? 'launch-test-pepper';

export {};
