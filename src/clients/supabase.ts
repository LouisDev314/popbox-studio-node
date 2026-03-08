import { createClient } from '@supabase/supabase-js';
import getEnvConfig from '../config/env';

const env = getEnvConfig();

export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
