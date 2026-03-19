ALTER TABLE public.payments
    ADD COLUMN IF NOT EXISTS refunded_amount_cents integer NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'payments_refunded_amount_cents_check'
      AND conrelid = 'public.payments'::regclass
  ) THEN
    ALTER TABLE public.payments
        ADD CONSTRAINT payments_refunded_amount_cents_check
            CHECK (refunded_amount_cents >= 0);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'payments_refunded_amount_not_exceed_amount_check'
      AND conrelid = 'public.payments'::regclass
  ) THEN
    ALTER TABLE public.payments
        ADD CONSTRAINT payments_refunded_amount_not_exceed_amount_check
            CHECK (refunded_amount_cents <= amount_cents);
  END IF;
END $$;
