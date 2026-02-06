import { createClient } from '@supabase/supabase-js';
import getEnvConfig from './env';

const { supabaseUrl, supabasePublicKey } = getEnvConfig();

const supabase = createClient(supabaseUrl, supabasePublicKey, {
  auth: { persistSession: false },
});

export default supabase;
