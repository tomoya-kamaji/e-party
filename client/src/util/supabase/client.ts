'use client';

import { getSupabaseConfig } from '@/util/env';
import { createClient } from '@supabase/supabase-js';

const { supabaseUrl, supabaseKey } = getSupabaseConfig();

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 認証トークンを取得する
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return undefined;
  }
  return data.session?.access_token ?? undefined;
};
