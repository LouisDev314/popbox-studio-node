ALTER TABLE public.orders
    ADD COLUMN IF NOT EXISTS checkout_idempotency_key varchar(255);

CREATE UNIQUE INDEX IF NOT EXISTS orders_checkout_idempotency_key_unique
    ON public.orders (checkout_idempotency_key);
