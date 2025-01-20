/**
 * Supabase configuration
 */
const getSupabaseConfig = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or API key is not set in environment variables');
  }

  return { supabaseUrl, supabaseKey };
};

/**
 * Endpoints configuration
 * backend
 */
const getEndpointsConfig = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error('Backend URL is not set in environment variables');
  }

  return { backendUrl };
};

export { getSupabaseConfig, getEndpointsConfig };
