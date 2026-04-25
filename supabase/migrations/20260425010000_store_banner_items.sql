-- Convert storefront utility banner settings from one message to multiple items.

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
