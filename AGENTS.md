# AGENTS.md

## Project purpose

This project is a production-ready single-vendor B2C e-commerce platform for a real store that sells:

- Ichiban Kuji
- anime figures
- plushies
- cards
- standard merchandise

It is intended to replace Shopify for a real store, so implementation decisions must prioritize correctness, maintainability, and operational simplicity.

---

## Core tech stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Express.js API
- Prefer TypeScript if the existing backend already uses it
- Modular but simple structure

### Database / auth / storage
- Supabase Postgres
- Supabase Auth
- Supabase Storage

### Payments / email
- Stripe Checkout
- Stripe Tax
- Resend

---

## Non-goals

Do **not** add any of the following unless explicitly requested:

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
2. Reuse the current folder structure, naming, middleware style, interceptor/response wrapper style, and error handling conventions.
3. Do not invent a new architecture if the repo already has a reasonable one.
4. Keep code clean, production-ready, and interview-explainable.
5. Prefer simple, practical solutions over abstract or generic frameworks.
6. Do not rewrite stable code without clear need.
7. Do not broaden scope beyond the current milestone.
8. Complete the current milestone cleanly before starting the next one.
9. If a decision is needed, prefer the simpler production-ready option.
10. Preserve the user’s existing response body shape and error response format.

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

### Cart and wishlist
- Cart is frontend-only (localStorage) for MVP.
- Wishlist is frontend-only (localStorage) for MVP.
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
- Check admin role in DB
- Never trust frontend role flags

### Guest order access
- Use secure guest order links
- Store only token hash in DB
- Do not store plaintext guest access token

### Backend internal privileges
- Backend may use Supabase secret key internally for privileged server operations
- Do not use secret key itself as the admin caller credential

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

Do not add unnecessary extra tables unless required by the current milestone.

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

Prefer secure/signed upload flow if it fits the existing project style.

Validate upload size and file type.

---

## Observability rules

Implement practical production basics only:
- centralized error handling
- structured logging
- Stripe webhook verification
- idempotent webhook processing
- rate limiting using existing project pattern
- migration-based schema changes

Do not add a heavy observability platform unless already present.

---

## Delivery expectation per thread

For each implementation thread:
1. Read this file first.
2. Read `PLAN.md`.
3. Execute only the requested milestone.
4. Do not begin future milestones unless explicitly instructed.
5. Keep changes consistent with the existing project style.
6. Leave concise notes on what remains for the next milestone if useful.
