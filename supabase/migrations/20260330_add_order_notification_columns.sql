ALTER TABLE public.orders
ADD COLUMN order_notification_sent_at timestamptz,
ADD COLUMN order_notification_error text;
