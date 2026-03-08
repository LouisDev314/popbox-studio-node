# AGENTS.md

## Project purpose

This repository is the backend-only codebase for a production-minded single-vendor B2C anime merchandise store. It is intended to replace Shopify for a real store, so decisions must prioritize correctness, maintainability, operational simplicity, and interview-explainable tradeoffs.

---

## Repo direction

- Backend only in this repo.
- Storefront and admin clients are external consumers and may live in separate repos.
- Do not scaffold, regenerate, or polish frontend/UI code here unless a backend contract or document cannot be kept accurate without it.
- Prefer API contracts, OpenAPI, Postman collections, and backend verification over any UI work.

---

## Core tech stack

### Backend
- Express.js
- TypeScript
- Modular but simple structure

### Database / auth / storage
- Supabase Postgres
- Supabase Auth
- Supabase Storage

### Payments / email
- Stripe Checkout
- Stripe Tax
- Resend

### API tooling
- OpenAPI
- Postman collections for request verification

---

## Non-goals

Do **not** add any of the following unless explicitly requested:

- frontend app work in this repo
- GraphQL
- Redis
- microservices
- event bus
- WebSockets
- AI features
- discount/coupon system
- generic product variants
- subscriptions
- returns workflow
- customer self-serve refund flow
- analytics system
- automated tests
- large refactors of already-working project foundations

---

## Project-wide implementation rules

1. Inspect the existing repo structure before making changes.
2. Reuse the current route, middleware, response wrapper, and error handling style.
3. Do not invent a new architecture if the repo already has a reasonable one.
4. Keep code production-ready and explainable.
5. Prefer simple, practical solutions over abstraction-heavy ones.
6. Do not rewrite stable code without a clear need.
7. Do not broaden scope beyond the current backend milestone.
8. Preserve the existing response body shape and error response format.
9. Prefer env-driven integration boundaries over repo-local assumptions.
10. Use Supabase MCP and Postman MCP for real verification when available.

---

## Business rules

### Sales policy
- All sales are final.
- No customer-facing refund flow.
- Admin may issue a full refund only for exceptional seller-error cases.

### Checkout
- Guest checkout is supported.
- One-time payments only.
- Canada-only shipping for MVP.
- Shipping only, no local pickup.

### Client-owned cart and wishlist
- Cart is client-owned for MVP.
- Wishlist is client-owned for MVP.
- Do not build DB-backed carts in MVP.

---

## Product model

### Product types
- `standard`
- `kuji`

Do not add other product types unless explicitly requested.

### Catalog organization
- Use collections for top-level grouping
- Use tags for anime / brand / subcategory / filtering

### Search
- Use PostgreSQL full-text search with `search_vector`
- Use trigram fuzzy search on product name
- Weighted relevance priority:
  1. product name
  2. tags
  3. description

---

## Kuji rules

1. A Kuji item is a product with `product_type = kuji`.
2. Product quantity selected at checkout equals number of draws.
3. No bundle pricing in MVP.
4. On successful payment:
   - allocate tickets immediately
   - assign prizes immediately
   - decrement prize pool immediately
5. Reveal later only updates `revealed_at`.
6. Unrevealed tickets must not expose prize details yet.
7. Reveal endpoints should be idempotent.

---

## Inventory and checkout rules

1. No reservation at add-to-cart.
2. Inventory reservations are created at checkout session creation.
3. Reservation TTL is 10 minutes.
4. Reservation cleanup runs every 1–5 minutes.
5. Pending order cleanup runs every 10 minutes.
6. Stripe webhook is the source of truth for payment success.
7. If payment succeeds after reservation expiry or inventory cannot be finalized safely:
   - mark order as `paid_needs_attention`
   - do not silently corrupt inventory state

---

## Auth rules

### Admin
- Verify Supabase JWT in backend
- Check admin role in `public.users`
- Never trust client-side role flags

### Guest order access
- Use secure guest order links
- Store only token hash in DB
- Do not store plaintext guest access token

### Backend internal privileges
- Backend may use the Supabase service role key internally for privileged server operations
- Do not use the service role key itself as the admin caller credential

---

## API rules

### Public route style
Do not expose `/public` in URLs.

Preferred public route style:
- `/v1/home`
- `/v1/products`
- `/v1/products/:slug`
- `/v1/search`
- `/v1/checkout/session`
- `/v1/orders/:publicId`
- `/v1/orders/:publicId/tickets`

### Admin routes
Use `/v1/admin/...`

### Webhooks
Use `/v1/webhooks/...`

### API shape
- Use REST
- Preserve existing response wrapper / interceptor conventions
- Preserve existing error response body conventions

---

## Database rules

Core MVP tables expected:
- users
- customers
- addresses
- collections
- tags
- products
- product_tags
- product_images
- product_inventory
- inventory_reservations
- kuji_prizes
- orders
- order_items
- payments
- tickets
- shipments
- stripe_webhook_events

Do not add unnecessary extra tables unless required by a proven backend gap.

---

## Search/index rules

Include and maintain:
- `products.search_vector`
- GIN index on `products.search_vector`
- trigram GIN index on `products.name`
- cursor-pagination-friendly indexes
- reservation indexes
- order lookup indexes
- ticket lookup indexes

---

## Email rules

Use Resend for:
- order confirmation
- shipped email

Do not add extra email logging tables in MVP unless explicitly requested.

---

## Storage rules

Use Supabase Storage for product images.
Store durable storage paths in `product_images.storage_key`.
Validate upload size and file type.
If the target bucket is missing, document it as a blocker instead of assuming uploads are ready.

---

## Observability rules

Implement practical production basics only:
- centralized error handling
- structured logging
- Stripe webhook verification
- idempotent webhook processing
- rate limiting using the existing pattern
- migration-based schema changes
- fail-fast startup when required integrations are misconfigured

Do not add a heavy observability platform unless already present.

---

## Delivery expectation per thread

1. Read this file first.
2. Read `PLAN.md`.
3. Stay inside the requested backend milestone.
4. Do not begin future product milestones unless explicitly instructed.
5. Keep changes consistent with the existing project style.
6. Verify behavior with local commands plus MCP-backed checks when possible.
7. Leave concise notes on remaining blockers if useful.
