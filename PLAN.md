# Production Hardening Plan

## Phase 1 - Fix Stripe Webhook Raw Body Handling

### Goal
Ensure Stripe webhook signature verification works reliably and webhook delivery can finalize orders safely.

### Risk being fixed
- Global JSON parsing currently runs before the webhook route, which can mutate the request body and break Stripe signature verification.
- Duplicate webhook deliveries can race with each other and should not create inconsistent order state.

### Files likely affected
- `src/index.ts`
- `src/routes/v1/index.ts`
- `src/routes/v1/webhooks-router/index.ts`
- `src/services/webhooks/index.ts`

### Implementation steps
1. Mount the Stripe webhook router before global JSON and URL-encoded middleware.
2. Apply `express.raw({ type: 'application/json' })` on the Stripe webhook route.
3. Keep the raw request body as a `Buffer` all the way into `stripe.webhooks.constructEvent(...)`.
4. Make duplicate webhook deliveries safe by avoiding duplicate event-row insert failures and short-circuiting already-processed events.
5. Ensure webhook processing failures are recorded without crashing the process.

### Acceptance criteria
- Stripe webhook signature verification uses the untouched raw request body.
- Global JSON middleware does not affect `/api/v1/webhooks/stripe`.
- Duplicate `checkout.session.completed` deliveries do not corrupt order state.
- Orders can finalize through the webhook flow.

### Manual verification checklist
1. Start the server with a dummy `STRIPE_WEBHOOK_SECRET`, for example `whsec_test`, plus valid local database configuration.
2. Generate a signed test payload locally with Stripe's SDK using `stripe.webhooks.generateTestHeaderString(...)` and send it with `curl --data-binary` to `/api/v1/webhooks/stripe`.
3. Confirm the webhook returns `200` and the event is recorded in `stripe_webhook_events`.
4. Replay the exact same payload and signature a second time and confirm the request still returns `200` and is treated as a duplicate.
5. Send the same JSON payload through normal `-d` JSON handling with an invalid signature and confirm the route rejects it with `400`.

## Phase 2 - Align Reservation TTL with Stripe Session Expiry

### Goal
Prevent Stripe from accepting payment after local inventory reservations have expired.

### Risk being fixed
- Reservation expiry is currently split between environment config and a hardcoded ten-minute cleanup rule.
- Stripe session expiry is not explicitly aligned with local reservation expiry, which can allow late payment against expired stock.

### Files likely affected
- `src/config/env.ts`
- `src/constants/checkout.ts`
- `src/services/checkout/index.ts`
- `src/services/checkout/helpers.ts`
- `src/jobs/helpers.ts`

### Implementation steps
1. Define a single reservation TTL constant sourced from config.
2. Use that TTL for local `expiresAt` reservation timestamps.
3. Set Stripe Checkout `expires_at` from the same TTL.
4. Replace hardcoded pending-order expiry windows with the shared TTL.
5. Ensure late webhook finalization routes the order to `paid_needs_attention` instead of auto-accepting it.

### Acceptance criteria
- Reservation expiry and Stripe Checkout expiry match exactly.
- Expired orders are not auto-finalized as paid.
- Inventory is not double-sold because of mismatched expiry windows.

### Manual verification checklist
1. Set the shared checkout TTL to a valid Stripe value, such as 30 minutes.
2. Create a checkout session and confirm the order reservation `expires_at` matches the Stripe session expiry.
3. For local simulation, manually move the reservation `expires_at` into the past in the database and run the cleanup job path.
4. Confirm the order becomes `expired` and reservations are released.
5. Deliver a simulated late `checkout.session.completed` webhook and confirm the order moves to `paid_needs_attention`.

## Phase 3 - Add Idempotent Checkout Creation

### Goal
Prevent duplicate orders and duplicate Stripe Checkout sessions during retries.

### Risk being fixed
- The current checkout flow creates a new order and a new Stripe session on every request.
- Double-submit and network retry scenarios can create duplicate pending orders.

### Files likely affected
- `src/routes/v1/checkout-router/index.ts`
- `src/schemas/checkout.ts`
- `src/services/checkout/index.ts`
- `src/services/checkout/helpers.ts`
- `src/db/schema.ts`
- `supabase/migrations/*`

### Implementation steps
1. Accept a checkout idempotency key from the request contract or header without breaking the existing API shape more than necessary.
2. Persist that key on the order or payment record with a uniqueness guarantee.
3. Reuse an existing pending order and Stripe session when the same key is replayed.
4. Pass the same idempotency key through to Stripe session creation.
5. Keep error handling safe so a failed Stripe call does not leave an idempotency key pointing at a broken paid state.

### Acceptance criteria
- Repeating the same checkout request with the same idempotency key returns the original pending checkout session.
- A double-click does not create duplicate orders.
- Stripe does not receive duplicate session creations for the same idempotent attempt.

### Manual verification checklist
1. Submit the same checkout payload twice with the same idempotency key.
2. Confirm both responses point to the same order and Stripe session.
3. Repeat with a different idempotency key and confirm a new order is created.
4. Simulate a client retry after a timeout and confirm no duplicate pending orders exist.

## Phase 4 - Fix Inventory Lock Ordering and Race Conditions

### Goal
Prevent deadlocks and inventory corruption during checkout, expiry, and payment finalization.

### Risk being fixed
- Checkout currently locks product inventory in request item order, which can deadlock under concurrent carts.
- Reservation conversion and cleanup can contend for the same inventory rows.

### Files likely affected
- `src/services/checkout/index.ts`
- `src/services/checkout/helpers.ts`
- `src/jobs/helpers.ts`

### Implementation steps
1. Lock inventory rows in deterministic product-id order during checkout.
2. Keep reservation creation and inventory reserve increments inside the same transaction.
3. Ensure reservation conversion and expiration release follow the same lock order.
4. Guard cleanup and webhook finalization against conflicting updates on the same order and inventory rows.

### Acceptance criteria
- Concurrent checkout attempts do not deadlock because of lock-order inversion.
- Inventory counters never become negative.
- Cleanup and payment finalization do not double-release or double-convert reservations.

### Manual verification checklist
1. Prepare two carts containing the same products in opposite order.
2. Submit both checkout requests at nearly the same time.
3. Confirm both requests resolve without hanging and inventory remains valid.
4. Repeat while running the expiry cleanup path and confirm no negative inventory appears.

## Phase 5 - Harden Admin Order Operations

### Goal
Prevent admin actions from breaking payment, refund, and inventory invariants.

### Risk being fixed
- Admin order status updates currently expose a generic status patch path, which can allow disallowed operational behavior even if transitions exist.
- Refund handling should only change local state after Stripe confirms the refund.

### Files likely affected
- `src/routes/v1/admin-router/index.ts`
- `src/services/orders/index.ts`
- `src/constants/order-status.ts`
- `src/schemas/admin.ts`

### Implementation steps
1. Restrict admin status operations to the allowed business actions for MVP.
2. Explicitly block any admin path that could mark an unpaid order as paid.
3. Keep refund execution Stripe-first and local-state-second.
4. Preserve atomic local updates after a successful Stripe refund response.
5. Enforce the no-refund-after-reveal rule for Kuji tickets.

### Acceptance criteria
- Admins cannot manually mark orders paid.
- Refunds cannot bypass Stripe.
- Admin actions cannot create impossible order or payment states.

### Manual verification checklist
1. Attempt to move a `pending_payment` order to `paid` from the admin API and confirm rejection.
2. Refund a valid paid order and confirm Stripe is called before local status changes.
3. Attempt to refund an order with revealed Kuji tickets and confirm rejection.
4. Cancel an unpaid order and confirm it stays unpaid and inventory is consistent.

## Phase 6 - Fix Late Payment Handling

### Goal
Handle payments that arrive after expiration without silently accepting the order.

### Risk being fixed
- A completed Stripe payment can arrive after local expiry and must not automatically consume stock.
- Late success currently relies on generic error handling rather than an explicit late-payment path.

### Files likely affected
- `src/services/checkout/helpers.ts`
- `src/services/webhooks/index.ts`
- `src/jobs/helpers.ts`

### Implementation steps
1. Detect webhook finalization for expired or otherwise non-finalizable orders.
2. Move those orders to `paid_needs_attention`.
3. Do not convert or re-create inventory reservations for late payments.
4. Preserve Stripe payment details for manual follow-up.

### Acceptance criteria
- Late payments never auto-allocate stock.
- Late payments are visible as `paid_needs_attention`.

### Manual verification checklist
1. Expire a pending order locally.
2. Deliver a simulated successful checkout webhook afterward.
3. Confirm the order becomes `paid_needs_attention`.
4. Confirm inventory is not reduced and reservations remain released.

## Phase 7 - Environment Validation

### Goal
Fail fast when critical production secrets are missing.

### Risk being fixed
- The server can start with empty critical configuration values and fail later in checkout, webhook, auth, or email flows.

### Files likely affected
- `src/config/env.ts`
- `src/index.ts`
- `src/integrations/stripe.ts`
- `src/integrations/resend.ts`
- `src/integrations/supabase.ts`
- `src/db/index.ts`

### Implementation steps
1. Add startup validation for required production-critical environment variables.
2. Validate `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `DATABASE_URL`, Supabase credentials, `ORDER_TOKEN_PEPPER`, and `RESEND_API_KEY`.
3. Fail startup with a clear error when required config is missing.

### Acceptance criteria
- The server refuses to start when critical secrets are absent.
- Startup errors clearly identify the missing configuration.

### Manual verification checklist
1. Unset one required variable at a time.
2. Start the server.
3. Confirm startup fails immediately with a clear error message.
4. Restore the variable and confirm startup succeeds again.

## Phase 8 - Health and Readiness Checks

### Goal
Improve operational visibility for deploys and runtime checks.

### Risk being fixed
- There is only a basic `/health` endpoint today.
- There is no dedicated readiness check for database connectivity.

### Files likely affected
- `src/routes/v1/health-router/index.ts`
- `src/index.ts`
- `src/db/index.ts`

### Implementation steps
1. Add `/health/live` for basic process liveness.
2. Add `/health/ready` that verifies database connectivity.
3. Keep the checks lightweight and compatible with Render.

### Acceptance criteria
- Liveness returns success when the process is running.
- Readiness fails when the database is unavailable and succeeds when it is healthy.

### Manual verification checklist
1. Call `/health/live` on a running server and confirm `200`.
2. Call `/health/ready` with a healthy database and confirm `200`.
3. Stop database connectivity or misconfigure `DATABASE_URL` and confirm `/health/ready` fails.

## Phase 9 - Operational Safety Improvements

### Goal
Improve production stability without changing the system architecture.

### Risk being fixed
- Request logs can expose sensitive guest order tokens in query strings.
- External-service failures need tighter containment.
- Background cleanup and webhook processing should remain idempotent and non-fatal.

### Files likely affected
- `src/utils/http-logger.ts`
- `src/utils/logger.ts`
- `src/services/notifications/index.ts`
- `src/services/orders/index.ts`
- `src/services/webhooks/index.ts`
- `src/jobs/index.ts`
- `src/jobs/helpers.ts`

### Implementation steps
1. Redact sensitive query parameters such as guest access tokens from request logs.
2. Tighten external-service error handling for Stripe, Resend, and webhook processing.
3. Review cleanup job behavior for idempotency under retries.
4. Ensure webhook failures are logged and surfaced without crashing the server.

### Acceptance criteria
- Sensitive request parameters are not emitted to logs.
- External-service failures do not take down the process.
- Retried jobs and retried webhooks remain safe.

### Manual verification checklist
1. Hit a guest order URL containing a token and confirm the token is redacted in logs.
2. Simulate Stripe or Resend failures and confirm the server stays up.
3. Re-run cleanup paths and confirm repeated execution does not corrupt state.
