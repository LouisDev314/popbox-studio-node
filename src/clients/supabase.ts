import { createClient } from '@supabase/supabase-js';
import getEnvConfig from '../config/env';

const env = getEnvConfig();

export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const createPublicSupabaseClient = () => {
  return createClient(env.supabaseUrl, env.supabasePublicKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
