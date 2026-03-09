import { createClient } from '@supabase/supabase-js';
import getEnvConfig from '../config/env';

export const supabaseAdmin = createClient(getEnvConfig().supabaseUrl, getEnvConfig().supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
