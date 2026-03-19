# Production Hardening Plan

This plan reflects the repository state as of March 12, 2026.

Repo-truth notes:
- Checkout idempotency already exists via `Idempotency-Key` plus `orders.checkout_idempotency_key`.
- Basic late-payment handling already exists through `paid_needs_attention`, but the trust boundary and expiry alignment still need tightening.
- Refund tracking already exists in `payments.refunded_amount_cents`, but there is no durable Stripe refund reconciliation path yet.
- Guest order access currently trusts a long-lived token from `?token=` or `x-order-token` on every request; this needs to become a one-click token exchange into an HttpOnly cookie-backed guest session.
- Cookie-backed guest session helpers already exist locally, but the runtime still accepts raw guest tokens on normal order APIs, still returns raw guest tokens from checkout success/finalization responses, and currently builds guest access links from an `apiBaseUrl` config that is not yet defined in `src/config/env.ts`.

## Phase 1 - Stripe Webhook Runtime Correctness

### Goal
Make Stripe signature verification work on the real runtime path and keep webhook processing safe under duplicate deliveries and failures.

### Risk being fixed
- `express.json()` currently runs before `/api/v1/webhooks/stripe`, which breaks Stripe raw-body verification in the deployed runtime path.
- The webhook route is not isolated from global body parsing.
- Failure handling should always persist the best-available webhook processing state and stay non-fatal to the process.

### Files expected
- `src/index.ts`
- `src/routes/v1/index.ts`
- `src/routes/v1/webhooks-router/index.ts`
- `src/services/webhooks/index.ts`

### Implementation summary
1. Mount the Stripe webhook router before global JSON and URL-encoded middleware.
2. Keep `express.raw({ type: 'application/json' })` only on the Stripe webhook route.
3. Ensure the runtime path passes an untouched `Buffer` to `stripe.webhooks.constructEvent(...)`.
4. Keep duplicate delivery handling idempotent by short-circuiting already-processed events and avoiding duplicate event-row failures.
5. Record webhook failure state without crashing the process.

### Acceptance criteria
- Stripe signature verification uses the untouched raw request body.
- `/api/v1/webhooks/stripe` is not affected by global JSON parsing.
- Replayed webhook deliveries are treated as duplicates safely.
- Processing failures return an error response but do not crash the process.

### Manual verification checklist
1. Start the server with a valid database and a dummy `STRIPE_WEBHOOK_SECRET` such as `whsec_test`.
2. Generate a signed payload locally with Stripe’s SDK and send it with `curl --data-binary` to `/api/v1/webhooks/stripe`.
3. Confirm the route returns success and a row is written to `stripe_webhook_events`.
4. Replay the exact same event and confirm it is treated as a duplicate without re-finalizing the order.
5. Send the same JSON with an invalid signature and confirm the route rejects it with `400`.
6. Force a downstream processing failure and confirm the event row records `failed` without taking down the process.

## Phase 2 - Reservation and Checkout Expiry Correctness

### Goal
Enforce one checkout TTL and ensure Stripe session expiry, reservation expiry, and cleanup behavior all use the same window.

### Risk being fixed
- TTL currently comes from config but is used as a raw millisecond value without validating Stripe’s `expires_at` constraints.
- Pending-order expiry cleanup is based on `orders.created_at`, while reservation expiry is based on `inventory_reservations.expires_at`; they should be aligned intentionally.
- Late successful payment must remain a manual-attention path, never an automatic stock allocation.

### Files expected
- `src/config/env.ts`
- `src/constants/checkout.ts`
- `src/services/checkout/index.ts`
- `src/services/checkout/helpers.ts`
- `src/jobs/helpers.ts`

### Implementation summary
1. Define one validated checkout TTL source for MVP.
2. Use it for local reservation expiry timestamps.
3. Set Stripe Checkout `expires_at` from the same TTL in Stripe-valid seconds.
4. Ensure cleanup logic expires pending orders on the same effective boundary.
5. Preserve the explicit `paid_needs_attention` path for late successful payments.

### Acceptance criteria
- Local reservation expiry and Stripe Checkout expiry match.
- TTL is rejected at startup if it is invalid for Stripe Checkout.
- Expired pending orders release reservations consistently.
- Late successful webhooks become `paid_needs_attention` instead of `paid`.

### Manual verification checklist
1. Configure a Stripe-valid checkout TTL.
2. Create a checkout session and confirm order reservation expiry and Stripe session expiry line up.
3. Move a reservation past expiry and run the cleanup path.
4. Confirm the order becomes `expired` and reservations are released.
5. Deliver a late successful checkout webhook and confirm the order becomes `paid_needs_attention`.

## Phase 3 - Finalization Trust-Boundary Correctness

### Goal
Only mark orders paid when finalized Stripe data matches server-side expectations, and persist authoritative post-payment customer/address details from Stripe.

### Risk being fixed
- Checkout is currently CAD-only by convention, but finalization does not yet enforce currency and amount invariants before marking the order paid.
- Finalization currently trusts pre-Stripe order address snapshots instead of Stripe-confirmed checkout details.
- Server-side pricing authority must remain intact during webhook finalization.

### Files expected
- `src/services/checkout/index.ts`
- `src/services/checkout/helpers.ts`
- `src/services/webhooks/index.ts`
- `src/db/schema.ts`
- `supabase/migrations/*`

### Implementation summary
1. Enforce CAD-only at finalization time.
2. Validate Stripe subtotal/shipping/total against the server-side order before marking it paid.
3. Persist finalized Stripe customer, shipping, and billing details onto the order/payment record.
4. Keep stale pre-Stripe request payloads out of the final paid-state trust boundary.

### Acceptance criteria
- Non-CAD Stripe sessions are never marked paid.
- Mismatched Stripe totals are never marked paid automatically.
- Paid orders store finalized Stripe customer/address details needed for fulfillment and support.
- Server-side product pricing remains authoritative.

### Manual verification checklist
1. Complete a normal CAD checkout and confirm the order is marked paid.
2. Simulate a Stripe session payload with a mismatched amount and confirm the order becomes `paid_needs_attention` or equivalent safe state.
3. Confirm the saved order uses Stripe-confirmed address/customer details after payment finalization.

## Phase 4 - Admin Cancellation and Inventory Invariants

### Goal
Make unpaid-order cancellation and admin inventory edits preserve sane stock state.

### Risk being fixed
- Admin cancellation currently sets order status but does not guarantee reservations are released atomically.
- Admin inventory edits can currently set `onHand` below `reserved`.
- Kuji prize edits can currently create impossible `initialQuantity` and `remainingQuantity` combinations.

### Files expected
- `src/services/orders/index.ts`
- `src/services/admin/index.ts`
- `src/utils/product.ts`
- `src/db/schema.ts`

### Implementation summary
1. Release unpaid-order reservations atomically when an admin cancels a pending order.
2. Reject standard inventory updates where `onHand < reserved`.
3. Reject kuji prize edits that would create impossible remaining/initial states.
4. Reuse existing transaction and locking patterns already present in checkout and cleanup flows.

### Acceptance criteria
- Cancelling an unpaid order releases active reservations in the same logical operation.
- Standard inventory can never end up with `onHand < reserved`.
- Kuji prize quantities remain internally consistent after admin edits.

### Manual verification checklist
1. Create a pending unpaid order and cancel it through the admin API.
2. Confirm the order becomes `cancelled` and inventory reservations are released.
3. Attempt to set `onHand` below reserved inventory and confirm the request is rejected.
4. Attempt invalid kuji prize quantity edits and confirm the request is rejected.

## Phase 5 - Refund Safety and Minimal Reconciliation

### Goal
Keep Stripe as the source of truth for money movement while making refunds idempotent enough for MVP and recoverable when local state drifts.

### Risk being fixed
- Local refund state currently updates after a Stripe refund call, but the Stripe refund identifier is not persisted for reconciliation.
- Repeated admin refund attempts can create ambiguity during retries or partial failures.
- There is no minimal operator path to reconcile unexpected Stripe-side refund state differences.

### Files expected
- `src/services/orders/index.ts`
- `src/db/schema.ts`
- `supabase/migrations/*`
- `src/routes/v1/admin-router/index.ts`

### Implementation summary
1. Persist Stripe refund identifiers and basic refund metadata needed for reconciliation.
2. Make refund requests idempotent enough for retry safety within current architecture.
3. Add a minimal repo-supported reconciliation or recovery path for Stripe refund drift.
4. Keep scope limited to MVP refund realities, not a finance subsystem.

### Acceptance criteria
- Refund retries do not create unsafe double-local-accounting behavior.
- Local records can be matched back to actual Stripe refunds.
- Operators have a minimal path to repair refund drift safely.

### Manual verification checklist
1. Refund a paid order and confirm Stripe refund identifiers are stored locally.
2. Retry the same refund path and confirm it resolves safely.
3. Simulate local/Stripe refund drift and confirm the documented reconciliation path can repair it.

## Phase 6 - Guest Magic-Link Hardening

### Goal
Preserve one-click guest access while converting the emailed token into a secure long-lived-enough guest session cookie and removing the token from normal request flow.

### Risk being fixed
- Guest order APIs currently accept the raw token on every request from query string or header.
- Token-bearing URLs are more likely to leak into logs, browser history, analytics, or screenshots.
- Stripe session metadata currently carries the raw guest token.

### Files expected
- `src/middleware/guest-order-access.ts`
- `src/routes/v1/orders-router/index.ts`
- `src/config/env.ts`
- `src/services/checkout/index.ts`
- `src/services/checkout/helpers.ts`
- `src/services/notifications/index.ts`
- `src/utils/http-logger.ts`
- `src/utils/logger.ts`
- `src/types/express.ts`

### Implementation summary
1. Keep the emailed link one-click.
2. Treat the emailed token as a login or exchange token, not as a forever bearer token.
3. Add a backend exchange endpoint that verifies the token, sets a secure HttpOnly cookie-based guest session for that order, and redirects to a clean order URL.
4. Move normal order and ticket access to the cookie-backed guest session.
5. Redact token-bearing query strings and headers from logs.
6. Avoid storing plaintext guest tokens in Stripe metadata or snapshots where practical.
7. Keep the guest session long-lived enough for normal users, and document the persistence tradeoff.

### Acceptance criteria
- The emailed link remains one-click for users.
- Successful token exchange sets an HttpOnly cookie and redirects to a clean URL.
- Normal guest API access no longer requires `?token=` or `x-order-token`.
- Token-bearing values are redacted from logs.

### Manual verification checklist
1. Complete a checkout and use the emailed link.
2. Confirm the backend validates the token, sets a guest session cookie, and redirects to a clean order URL.
3. Refresh the order page and fetch tickets without resending the token.
4. Confirm invalid or reused tokens fail safely.
5. Confirm logs do not expose the token.

## Phase 7 - Startup Environment Validation

### Goal
Fail fast with clear startup errors when critical runtime configuration is missing or invalid.

### Risk being fixed
- The app currently defaults many critical values to empty strings and may fail only after traffic hits a runtime path.
- URL and secret configuration required for checkout, webhook, order-token hashing, email, and storage should be validated before boot.

### Files expected
- `src/config/env.ts`
- `src/index.ts`
- `src/integrations/stripe.ts`
- `src/integrations/resend.ts`
- `src/integrations/supabase.ts`
- `src/db/index.ts`

### Implementation summary
1. Validate required env vars at startup.
2. At minimum validate `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `DATABASE_URL`, Supabase credentials, `ORDER_TOKEN_PEPPER`, `RESEND_API_KEY`, and required public/base URLs for redirects and emails.
3. Fail startup with explicit messages.

### Acceptance criteria
- Missing critical configuration prevents startup.
- Error messages identify the invalid or missing configuration clearly.

### Manual verification checklist
1. Unset one required env var at a time.
2. Start the server and confirm startup fails immediately with a clear error.
3. Restore the env var and confirm startup succeeds.

## Phase 8 - Health and Readiness

### Goal
Provide lightweight liveness and readiness endpoints for Render single-instance deployment.

### Risk being fixed
- There is only a basic `/health` endpoint today.
- There is no separate readiness check for database reachability.

### Files expected
- `src/routes/v1/health-router/index.ts`
- `src/index.ts`
- `src/db/index.ts`

### Implementation summary
1. Keep `/health/live` for process liveness.
2. Add `/health/ready` with a lightweight database check.
3. Preserve a simple `/health` response if useful for compatibility.

### Acceptance criteria
- Liveness succeeds whenever the process is running.
- Readiness succeeds only when the database is reachable.
- The checks stay cheap enough for normal platform probing.

### Manual verification checklist
1. Call `/health/live` on a running server and confirm `200`.
2. Call `/health/ready` with a healthy database and confirm `200`.
3. Break database connectivity and confirm `/health/ready` fails.

## Phase 9 - Operational Safety Polish

### Goal
Reduce accidental sensitive-data leakage and make non-fatal external failures easier to operate safely.

### Risk being fixed
- Token-bearing query strings and custom headers are now specifically redacted, but Stripe and email failure logs still need better operator context.
- Stripe and Resend failures should stay non-fatal where business-safe and log enough context for operators.
- `paid_needs_attention` is present but could be easier to inspect or act on with minimal additional support.

### Files expected
- `src/utils/http-logger.ts`
- `src/utils/logger.ts`
- `src/services/webhooks/index.ts`
- `src/services/notifications/index.ts`
- `src/services/orders/index.ts`
- `src/routes/v1/admin-router/index.ts`

### Implementation summary
1. Keep the existing sensitive query/header redaction in place.
2. Tighten non-fatal handling around Stripe and Resend failures with more actionable logs.
3. Keep jobs and webhook processing idempotent and non-fatal.
4. Improve `paid_needs_attention` operability with a safe small-scope admin resolution path.

### Acceptance criteria
- Logs do not expose guest tokens or similar sensitive values.
- External-service failures stay contained and actionable.
- `paid_needs_attention` orders are easier to find or handle operationally.

### Manual verification checklist
1. Exercise checkout, webhook, guest access, and email paths while watching logs.
2. Confirm sensitive tokens are redacted.
3. Simulate Stripe or Resend failures and confirm the process stays up and logs actionable errors.
