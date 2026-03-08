# Popbox Studio Backend

Backend-only ecommerce API for Popbox Studio. This repo contains the Express/TypeScript service, database schema, background jobs, and integration wiring for Supabase, Stripe, and Resend.

## Stack

- Express 5 + TypeScript
- Drizzle ORM + Postgres
- Supabase Postgres/Auth/Storage
- Stripe Checkout + Stripe Tax
- Resend

## Repo layout

- `src/` routes, middleware, services, jobs, schema, and clients
- `supabase/migrations/` SQL migration history
- `openapi.yaml` backend contract source for manual Postman import

## Verified state on March 8, 2026

- Live Supabase project: `bpclnekuanwtojarniyc`
- Project and core services: `ACTIVE_HEALTHY`
- Public schema: 17 tables
- Verified extensions: `pgcrypto`, `pg_trgm`
- Verified search support:
  - `products.search_vector` GIN index exists
  - `products.name` trigram GIN index exists
  - refresh triggers exist on `products`, `product_tags`, and `tags`
- Verified auth baseline:
  - `auth.users = 1`
  - `public.users = 1`
  - `public.users.role = 'admin'` count is `1`
- Verified storage baseline:
  - public bucket `product-images` exists
  - file size limit is `5242880`
  - allowed MIME types are `image/jpeg`, `image/png`, `image/webp`, `image/avif`
- Live fixture counts are effectively empty:
  - `collections = 0`
  - `products = 0`
  - `orders = 0`
  - `product_images = 0`
  - `storage.objects = 0`

## Runtime checks verified locally

- `GET /health`
- `GET /v1/home`
- `GET /v1/products`
- `GET /v1/collections`
- `GET /v1/tags`
- `GET /v1/search?q=aa`
- `GET /v1/products/not-a-real-slug`
- invalid guest token returns `401`
- missing admin auth returns `401`
- malformed or expired admin JWT returns `401`

Verified failure paths:

- malformed JSON on `POST /v1/checkout/session` returns wrapped `400`
- schema-invalid checkout body returns `400`
- invalid search query `q=a` returns `400`
- invalid Stripe signature returns `400`

## Still intentionally unverified

No live catalog/order fixtures were created in the production-target project. These flows remain open:

- admin happy-path reads and writes with a current live admin JWT
- product image upload happy path
- checkout success and webhook finalization happy path
- guest order and ticket reveal happy path

## Environment configuration

Required with no safe default:

- `CUSTOMER_APP_BASE_URL`
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_SHIPPING_RATE_CENTS`
- `ORDER_TOKEN_PEPPER`

Used by the backend with local defaults but should be set explicitly outside local development:

- `CORS_ORIGIN` default `CUSTOMER_APP_BASE_URL`
- `STRIPE_SUCCESS_URL` default `${CUSTOMER_APP_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
- `STRIPE_CANCEL_URL` default `${CUSTOMER_APP_BASE_URL}/cart`
- `SUPABASE_STORAGE_BUCKET` default `product-images`

Optional:

- `RESEND_API_KEY` and `RESEND_FROM_EMAIL`
  - both must be set together if email sending is enabled

Deprecated compatibility aliases still supported in code:

- `FRONTEND_BASE_URL` for `CUSTOMER_APP_BASE_URL`
- `SUPABASE_SECRET_KEY` for `SUPABASE_SERVICE_ROLE_KEY`

## Local run

1. Copy `.env.example` to `.env`.
2. Replace placeholder secrets and URLs with real values.
3. Run:

```bash
pnpm lint
pnpm -s build
node dist/index.js
```

## API notes

- public routes are mounted at `/v1/*`
- health route is `/health`
- Stripe webhook route is `POST /v1/webhooks/stripe`
- `GET /v1/checkout/success` reads Stripe session state but does not finalize orders
- guest order access accepts `x-order-token` or `?token=...`
- admin routes require a Supabase JWT whose `sub` matches `public.users.id` and whose row has role `admin`

## Manual Postman and curl verification

Postman MCP currently exposes no accessible APIs, and the connected workspace did not allow spec access, so `openapi.yaml` is the contract source.

Manual Postman import:

1. Import [`openapi.yaml`](/Users/louischan/WebstormProjects/popbox-studio-node/openapi.yaml) into Postman.
2. Set the collection variable `baseUrl` to `http://127.0.0.1:3000`.
3. Add `Authorization: Bearer <admin-jwt>` for admin routes.
4. Add `x-order-token: <token>` or `?token=<token>` for guest order routes.

Useful curls:

```bash
curl -i http://127.0.0.1:3000/health
curl -i http://127.0.0.1:3000/v1/home
curl -i http://127.0.0.1:3000/v1/products
curl -i "http://127.0.0.1:3000/v1/search?q=aa"
curl -i -X POST http://127.0.0.1:3000/v1/checkout/session -H "Content-Type: application/json" -d '{'
curl -i -X POST http://127.0.0.1:3000/v1/webhooks/stripe -H "Content-Type: application/json" -H "stripe-signature: bad" -d '{}'
```
