# PLAN.md

## Objective

Maintain and verify the backend-only MVP of a single-vendor B2C anime merchandise e-commerce platform with:

- Stripe checkout
- Supabase-backed catalog, inventory, and orders
- Kuji ticket allocation and reveal flow
- guest order access
- admin product and order management

Frontend work is out of scope for this repository.

---

## Execution rules

1. Always read `AGENTS.md` before starting work.
2. Only execute the milestone explicitly requested in the current thread.
3. Do not start later milestones early.
4. Keep implementation aligned with the repo’s existing code style and architecture.
5. Prefer honest verification over milestone claiming.
6. Do not create live fixtures in the production-target Supabase project unless explicitly approved with a cleanup plan.

---

## Verification Snapshot on March 8, 2026

### Supabase MCP

- Verified project `bpclnekuanwtojarniyc` is `ACTIVE_HEALTHY`.
- Verified the public schema has 17 tables.
- Verified `pgcrypto` and `pg_trgm` are installed.
- Verified `products_search_vector_gin_idx` and `products_name_trgm_gin_idx` exist.
- Verified search refresh triggers exist on `products`, `product_tags`, and `tags`.
- Verified auth baseline counts:
  - `auth.users = 1`
  - `public.users = 1`
  - `public.users.role = 'admin'` count is `1`
- Verified storage baseline:
  - bucket `product-images` exists and is public
  - file size limit is `5242880`
  - allowed MIME types are `image/jpeg`, `image/png`, `image/webp`, `image/avif`
- Verified empty-state data counts:
  - `collections = 0`
  - `products = 0`
  - `orders = 0`
  - `product_images = 0`
  - `storage.objects = 0`

### Postman MCP

- `POSTMAN_GET_ALL_APIS` returned no accessible APIs.
- A workspace spec lookup returned `403`, so Postman MCP is not currently a usable source of truth for contracts in this repo.
- `openapi.yaml` remains the contract source until Postman access changes.

### Local Runtime

- Verified `pnpm -s build` succeeds.
- Verified `node dist/index.js` boots successfully.
- Verified the mounted public route surface is `/v1/...`, not `/api/v1/...`.
- Verified:
  - `GET /health`
  - `GET /v1/home`
  - `GET /v1/collections`
  - `GET /v1/tags`
  - `GET /v1/products`
  - `GET /v1/search?q=aa`
  - `GET /v1/products/not-a-real-slug`
- Verified failure-path behavior:
  - `GET /v1/search?q=a` returns wrapped `400`
  - malformed JSON on `POST /v1/checkout/session` returns wrapped `400`
  - invalid guest order token returns `401`
  - missing admin auth returns `401`
  - malformed or expired admin JWT returns `401`
  - invalid Stripe signature returns `400`

### Verification Limits

- No live catalog fixtures were created in the production-target Supabase project.
- No live checkout session, webhook delivery, paid order, ticket allocation, shipment, or refund flow was exercised in this audit.
- A previously used admin JWT is now expired, so no admin happy-path read/write claim is carried forward from this pass.

---

# Milestone 1 — Foundation, Schema, and Backend-Only Baseline

## Status
Verified.

## What is true

- The repo is backend-only again in active structure.
- The Drizzle schema and SQL migrations cover the expected MVP tables.
- The live Supabase project matches the core schema assumptions, extensions, and search indexes.
- The production start path now works again:
  - CommonJS output no longer crashes on `jose`
  - the server boots
  - the documented `/v1/...` route surface matches the runtime
- Configuration cleanup removed clearly misleading boundaries:
  - unused `ADMIN_APP_BASE_URL`
  - unused public Supabase client/env plumbing
  - unsafe defaults for `CUSTOMER_APP_BASE_URL`
  - unsafe default shipping price

## Remaining notes

- Foundation is verified for build, boot, schema, and mounted route shape.
- Later milestones still depend on real catalog/order/payment data and external integrations.

---

# Milestone 2 — Catalog, Search, and Admin Catalog Management

## Status
Partially verified.

## What is true

- Public catalog read routes are implemented.
- Empty-state behavior is verified for:
  - `GET /v1/home`
  - `GET /v1/collections`
  - `GET /v1/tags`
  - `GET /v1/products`
  - `GET /v1/products/:slug` not-found behavior
  - `GET /v1/search`
- Public search validation is verified.
- Admin catalog CRUD, inventory updates, and kuji prize CRUD are implemented in code.
- Product image upload/delete code now fails honestly when the configured bucket is missing instead of pretending readiness.

## What is not verified

- No admin happy-path catalog request was re-verified in this audit because a current live admin JWT was not available.
- No live catalog fixtures exist in the target Supabase project.
- Product image upload/delete happy paths were not exercised against a disposable storage fixture.

## What blocks completion

- Current live admin JWT for manual admin-route verification.
- Approved disposable catalog/storage fixtures for create/update/image flows.

---

# Milestone 3 — Checkout, Reservations, Payments, and Kuji Allocation

## Status
Blocked.

## What is true

- Checkout, reservation, webhook, cleanup-job, and kuji allocation code paths exist.
- Negative-path behavior is verified for:
  - malformed checkout JSON
  - invalid checkout query/body validation
  - invalid Stripe webhook signatures
- `GET /v1/checkout/success` no longer finalizes orders.
- Stripe webhooks are now the only code path that finalizes payment, converts reservations, allocates tickets, and updates paid order state.

## What is not verified

- Stripe checkout session creation against a real active product and inventory state.
- Webhook-driven finalization.
- Reservation conversion and expiry behavior under real checkout traffic.
- Kuji allocation against a real prize pool.
- Order confirmation email delivery.

## What blocks completion

- Approved live or disposable products, inventory, and kuji prize data.
- Real Stripe checkout configuration and webhook delivery.
- Real Resend configuration if email delivery is part of the verification target.

---

# Milestone 4 — Guest Order Access and Reveal Flow

## Status
Blocked.

## What is true

- Guest order access requires a hashed token stored on the order.
- Guest routes accept `x-order-token` or `?token=...`.
- Invalid guest tokens return `401`.
- Ticket reveal endpoints are implemented and written to be idempotent.
- Unrevealed guest ticket views hide prize details.

## What is not verified

- Guest order lookup with a real paid order.
- Ticket listing for a real kuji order.
- Single-ticket reveal happy path.
- Reveal-all happy path.

## What blocks completion

- Real paid order data with generated tickets.
- Milestone 3 webhook finalization and kuji allocation working against live data.

---

# Milestone 5 — Admin Orders, Shipment, and Refund Exception Flow

## Status
Blocked.

## What is true

- Admin order/customer routes are implemented.
- Order-status input is restricted to the known enum.
- Shipment datetime inputs are validated as real datetimes.
- Order status transition rules exist in code.
- Auth baseline is verified in the database:
  - admin user exists in `public.users`
  - JWT subject lookup is aligned with `auth.users`

## What is not verified

- Admin happy-path reads and writes with a current live JWT.
- Shipment creation/update against a real order.
- Refund flow against a real Stripe payment intent.
- Customer listing against non-empty data.

## What blocks completion

- Current live admin JWT for manual route verification.
- Real order/payment/shipment data in a disposable or approved environment.
- Real Stripe refund exercise.

---

# Milestone 6 — Hardening and Cleanup

## Status
Partially verified.

## What is true

- Request validation now stays in explicit validated request state instead of mutating `req.body`, `req.query`, and `req.params`.
- Wrapped error handling is verified for the exercised 4xx cases above.
- Request IDs and structured logging remain in place.
- Rate limiting is active on global, checkout, and webhook routes.
- OpenAPI can still serve as the contract source because the mounted route surface is aligned with it again.
- The code no longer claims checkout-success finalization that conflicts with the Stripe webhook boundary.

## What remains open

- Admin happy-path runtime verification is still missing.
- End-to-end integration verification for storage, Stripe, Resend, and refund flows is still missing.
- Some operational edge cases remain review candidates, but changing them in this thread would become feature work or broader behavior changes.

