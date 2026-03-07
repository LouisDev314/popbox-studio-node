# PLAN.md

## Objective

Build the production-ready MVP of a single-vendor B2C anime merchandise e-commerce platform with:

- real Stripe checkout
- Supabase-backed catalog/inventory/orders
- Kuji ticket allocation and reveal flow
- guest order access
- admin product/order management

This plan is intentionally split into milestones so Codex can execute them in separate threads without exhausting context.

---

## Execution rules

1. Always read `AGENTS.md` before starting work.
2. Only execute the milestone explicitly requested in the current thread.
3. Do not start later milestones early.
4. Keep implementation aligned with the repo’s existing code style and architecture.
5. Prefer finishing one milestone cleanly over partially scaffolding several.

---

# Milestone 1 — Foundation and schema

## Goal
Establish the backend/data foundation for the full project.

## Scope
- Inspect repo structure and existing backend conventions
- Add/update database schema and migrations for the agreed MVP tables
- Add shared enums/types/constants if needed
- Wire route/module registration for new domains
- Add auth middleware integration skeleton
- Add admin guard middleware
- Add Stripe/Resend/Supabase service wiring skeletons if needed
- Add `search_vector` and required indexes
- Add trigram extension/index if needed

## Included tables
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

## Not in scope
- full business logic
- frontend pages
- Stripe checkout logic
- cron jobs
- reveal endpoints
- admin CRUD behavior beyond scaffolding

## Definition of done
- Schema/migrations are coherent
- Backend compiles/boots
- New modules/routes are registered cleanly
- Search/index foundations are in place
- No unrelated features started

---

# Milestone 2 — Catalog, search, and admin catalog management

## Goal
Make products manageable and browsable.

## Scope
### Public/storefront APIs
- `GET /v1/home`
- `GET /v1/collections`
- `GET /v1/tags`
- `GET /v1/products`
- `GET /v1/products/:slug`
- `GET /v1/search`

### Admin APIs
- products CRUD
- collections CRUD
- tags CRUD
- product image attach/reorder/delete
- inventory update
- kuji prize CRUD

## Business requirements
- products support `standard` and `kuji`
- collections and tags power filtering
- product detail includes Kuji prize info when applicable
- home endpoint returns:
    - New Drops
    - Trending Now
    - All Products preview
- search uses `search_vector` + trigram

## Not in scope
- checkout
- reservations
- Stripe
- guest order flow
- refunds
- cron jobs

## Definition of done
- Catalog APIs are usable from Postman
- Admin can create a Kuji product and set prize pool
- Search and filters work
- Product image metadata flow is implemented
- Public product browsing is functional

---

# Milestone 3 — Checkout, reservations, payments, and Kuji allocation

## Goal
Implement the core money flow safely.

## Scope
### Public APIs
- `POST /v1/checkout/session`
- `GET /v1/checkout/success`

### System API
- `POST /v1/webhooks/stripe`

### Jobs
- reservation cleanup
- pending order cleanup

## Required business flow
1. Validate checkout request
2. Create/find customer
3. Create pending order
4. Create order items
5. Create inventory reservations with 10-minute TTL
6. Increment reserved stock
7. Create Stripe Checkout Session
8. Persist Stripe session id
9. On webhook success:
    - verify webhook signature
    - dedupe via webhook events table
    - create/update payment
    - convert reservations
    - decrement on_hand and reserved
    - mark order paid
    - allocate Kuji tickets using weighted draw
    - send order confirmation email with secure order link

## Critical requirements
- use DB transactions
- use safe locking during Kuji allocation
- mark `paid_needs_attention` if payment finalization cannot complete safely
- keep handlers idempotent

## Not in scope
- frontend pages beyond what is absolutely needed for integration
- admin refund flow
- guest reveal flow

## Definition of done
- Checkout session endpoint works
- Stripe webhook flow is implemented
- Reservation lifecycle works
- Kuji allocation works
- Confirmation email flow is wired

---

# Milestone 4 — Guest order access and reveal flow

## Goal
Allow customers to revisit orders and reveal tickets later.

## Scope
### Public APIs
- `GET /v1/orders/:publicId`
- `GET /v1/orders/:publicId/tickets`
- `POST /v1/orders/:publicId/tickets/:ticketId/reveal`
- `POST /v1/orders/:publicId/tickets/reveal-all`

## Requirements
- guest access token must be required
- token hash stored in DB
- order page can be accessed later through emailed secure link
- unrevealed tickets do not expose prize info
- reveal one / reveal all are idempotent
- revealed tickets expose prize info
- support revealed/unrevealed separation cleanly

## Not in scope
- customer accounts/order history
- returns/refunds UI

## Definition of done
- guest order lookup works securely
- ticket listing works
- reveal one works
- reveal all works

---

# Milestone 5 — Admin orders, shipment, and refund exception flow

## Goal
Enable real operational management of orders.

## Scope
### Admin APIs
- `GET /v1/admin/orders`
- `GET /v1/admin/orders/:id`
- `PATCH /v1/admin/orders/:id/status`
- `PATCH /v1/admin/orders/:id/shipment`
- `POST /v1/admin/orders/:id/refund`
- `GET /v1/admin/customers`

## Requirements
- enforce sensible order status transitions
- shipment update supports:
    - carrier name
    - tracking number
    - tracking URL
- shipped email sent on shipment update
- refund is full-refund only
- refund is admin-only exceptional path
- refunded Kuji tickets are voided

## Definition of done
- admin can operate order lifecycle
- admin can refund exceptional cases
- shipment flow is usable

---

# Milestone 6 — Frontend storefront and guest pages

## Goal
Make the MVP usable through the frontend.

## Scope
### Frontend pages
- home page
- product listing page
- product detail page
- cart page
- checkout success page
- guest order page `/orders/[publicId]`

## Requirements
- localStorage cart
- localStorage wishlist
- home page uses aggregate home endpoint
- product pages use backend APIs
- success page verifies session and clears cart
- guest order page reads secure token and supports reveal flow
- use Next.js image optimization where practical

## Not in scope
- advanced UI polish
- dashboard analytics
- full customer account system

## Definition of done
- end-to-end happy path is usable from frontend
- guest order revisit and reveal works
- storefront can browse/search/add to cart/check out

---

# Milestone 7 — Hardening and cleanup

## Goal
Tighten the MVP to production-ready baseline.

## Scope
- review API validation coverage
- review error handling consistency
- review logs for checkout/webhook/allocation/reveal/refund
- review migration correctness
- review env usage and secrets boundaries
- review rate limiting coverage
- fix integration mismatches
- clean obvious code smells introduced during implementation

## Definition of done
- major flows are coherent
- response/error handling is consistent with project style
- implementation is ready for manual Postman and browser testing

---

## Recommended thread usage

### Thread 1
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 1.”

### Thread 2
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 2. Do not change Milestone 1 architecture unless necessary.”

### Thread 3
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 3.”

### Thread 4
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 4.”

### Thread 5
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 5.”

### Thread 6
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 6.”

### Thread 7
“Read `AGENTS.md` and `PLAN.md`. Execute only Milestone 7.”

---

## Important note for Codex threads

When a milestone is large, it is acceptable to split it again, but only if the current thread stays inside the same milestone boundary.

Example:
- Milestone 3A = checkout + reservations
- Milestone 3B = webhook + payment finalization
- Milestone 3C = Kuji allocation + confirmation email

Do not mix milestones unless explicitly instructed.
