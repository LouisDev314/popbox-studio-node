ALTER TABLE public.orders
    ADD COLUMN IF NOT EXISTS customer_details_json jsonb;
