-- ============================================================================
-- PopBox Studio - Initial schema migration
-- Combined initial state from core schema + legal documents + FAQ content tables
-- Target: Supabase/Postgres (assumes auth.users exists)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('admin', 'customer');
CREATE TYPE product_type AS ENUM ('standard', 'kuji');
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE inventory_reservation_status AS ENUM ('active', 'converted', 'expired', 'released');
CREATE TYPE order_status AS ENUM (
  'pending_payment',
  'paid',
  'packed',
  'shipped',
  'cancelled',
  'refunded',
  'paid_needs_attention',
  'expired'
);
CREATE TYPE payment_provider AS ENUM ('stripe');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE webhook_status AS ENUM ('received', 'processed', 'failed');
CREATE TYPE legal_document_type AS ENUM ('faq', 'shipping_returns', 'terms', 'privacy');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Keep public.users aligned with Supabase auth.users ids.
CREATE TABLE public.users (
                              id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
                              email varchar(320) NOT NULL UNIQUE,
                              role user_role NOT NULL DEFAULT 'customer',
                              created_at timestamptz NOT NULL DEFAULT now(),
                              updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.customers (
                                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
                                  email varchar(320) NOT NULL UNIQUE,
                                  first_name varchar(120),
                                  last_name varchar(120),
                                  phone varchar(40),
                                  created_at timestamptz NOT NULL DEFAULT now(),
                                  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.addresses (
                                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                  customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
                                  full_name varchar(200) NOT NULL,
                                  line1 varchar(200) NOT NULL,
                                  line2 varchar(200),
                                  city varchar(120) NOT NULL,
                                  province varchar(120) NOT NULL,
                                  postal_code varchar(32) NOT NULL,
                                  country_code varchar(2) NOT NULL DEFAULT 'CA',
                                  phone varchar(40),
                                  created_at timestamptz NOT NULL DEFAULT now(),
                                  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.collections (
                                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                    name varchar(160) NOT NULL,
                                    slug varchar(180) NOT NULL UNIQUE,
                                    description text,
                                    sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
                                    is_active boolean NOT NULL DEFAULT true,
                                    created_at timestamptz NOT NULL DEFAULT now(),
                                    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tags (
                             id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                             name varchar(160) NOT NULL,
                             slug varchar(180) NOT NULL UNIQUE,
                             tag_type varchar(64) NOT NULL,
                             created_at timestamptz NOT NULL DEFAULT now(),
                             updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.products (
                                 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                 collection_id uuid REFERENCES public.collections(id) ON DELETE SET NULL,
                                 name varchar(200) NOT NULL,
                                 slug varchar(220) NOT NULL UNIQUE,
                                 description text,
                                 product_type product_type NOT NULL DEFAULT 'standard',
                                 status product_status NOT NULL DEFAULT 'draft',
                                 price_cents integer NOT NULL CHECK (price_cents >= 0),
                                 currency varchar(3) NOT NULL DEFAULT 'CAD',
                                 sku varchar(120) UNIQUE,
                                 search_vector tsvector NOT NULL DEFAULT ''::tsvector,
                                 created_at timestamptz NOT NULL DEFAULT now(),
                                 updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.product_tags (
                                     product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
                                     tag_id uuid NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
                                     created_at timestamptz NOT NULL DEFAULT now(),
                                     CONSTRAINT product_tags_pk PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE public.product_images (
                                       id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                       product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
                                       storage_key varchar(255) NOT NULL,
                                       sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
                                       alt_text varchar(255),
                                       created_at timestamptz NOT NULL DEFAULT now(),
                                       updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.product_inventory (
                                          product_id uuid PRIMARY KEY REFERENCES public.products(id) ON DELETE CASCADE,
                                          on_hand integer NOT NULL DEFAULT 0 CHECK (on_hand >= 0),
                                          reserved integer NOT NULL DEFAULT 0 CHECK (reserved >= 0),
                                          low_stock_threshold integer NOT NULL DEFAULT 0 CHECK (low_stock_threshold >= 0),
                                          created_at timestamptz NOT NULL DEFAULT now(),
                                          updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.orders (
                               id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                               public_id varchar(40) NOT NULL UNIQUE,
                               customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
                               status order_status NOT NULL DEFAULT 'pending_payment',
                               currency varchar(3) NOT NULL DEFAULT 'CAD',
                               subtotal_cents integer NOT NULL DEFAULT 0 CHECK (subtotal_cents >= 0),
                               tax_cents integer NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
                               shipping_cents integer NOT NULL DEFAULT 0 CHECK (shipping_cents >= 0),
                               total_cents integer NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
                               stripe_checkout_session_id varchar(255) UNIQUE,
                               stripe_payment_intent_id varchar(255),
                               checkout_idempotency_key varchar(255),
                               customer_details_json jsonb,
                               shipping_address_json jsonb NOT NULL,
                               billing_address_json jsonb,
                               guest_access_token_hash varchar(255),
                               confirmation_email_sent_at timestamptz,
                               confirmation_email_error text,
                               includes_last_one_prize boolean NOT NULL DEFAULT false,
                               placed_at timestamptz,
                               paid_at timestamptz,
                               cancelled_at timestamptz,
                               refunded_at timestamptz,
                               created_at timestamptz NOT NULL DEFAULT now(),
                               updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.inventory_reservations (
                                               id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                               order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
                                               product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
                                               quantity integer NOT NULL CHECK (quantity > 0),
                                               status inventory_reservation_status NOT NULL DEFAULT 'active',
                                               expires_at timestamptz NOT NULL,
                                               created_at timestamptz NOT NULL DEFAULT now(),
                                               updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.kuji_prizes (
                                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                    product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
                                    prize_code varchar(64) NOT NULL,
                                    name varchar(200) NOT NULL,
                                    description text,
                                    image_url varchar(500),
                                    initial_quantity integer NOT NULL CHECK (initial_quantity >= 0),
                                    remaining_quantity integer NOT NULL CHECK (remaining_quantity >= 0),
                                    sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
                                    created_at timestamptz NOT NULL DEFAULT now(),
                                    updated_at timestamptz NOT NULL DEFAULT now(),
                                    CONSTRAINT kuji_prizes_product_code_unique UNIQUE (product_id, prize_code)
);

CREATE TABLE public.order_items (
                                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                    order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
                                    product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
                                    product_name varchar(200) NOT NULL,
                                    product_type product_type NOT NULL,
                                    unit_price_cents integer NOT NULL CHECK (unit_price_cents >= 0),
                                    quantity integer NOT NULL CHECK (quantity > 0),
                                    line_total_cents integer NOT NULL CHECK (line_total_cents >= 0),
                                    metadata jsonb,
                                    created_at timestamptz NOT NULL DEFAULT now(),
                                    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.payments (
                                 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                 order_id uuid NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
                                 provider payment_provider NOT NULL DEFAULT 'stripe',
                                 provider_payment_intent_id varchar(255) UNIQUE,
                                 provider_checkout_session_id varchar(255) UNIQUE,
                                 amount_cents integer NOT NULL CHECK (amount_cents >= 0),
                                 refunded_amount_cents integer NOT NULL DEFAULT 0,
                                 currency varchar(3) NOT NULL DEFAULT 'CAD',
                                 status payment_status NOT NULL DEFAULT 'pending',
                                 raw_response jsonb,
                                 created_at timestamptz NOT NULL DEFAULT now(),
                                 updated_at timestamptz NOT NULL DEFAULT now(),
                                 CONSTRAINT payments_refunded_amount_cents_check CHECK (refunded_amount_cents >= 0),
                                 CONSTRAINT payments_refunded_amount_not_exceed_amount_check CHECK (refunded_amount_cents <= amount_cents)
);

CREATE TABLE public.payment_refunds (
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

CREATE TABLE public.tickets (
                                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
                                order_item_id uuid NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
                                customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
                                kuji_product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
                                kuji_prize_id uuid NOT NULL REFERENCES public.kuji_prizes(id) ON DELETE RESTRICT,
                                ticket_number varchar(64) NOT NULL UNIQUE,
                                revealed_at timestamptz,
                                voided_at timestamptz,
                                void_reason varchar(255),
                                created_at timestamptz NOT NULL DEFAULT now(),
                                updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.shipments (
                                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                  order_id uuid NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
                                  carrier_name varchar(120),
                                  tracking_number varchar(120),
                                  tracking_url varchar(500),
                                  shipped_at timestamptz,
                                  delivered_at timestamptz,
                                  created_at timestamptz NOT NULL DEFAULT now(),
                                  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.stripe_webhook_events (
                                              id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                              stripe_event_id varchar(255) NOT NULL UNIQUE,
                                              event_type varchar(160) NOT NULL,
                                              processed_at timestamptz,
                                              status webhook_status NOT NULL DEFAULT 'received',
                                              payload jsonb NOT NULL,
                                              error_message text,
                                              created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.legal_documents (
                                        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                        type legal_document_type NOT NULL,
                                        content text NOT NULL,
                                        version integer NOT NULL,
                                        is_active boolean NOT NULL DEFAULT true,
                                        created_at timestamptz NOT NULL DEFAULT now(),
                                        updated_at timestamptz NOT NULL DEFAULT now(),
                                        CONSTRAINT legal_documents_version_check CHECK (version > 0)
);

CREATE TABLE public.faq_items (
                                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                  question text NOT NULL,
                                  answer text NOT NULL,
                                  category varchar(120),
                                  sort_order integer NOT NULL DEFAULT 0,
                                  is_published boolean NOT NULL DEFAULT false,
                                  created_at timestamptz NOT NULL DEFAULT now(),
                                  updated_at timestamptz NOT NULL DEFAULT now(),
                                  CONSTRAINT faq_items_sort_order_check CHECK (sort_order >= 0)
);

CREATE TABLE public.store_settings (
                                       key text PRIMARY KEY,
                                       value jsonb NOT NULL,
                                       updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX customers_user_id_idx ON public.customers (user_id);
CREATE INDEX customers_created_at_idx ON public.customers (created_at DESC, id DESC);

CREATE INDEX addresses_customer_id_idx ON public.addresses (customer_id, created_at DESC);

CREATE INDEX collections_active_sort_idx ON public.collections (is_active, sort_order, id);

CREATE INDEX tags_tag_type_idx ON public.tags (tag_type, name);

CREATE INDEX products_status_created_idx ON public.products (status, created_at DESC, id DESC);
CREATE INDEX products_collection_status_created_idx ON public.products (collection_id, status, created_at DESC, id DESC);
CREATE INDEX products_type_status_created_idx ON public.products (product_type, status, created_at DESC, id DESC);

CREATE INDEX product_tags_tag_id_idx ON public.product_tags (tag_id, product_id);

CREATE INDEX product_images_product_sort_idx ON public.product_images (product_id, sort_order, id);

CREATE INDEX product_inventory_on_hand_idx ON public.product_inventory (on_hand, reserved);

CREATE INDEX orders_customer_created_idx ON public.orders (customer_id, created_at DESC, id DESC);
CREATE INDEX orders_status_created_idx ON public.orders (status, created_at DESC, id DESC);
CREATE INDEX orders_placed_at_idx ON public.orders (placed_at DESC, id DESC);
CREATE UNIQUE INDEX orders_checkout_idempotency_key_unique
    ON public.orders (checkout_idempotency_key);

CREATE INDEX inventory_reservations_order_id_idx ON public.inventory_reservations (order_id, status);
CREATE INDEX inventory_reservations_product_id_idx ON public.inventory_reservations (product_id, status);
CREATE INDEX inventory_reservations_status_expires_idx ON public.inventory_reservations (status, expires_at, id);

CREATE INDEX kuji_prizes_product_sort_idx ON public.kuji_prizes (product_id, sort_order, id);
CREATE INDEX kuji_prizes_product_remaining_idx ON public.kuji_prizes (product_id, remaining_quantity DESC, id);

CREATE INDEX order_items_order_id_idx ON public.order_items (order_id, id);
CREATE INDEX order_items_product_id_idx ON public.order_items (product_id, created_at DESC);

CREATE UNIQUE INDEX payment_refunds_provider_refund_id_unique
    ON public.payment_refunds (provider_refund_id);
CREATE UNIQUE INDEX payment_refunds_idempotency_key_unique
    ON public.payment_refunds (idempotency_key);
CREATE INDEX payment_refunds_payment_created_idx
    ON public.payment_refunds (payment_id, created_at, id);
CREATE INDEX payment_refunds_order_created_idx
    ON public.payment_refunds (order_id, created_at, id);

CREATE INDEX tickets_order_id_idx ON public.tickets (order_id, created_at DESC, id DESC);
CREATE INDEX tickets_order_item_id_idx ON public.tickets (order_item_id, created_at DESC);
CREATE INDEX tickets_customer_id_idx ON public.tickets (customer_id, created_at DESC);
CREATE INDEX tickets_kuji_product_id_idx ON public.tickets (kuji_product_id, created_at DESC);
CREATE INDEX tickets_order_revealed_idx ON public.tickets (order_id, revealed_at, created_at DESC);

CREATE INDEX shipments_tracking_number_idx ON public.shipments (tracking_number);

CREATE INDEX stripe_webhook_events_status_created_idx
    ON public.stripe_webhook_events (status, created_at DESC);

CREATE INDEX products_search_vector_gin_idx
    ON public.products USING GIN (search_vector);

CREATE INDEX products_name_trgm_gin_idx
    ON public.products USING GIN (name gin_trgm_ops);

CREATE UNIQUE INDEX legal_documents_type_version_unique
    ON public.legal_documents (type, version);
CREATE UNIQUE INDEX legal_documents_one_active_per_type_unique
    ON public.legal_documents (type)
    WHERE is_active = true;
CREATE INDEX legal_documents_type_active_idx
    ON public.legal_documents (type, is_active);
CREATE INDEX legal_documents_type_created_at_idx
    ON public.legal_documents (type, created_at DESC);

CREATE INDEX faq_items_published_sort_idx
    ON public.faq_items (is_published, sort_order, created_at, id);
CREATE INDEX faq_items_category_sort_idx
    ON public.faq_items (category, sort_order, created_at, id);

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

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.refresh_product_search_vector(target_product_id uuid)
RETURNS void AS $$
BEGIN
UPDATE public.products AS p
SET search_vector =
        setweight(to_tsvector('simple', coalesce(p.name, '')), 'A') ||
        setweight(
                to_tsvector(
                        'simple',
                        coalesce(
                                (
                                    SELECT string_agg(t.name, ' ')
                                    FROM public.product_tags pt
                                             JOIN public.tags t ON t.id = pt.tag_id
                                    WHERE pt.product_id = p.id
                                ),
                                ''
                        )
                ),
                'B'
        ) ||
        setweight(to_tsvector('english', coalesce(p.description, '')), 'C')
WHERE p.id = target_product_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.refresh_product_search_vector_from_products()
RETURNS trigger AS $$
BEGIN
  PERFORM public.refresh_product_search_vector(coalesce(NEW.id, OLD.id));
RETURN coalesce(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.refresh_product_search_vector_from_product_tags()
RETURNS trigger AS $$
BEGIN
  PERFORM public.refresh_product_search_vector(coalesce(NEW.product_id, OLD.product_id));
RETURN coalesce(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.refresh_product_search_vector_from_tags()
RETURNS trigger AS $$
BEGIN
UPDATE public.products p
SET updated_at = p.updated_at
WHERE EXISTS (
    SELECT 1
    FROM public.product_tags pt
    WHERE pt.product_id = p.id
      AND pt.tag_id = coalesce(NEW.id, OLD.id)
);

PERFORM public.refresh_product_search_vector(pt.product_id)
  FROM public.product_tags pt
  WHERE pt.tag_id = coalesce(NEW.id, OLD.id);

RETURN coalesce(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.sync_auth_user_to_public_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IS NULL THEN
    RETURN NEW;
END IF;

INSERT INTO public.users (id, email)
VALUES (NEW.id, NEW.email)
    ON CONFLICT (id)
  DO UPDATE SET
    email = EXCLUDED.email,
             updated_at = now();

RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_kuji_inventory_on_hand_for_product(p_product_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
v_is_kuji boolean;
  v_on_hand integer;
BEGIN
  IF p_product_id IS NULL THEN
    RETURN;
END IF;

SELECT EXISTS (
    SELECT 1
    FROM public.products p
    WHERE p.id = p_product_id
      AND p.product_type = 'kuji'
)
INTO v_is_kuji;

IF NOT COALESCE(v_is_kuji, false) THEN
    RETURN;
END IF;

SELECT COALESCE(SUM(kp.remaining_quantity), 0)
INTO v_on_hand
FROM public.kuji_prizes kp
WHERE kp.product_id = p_product_id
  AND UPPER(BTRIM(kp.prize_code)) <> 'LO';

INSERT INTO public.product_inventory (
    product_id,
    on_hand,
    reserved,
    low_stock_threshold,
    created_at,
    updated_at
)
VALUES (
           p_product_id,
           v_on_hand,
           0,
           0,
           now(),
           now()
       )
    ON CONFLICT (product_id)
  DO UPDATE SET
    on_hand = EXCLUDED.on_hand,
             updated_at = CASE
             WHEN public.product_inventory.on_hand IS DISTINCT FROM EXCLUDED.on_hand THEN now()
             ELSE public.product_inventory.updated_at
END;
END;
$$;

CREATE OR REPLACE FUNCTION public.trg_sync_kuji_inventory_on_hand()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM public.sync_kuji_inventory_on_hand_for_product(NEW.product_id);
RETURN NEW;
ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.product_id IS DISTINCT FROM NEW.product_id THEN
      PERFORM public.sync_kuji_inventory_on_hand_for_product(OLD.product_id);
END IF;

    PERFORM public.sync_kuji_inventory_on_hand_for_product(NEW.product_id);
RETURN NEW;
ELSIF TG_OP = 'DELETE' THEN
    PERFORM public.sync_kuji_inventory_on_hand_for_product(OLD.product_id);
RETURN OLD;
END IF;

RETURN NULL;
END;
$$;

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================

CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER customers_set_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER addresses_set_updated_at
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER collections_set_updated_at
    BEFORE UPDATE ON public.collections
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tags_set_updated_at
    BEFORE UPDATE ON public.tags
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER products_set_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER product_images_set_updated_at
    BEFORE UPDATE ON public.product_images
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER product_inventory_set_updated_at
    BEFORE UPDATE ON public.product_inventory
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER orders_set_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER inventory_reservations_set_updated_at
    BEFORE UPDATE ON public.inventory_reservations
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER kuji_prizes_set_updated_at
    BEFORE UPDATE ON public.kuji_prizes
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER order_items_set_updated_at
    BEFORE UPDATE ON public.order_items
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER payments_set_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER payment_refunds_set_updated_at
    BEFORE UPDATE ON public.payment_refunds
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER tickets_set_updated_at
    BEFORE UPDATE ON public.tickets
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER shipments_set_updated_at
    BEFORE UPDATE ON public.shipments
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER legal_documents_set_updated_at
    BEFORE UPDATE ON public.legal_documents
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER faq_items_set_updated_at
    BEFORE UPDATE ON public.faq_items
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS store_settings_set_updated_at ON public.store_settings;
CREATE TRIGGER store_settings_set_updated_at
    BEFORE UPDATE ON public.store_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- SEARCH VECTOR TRIGGERS
-- ============================================================================

CREATE TRIGGER products_refresh_search_vector_trg
    AFTER INSERT OR UPDATE OF name, description ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.refresh_product_search_vector_from_products();

CREATE TRIGGER product_tags_refresh_search_vector_trg
    AFTER INSERT OR UPDATE OR DELETE ON public.product_tags
    FOR EACH ROW
    EXECUTE FUNCTION public.refresh_product_search_vector_from_product_tags();

CREATE TRIGGER tags_refresh_search_vector_trg
    AFTER UPDATE OF name ON public.tags
    FOR EACH ROW
    EXECUTE FUNCTION public.refresh_product_search_vector_from_tags();

-- ============================================================================
-- AUTH SYNC TRIGGER
-- ============================================================================

CREATE TRIGGER auth_users_sync_public_users_trg
    AFTER INSERT OR UPDATE OF email ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_auth_user_to_public_users();

-- ============================================================================
-- KUJI INVENTORY SYNC TRIGGER
-- ============================================================================

CREATE TRIGGER kuji_prizes_sync_inventory_on_hand
    AFTER INSERT OR UPDATE OF product_id, prize_code, remaining_quantity OR DELETE
                    ON public.kuji_prizes
                        FOR EACH ROW
                        EXECUTE FUNCTION public.trg_sync_kuji_inventory_on_hand();

-- ============================================================================
-- BACKFILL / INITIALIZE
-- ============================================================================


-- Store-level settings for backend-owned configuration.
INSERT INTO public.store_settings (key, value)
VALUES (
           'shipping',
           '{"flatShippingCents": 1200, "freeShippingThresholdCents": 14900, "currency": "CAD"}'::jsonb
       )
    ON CONFLICT (key) DO NOTHING;

-- Storefront utility banner settings, using multi-item format.
INSERT INTO public.store_settings (key, value)
VALUES (
           'store_banner',
           '{
             "enabled": true,
             "items": [
               {
                 "id": "00000000-0000-4000-8000-000000000001",
                 "message": "Free shipping across Canada on orders $149+ CAD · Otherwise flat rate $15.99",
                 "linkLabel": "Shipping details",
                 "linkHref": "/legal/shipping-returns",
                 "sortOrder": 0,
                 "isActive": true
               }
             ]
           }'::jsonb
       )
    ON CONFLICT (key) DO NOTHING;

-- Migrate old single-message banner shape into the new multi-item shape.
UPDATE public.store_settings
SET value = jsonb_build_object(
        'enabled',
        CASE
            WHEN jsonb_typeof(value -> 'enabled') = 'boolean' THEN (value ->> 'enabled')::boolean
            ELSE true
            END,
        'items',
        CASE
            WHEN btrim(coalesce(value ->> 'message', '')) = '' THEN '[]'::jsonb
            ELSE jsonb_build_array(
                    jsonb_build_object(
                            'id',
                            gen_random_uuid()::text,
                            'message',
                            btrim(value ->> 'message'),
                            'linkLabel',
                            nullif(btrim(coalesce(value ->> 'linkLabel', '')), ''),
                            'linkHref',
                            nullif(btrim(coalesce(value ->> 'linkHref', '')), ''),
                            'sortOrder',
                            0,
                            'isActive',
                            true
                    )
                 )
            END
            )
WHERE key = 'store_banner'
  AND value ? 'message'
  AND NOT value ? 'items';

INSERT INTO public.users (id, email)
SELECT id, email
FROM auth.users
WHERE email IS NOT NULL
    ON CONFLICT (id)
DO UPDATE SET
    email = EXCLUDED.email,
           updated_at = now();

SELECT public.refresh_product_search_vector(id)
FROM public.products;

INSERT INTO public.product_inventory (
    product_id,
    on_hand,
    reserved,
    low_stock_threshold,
    created_at,
    updated_at
)
SELECT
    p.id AS product_id,
    COALESCE(
            SUM(
                    CASE
                        WHEN UPPER(BTRIM(kp.prize_code)) <> 'LO' THEN kp.remaining_quantity
                        ELSE 0
                        END
            ),
            0
    ) AS on_hand,
    0 AS reserved,
    0 AS low_stock_threshold,
    now() AS created_at,
    now() AS updated_at
FROM public.products p
         LEFT JOIN public.kuji_prizes kp
                   ON kp.product_id = p.id
WHERE p.product_type = 'kuji'
GROUP BY p.id
    ON CONFLICT (product_id)
DO UPDATE SET
    on_hand = EXCLUDED.on_hand,
           updated_at = CASE
           WHEN public.product_inventory.on_hand IS DISTINCT FROM EXCLUDED.on_hand THEN now()
           ELSE public.product_inventory.updated_at
END;

-- ============================================================================
-- ORDERS NOTIFICATION COLUMNS (post-schema patch)
-- ============================================================================

ALTER TABLE public.orders
    ADD COLUMN IF NOT EXISTS order_notification_sent_at timestamptz,
    ADD COLUMN IF NOT EXISTS order_notification_error text;
