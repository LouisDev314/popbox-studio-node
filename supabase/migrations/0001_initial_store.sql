CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'customer');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_type') THEN
    CREATE TYPE product_type AS ENUM ('standard', 'kuji');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status') THEN
    CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'inventory_reservation_status') THEN
    CREATE TYPE inventory_reservation_status AS ENUM ('active', 'converted', 'expired', 'released');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
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
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_provider') THEN
    CREATE TYPE payment_provider AS ENUM ('stripe');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'webhook_status') THEN
    CREATE TYPE webhook_status AS ENUM ('received', 'processed', 'failed');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(320) NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'customer',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  email varchar(320) NOT NULL UNIQUE,
  first_name varchar(120),
  last_name varchar(120),
  phone varchar(40),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
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

CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL,
  slug varchar(180) NOT NULL UNIQUE,
  description text,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL,
  slug varchar(180) NOT NULL UNIQUE,
  tag_type varchar(64) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES collections(id) ON DELETE SET NULL,
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

CREATE TABLE IF NOT EXISTS product_tags (
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT product_tags_pk PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  storage_key varchar(255) NOT NULL,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  alt_text varchar(255),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_inventory (
  product_id uuid PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  on_hand integer NOT NULL DEFAULT 0 CHECK (on_hand >= 0),
  reserved integer NOT NULL DEFAULT 0 CHECK (reserved >= 0),
  low_stock_threshold integer NOT NULL DEFAULT 0 CHECK (low_stock_threshold >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(40) NOT NULL UNIQUE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  status order_status NOT NULL DEFAULT 'pending_payment',
  currency varchar(3) NOT NULL DEFAULT 'CAD',
  subtotal_cents integer NOT NULL DEFAULT 0 CHECK (subtotal_cents >= 0),
  tax_cents integer NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  shipping_cents integer NOT NULL DEFAULT 0 CHECK (shipping_cents >= 0),
  total_cents integer NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
  stripe_checkout_session_id varchar(255) UNIQUE,
  stripe_payment_intent_id varchar(255),
  shipping_address_json jsonb NOT NULL,
  billing_address_json jsonb,
  guest_access_token_hash varchar(255),
  placed_at timestamptz,
  paid_at timestamptz,
  cancelled_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  status inventory_reservation_status NOT NULL DEFAULT 'active',
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kuji_prizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
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

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_name varchar(200) NOT NULL,
  product_type product_type NOT NULL,
  unit_price_cents integer NOT NULL CHECK (unit_price_cents >= 0),
  quantity integer NOT NULL CHECK (quantity > 0),
  line_total_cents integer NOT NULL CHECK (line_total_cents >= 0),
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  provider payment_provider NOT NULL DEFAULT 'stripe',
  provider_payment_intent_id varchar(255) UNIQUE,
  provider_checkout_session_id varchar(255) UNIQUE,
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),
  currency varchar(3) NOT NULL DEFAULT 'CAD',
  status payment_status NOT NULL DEFAULT 'pending',
  raw_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  order_item_id uuid NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  kuji_product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  kuji_prize_id uuid NOT NULL REFERENCES kuji_prizes(id) ON DELETE RESTRICT,
  ticket_number varchar(64) NOT NULL UNIQUE,
  revealed_at timestamptz,
  voided_at timestamptz,
  void_reason varchar(255),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  carrier_name varchar(120),
  tracking_number varchar(120),
  tracking_url varchar(500),
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id varchar(255) NOT NULL UNIQUE,
  event_type varchar(160) NOT NULL,
  processed_at timestamptz,
  status webhook_status NOT NULL DEFAULT 'received',
  payload jsonb NOT NULL,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS customers_user_id_idx ON customers (user_id);
CREATE INDEX IF NOT EXISTS customers_created_at_idx ON customers (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS addresses_customer_id_idx ON addresses (customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS collections_active_sort_idx ON collections (is_active, sort_order, id);
CREATE INDEX IF NOT EXISTS tags_tag_type_idx ON tags (tag_type, name);
CREATE INDEX IF NOT EXISTS products_status_created_idx ON products (status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS products_collection_status_created_idx ON products (collection_id, status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS products_type_status_created_idx ON products (product_type, status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS product_tags_tag_id_idx ON product_tags (tag_id, product_id);
CREATE INDEX IF NOT EXISTS product_images_product_sort_idx ON product_images (product_id, sort_order, id);
CREATE INDEX IF NOT EXISTS product_inventory_on_hand_idx ON product_inventory (on_hand, reserved);
CREATE INDEX IF NOT EXISTS orders_customer_created_idx ON orders (customer_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS orders_status_created_idx ON orders (status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS orders_placed_at_idx ON orders (placed_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS inventory_reservations_order_id_idx ON inventory_reservations (order_id, status);
CREATE INDEX IF NOT EXISTS inventory_reservations_product_id_idx ON inventory_reservations (product_id, status);
CREATE INDEX IF NOT EXISTS inventory_reservations_status_expires_idx ON inventory_reservations (status, expires_at, id);
CREATE INDEX IF NOT EXISTS kuji_prizes_product_sort_idx ON kuji_prizes (product_id, sort_order, id);
CREATE INDEX IF NOT EXISTS kuji_prizes_product_remaining_idx ON kuji_prizes (product_id, remaining_quantity DESC, id);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items (order_id, id);
CREATE INDEX IF NOT EXISTS order_items_product_id_idx ON order_items (product_id, created_at DESC);
CREATE INDEX IF NOT EXISTS tickets_order_id_idx ON tickets (order_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS tickets_order_item_id_idx ON tickets (order_item_id, created_at DESC);
CREATE INDEX IF NOT EXISTS tickets_customer_id_idx ON tickets (customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS tickets_kuji_product_id_idx ON tickets (kuji_product_id, created_at DESC);
CREATE INDEX IF NOT EXISTS tickets_order_revealed_idx ON tickets (order_id, revealed_at, created_at DESC);
CREATE INDEX IF NOT EXISTS shipments_tracking_number_idx ON shipments (tracking_number);
CREATE INDEX IF NOT EXISTS stripe_webhook_events_status_created_idx ON stripe_webhook_events (status, created_at DESC);

CREATE INDEX IF NOT EXISTS products_search_vector_gin_idx ON products USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS products_name_trgm_gin_idx ON products USING GIN (name gin_trgm_ops);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_product_search_vector(target_product_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE products AS p
  SET search_vector =
    setweight(to_tsvector('simple', coalesce(p.name, '')), 'A') ||
    setweight(
      to_tsvector(
        'simple',
        COALESCE(
          (
            SELECT string_agg(t.name, ' ')
            FROM product_tags pt
            JOIN tags t ON t.id = pt.tag_id
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

CREATE OR REPLACE FUNCTION refresh_product_search_vector_from_products()
RETURNS trigger AS $$
BEGIN
  PERFORM refresh_product_search_vector(COALESCE(NEW.id, OLD.id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_product_search_vector_from_product_tags()
RETURNS trigger AS $$
BEGIN
  PERFORM refresh_product_search_vector(COALESCE(NEW.product_id, OLD.product_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_product_search_vector_from_tags()
RETURNS trigger AS $$
BEGIN
  UPDATE products p
  SET updated_at = p.updated_at
  WHERE EXISTS (
    SELECT 1
    FROM product_tags pt
    WHERE pt.product_id = p.id
      AND pt.tag_id = COALESCE(NEW.id, OLD.id)
  );

  PERFORM refresh_product_search_vector(pt.product_id)
  FROM product_tags pt
  WHERE pt.tag_id = COALESCE(NEW.id, OLD.id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at ON users;
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS customers_set_updated_at ON customers;
CREATE TRIGGER customers_set_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS addresses_set_updated_at ON addresses;
CREATE TRIGGER addresses_set_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS collections_set_updated_at ON collections;
CREATE TRIGGER collections_set_updated_at BEFORE UPDATE ON collections FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS tags_set_updated_at ON tags;
CREATE TRIGGER tags_set_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS products_set_updated_at ON products;
CREATE TRIGGER products_set_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS product_images_set_updated_at ON product_images;
CREATE TRIGGER product_images_set_updated_at BEFORE UPDATE ON product_images FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS product_inventory_set_updated_at ON product_inventory;
CREATE TRIGGER product_inventory_set_updated_at BEFORE UPDATE ON product_inventory FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS orders_set_updated_at ON orders;
CREATE TRIGGER orders_set_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS inventory_reservations_set_updated_at ON inventory_reservations;
CREATE TRIGGER inventory_reservations_set_updated_at BEFORE UPDATE ON inventory_reservations FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS kuji_prizes_set_updated_at ON kuji_prizes;
CREATE TRIGGER kuji_prizes_set_updated_at BEFORE UPDATE ON kuji_prizes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS order_items_set_updated_at ON order_items;
CREATE TRIGGER order_items_set_updated_at BEFORE UPDATE ON order_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS payments_set_updated_at ON payments;
CREATE TRIGGER payments_set_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS tickets_set_updated_at ON tickets;
CREATE TRIGGER tickets_set_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS shipments_set_updated_at ON shipments;
CREATE TRIGGER shipments_set_updated_at BEFORE UPDATE ON shipments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS products_refresh_search_vector_trg ON products;
CREATE TRIGGER products_refresh_search_vector_trg
AFTER INSERT OR UPDATE OF name, description ON products
FOR EACH ROW
EXECUTE FUNCTION refresh_product_search_vector_from_products();

DROP TRIGGER IF EXISTS product_tags_refresh_search_vector_trg ON product_tags;
CREATE TRIGGER product_tags_refresh_search_vector_trg
AFTER INSERT OR UPDATE OR DELETE ON product_tags
FOR EACH ROW
EXECUTE FUNCTION refresh_product_search_vector_from_product_tags();

DROP TRIGGER IF EXISTS tags_refresh_search_vector_trg ON tags;
CREATE TRIGGER tags_refresh_search_vector_trg
AFTER UPDATE OF name ON tags
FOR EACH ROW
EXECUTE FUNCTION refresh_product_search_vector_from_tags();

SELECT refresh_product_search_vector(id) FROM products;
