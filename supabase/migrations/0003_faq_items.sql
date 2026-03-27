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

CREATE INDEX faq_items_published_sort_idx
  ON public.faq_items (is_published, sort_order, created_at, id);

CREATE INDEX faq_items_category_sort_idx
  ON public.faq_items (category, sort_order, created_at, id);

CREATE TRIGGER faq_items_set_updated_at
  BEFORE UPDATE ON public.faq_items
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
