# PLAN.md

## Active milestone
Commerce core hardening.

## In scope
- Public catalog APIs: home, collections, tags, products, product detail, search, autocomplete
- Checkout session creation
- Inventory reservation correctness
- Stripe webhook correctness and idempotency
- Guest order access
- Kuji ticket allocation and reveal flows
- Cleanup jobs for expired reservations and pending orders
- Minimal admin operations needed for MVP

## Out of scope
- Discounts/coupons
- DB-backed cart or wishlist
- Returns workflow
- Customer self-serve refunds
- Product variants
- Subscriptions
- Multi-currency expansion
- Advanced analytics
- Recommendation engine
- CMS features
- Redis/caching layer
- Microservices/event-driven redesign

## Key invariants
- Never oversell inventory
- Never mark paid without verified payment signal
- Never double-apply webhook side effects
- Never leak unrevealed kuji prize details
- Never store plaintext guest access tokens
- Never allow arbitrary admin status changes that bypass invariants

## Work order
1. Fix correctness/invariant issues
2. Harden public read APIs
3. Harden checkout flow
4. Harden Stripe webhook flow
5. Harden order access and kuji flows
6. Harden cleanup jobs
7. Add only minimal admin features needed for operation
