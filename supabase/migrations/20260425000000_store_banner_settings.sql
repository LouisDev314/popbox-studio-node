-- Storefront utility banner settings.

INSERT INTO public.store_settings (key, value)
VALUES (
  'store_banner',
  '{
    "enabled": true,
    "message": "Free shipping across Canada on orders $149+ CAD · Otherwise flat rate $15.99",
    "linkLabel": "Shipping details",
    "linkHref": "/legal/shipping-returns"
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
