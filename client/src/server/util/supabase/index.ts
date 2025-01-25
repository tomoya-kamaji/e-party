import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or API key is not set in environment variables');
  }

  return { supabaseUrl, supabaseKey };
};

const { supabaseUrl, supabaseKey } = getSupabaseConfig();

export const supabaseBackendClient = createClient(supabaseUrl, supabaseKey);
