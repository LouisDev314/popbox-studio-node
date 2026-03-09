-- Keep public.users aligned with Supabase Auth users so JWT subject checks are reliable.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.users u
    LEFT JOIN auth.users a ON a.id = u.id
    WHERE a.id IS NULL
  ) THEN
    RAISE EXCEPTION 'public.users contains rows without matching auth.users ids; clean them up before applying auth alignment';
END IF;
END $$;

ALTER TABLE public.users
    ALTER COLUMN id DROP DEFAULT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'users_id_auth_users_fk'
      AND conrelid = 'public.users'::regclass
  ) THEN
ALTER TABLE public.users
    ADD CONSTRAINT users_id_auth_users_fk
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
END IF;
END $$;

CREATE OR REPLACE FUNCTION public.sync_auth_user_to_public_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IS NULL THEN
    RETURN NEW;
END IF;

INSERT INTO public.users (id, email)
VALUES (NEW.id, NEW.email)
    ON CONFLICT (id)
  DO UPDATE
             SET email = EXCLUDED.email,
             updated_at = now();

RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auth_users_sync_public_users_trg ON auth.users;
CREATE TRIGGER auth_users_sync_public_users_trg
    AFTER INSERT OR UPDATE OF email ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_auth_user_to_public_users();

INSERT INTO public.users (id, email)
SELECT id, email
FROM auth.users
WHERE email IS NOT NULL
    ON CONFLICT (id)
DO UPDATE
           SET email = EXCLUDED.email,
           updated_at = now();