CREATE TABLE IF NOT EXISTS public.payment_refunds (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id uuid NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
    order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    provider_refund_id varchar(255) NOT NULL,
    idempotency_key varchar(255),
    amount_cents integer NOT NULL CHECK (amount_cents >= 0),
    currency varchar(3) NOT NULL DEFAULT 'CAD',
    status varchar(64) NOT NULL,
    reason varchar(255),
    provider_created_at timestamptz,
    raw_response jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS payment_refunds_provider_refund_id_unique
    ON public.payment_refunds (provider_refund_id);

CREATE UNIQUE INDEX IF NOT EXISTS payment_refunds_idempotency_key_unique
    ON public.payment_refunds (idempotency_key);

CREATE INDEX IF NOT EXISTS payment_refunds_payment_created_idx
    ON public.payment_refunds (payment_id, created_at, id);

CREATE INDEX IF NOT EXISTS payment_refunds_order_created_idx
    ON public.payment_refunds (order_id, created_at, id);
