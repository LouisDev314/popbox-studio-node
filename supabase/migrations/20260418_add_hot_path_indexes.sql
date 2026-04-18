CREATE INDEX IF NOT EXISTS products_status_price_asc_idx
  ON public.products (status, price_cents ASC, id DESC);

CREATE INDEX IF NOT EXISTS products_status_price_desc_idx
  ON public.products (status, price_cents DESC, id DESC);

CREATE INDEX IF NOT EXISTS products_status_name_asc_idx
  ON public.products (status, name ASC, id DESC);

CREATE INDEX IF NOT EXISTS products_status_name_desc_idx
  ON public.products (status, name DESC, id DESC);

CREATE INDEX IF NOT EXISTS products_updated_idx
  ON public.products (updated_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS orders_created_idx
  ON public.orders (created_at DESC, id DESC);
