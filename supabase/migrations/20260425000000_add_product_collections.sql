CREATE TABLE public.product_collections (
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  collection_id uuid NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, collection_id)
);

CREATE INDEX product_collections_collection_sort_idx
  ON public.product_collections (collection_id, sort_order, product_id);

CREATE INDEX product_collections_product_id_idx
  ON public.product_collections (product_id, collection_id);

INSERT INTO public.product_collections (product_id, collection_id, sort_order)
SELECT id, collection_id, 0
FROM public.products
WHERE collection_id IS NOT NULL
ON CONFLICT DO NOTHING;
