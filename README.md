# Popbox Studio

Single-vendor B2C storefront and admin stack built on the existing Express/Drizzle backend, with a Next.js storefront in `apps/web`.

## Stack

- Backend: Express 5, TypeScript, Drizzle ORM, Postgres
- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Infra: Supabase Postgres/Auth/Storage, Stripe Checkout + Tax, Resend

## Repo layout

- `src/` backend app, routes, middleware, services, schema, jobs
- `supabase/migrations/` SQL migrations for schema, triggers, search, and indexes
- `apps/web/` Next.js storefront and minimal admin UI

## Run locally

1. Copy `.env.example` to `.env` and fill the Supabase, Stripe, Resend, and frontend values.
2. Apply the SQL migration in `supabase/migrations/0001_initial_store.sql` to your Postgres/Supabase database.
3. Start the backend:

```bash
pnpm dev:api
```

4. Start the frontend:

```bash
pnpm dev:web
```

5. Build both apps:

```bash
pnpm build
```

## Important runtime notes

- Public API routes are mounted at `/v1/*`.
- Stripe webhook route is `POST /v1/webhooks/stripe`.
- Product images are uploaded by the backend into the configured public Supabase Storage bucket and stored as `storage_key`.
- Guest order access uses a hashed token in the database. The plaintext token is only carried in Stripe session metadata and the emailed success link.
- Kuji sellable inventory is derived from prize quantities. Use the kuji prize admin endpoints to manage available draws; the generic inventory patch endpoint is for standard products only.
- Reservation cleanup runs in-process every 2 minutes and stale pending-order cleanup runs every 10 minutes.

## Environment variables

See `.env.example`. The minimum production-relevant values are:

- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_PUBLIC_KEY`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_SUCCESS_URL`
- `STRIPE_CANCEL_URL`
- `STRIPE_SHIPPING_RATE_CENTS`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ORDER_TOKEN_PEPPER`
- `FRONTEND_BASE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Current frontend coverage

- Storefront pages: home, product listing, product detail, cart, checkout success, guest order page
- Admin pages: login, product list/create, order list
- Cart and wishlist are localStorage-only for MVP

## Search

- `products.search_vector` is maintained in SQL via trigger functions
- Search weighting:
  - product name highest
  - tags next
  - description lower
- Trigram matching is enabled on product name via `pg_trgm`
