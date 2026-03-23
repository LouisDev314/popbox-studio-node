ALTER TABLE orders
  ADD COLUMN confirmation_email_sent_at timestamptz,
  ADD COLUMN confirmation_email_error text;
