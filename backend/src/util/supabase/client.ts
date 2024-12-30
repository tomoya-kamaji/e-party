import { getSupabaseConfig } from '@/util/config';
import { createClient } from '@supabase/supabase-js';

const { supabaseUrl, supabaseKey } = getSupabaseConfig();

export const supabase = createClient(supabaseUrl, supabaseKey);
