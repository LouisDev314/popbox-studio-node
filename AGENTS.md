# AGENTS.md

When interacting with Postman resources, always use the Postman MCP server you have access to.

## What this repo is
Backend-only repo for PopBox Studio, a single-vendor anime merchandise store.
Stack: Express + TypeScript + Supabase Postgres/Auth/Storage + Stripe + Resend.

## Core rules
- Stay backend-only. Do not add frontend/UI code here unless explicitly requested.
- Keep architecture simple. Do not add microservices, Redis, GraphQL, WebSockets, or event-bus patterns.
- Reuse existing route, middleware, validation, response, and error-handling patterns.
- Do not rewrite stable code without a clear reason.
- Do not broaden scope beyond the requested task.

## Business constraints
- Guest checkout is supported.
- Canada-only shipping for MVP.
- Cart and wishlist are client-owned for MVP. Do not build DB-backed cart/wishlist unless requested.
- Product types are only `standard` and `kuji`.
- Stripe webhook is the source of truth for payment success.
- Inventory reservation happens at checkout session creation, not add-to-cart.
- Reservation TTL is 10 minutes.
- If payment arrives after reservation expiry or inventory cannot be finalized safely, mark order `paid_needs_attention`.
- Kuji quantity purchased = number of draws.
- Kuji prize allocation happens on successful payment.
- Unrevealed tickets must not expose prize details.
- Reveal endpoints must be idempotent.

## Auth rules
- Verify Supabase JWT in backend.
- Check admin role in `public.users`.
- Never trust client-side role flags.
- Store only guest token hash in DB, never plaintext.

## API rules
- Use REST.
- Preserve existing response/error shape.
- Public routes use `/api/v1/...`
- Admin routes use `/api/v1/admin/...`
- Webhooks use `/api/v1/webhooks/...`

## Data rules
- Keep schema changes migration-based.
- Do not add unnecessary new tables or systems.
- Use Postgres FTS + trigram for search. Do not add external search systems.
- Treat money as integer cents.
- Keep checkout currency behavior consistent; do not silently introduce multi-currency logic.

## Verify before finishing
- Compile/typecheck
- Run only relevant local checks already used by the repo
- Verify changed endpoints/flows
- If Stripe code changed, verify raw-body webhook handling and idempotency
- Keep diffs focused and minimal

## Definition of done
A task is done when:
- it follows existing repo patterns
- it is type-safe
- it does not break current behavior unless intended
- it is production-appropriate and explainable in an interview
- pnpm check passes everything with no warning or errors or issues
- give a commit message for the changes in the end

## Planning rule
Read `PLAN.md` before starting work if the task is multi-step, touches core commerce flows, or changes schema/payment/inventory/order logic.
