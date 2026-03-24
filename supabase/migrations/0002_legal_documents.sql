CREATE TYPE legal_document_type AS ENUM ('faq', 'shipping_returns', 'terms', 'privacy');

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

CREATE UNIQUE INDEX legal_documents_type_version_unique
  ON public.legal_documents (type, version);

CREATE UNIQUE INDEX legal_documents_one_active_per_type_unique
  ON public.legal_documents (type)
  WHERE is_active = true;

CREATE INDEX legal_documents_type_active_idx
  ON public.legal_documents (type, is_active);

CREATE INDEX legal_documents_type_created_at_idx
  ON public.legal_documents (type, created_at DESC);
