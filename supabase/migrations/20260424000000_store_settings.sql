-- Store-level settings for backend-owned configuration.

CREATE TABLE IF NOT EXISTS public.store_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS store_settings_set_updated_at ON public.store_settings;
CREATE TRIGGER store_settings_set_updated_at
  BEFORE UPDATE ON public.store_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.store_settings (key, value)
VALUES (
  'shipping',
  '{"flatShippingCents": 1200, "freeShippingThresholdCents": 14900, "currency": "CAD"}'::jsonb
)
ON CONFLICT (key) DO NOTHING;
