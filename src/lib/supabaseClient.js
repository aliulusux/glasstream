import { createClient } from '@supabase/supabase-js';

// Read from either Vite or Next style envs
const SUPABASE_URL =
  import.meta?.env?.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  import.meta?.env?.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Helps catch mis-config early rather than silently failing auth
  // eslint-disable-next-line no-console
  console.error('Supabase env vars are missing.');
}

// ✅ Create exactly one client per browser tab
function getSupabaseSingleton() {
  const g = globalThis || window;
  if (!g.__GLASSTREAM_SUPABASE__) {
    g.__GLASSTREAM_SUPABASE__ = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        // Persist to localStorage
        persistSession: true,
        storageKey: 'glasstream.auth',
        autoRefreshToken: true,
        detectSessionInUrl: true, // picks up #access_token after OAuth redirect
      },
    });
  }
  return g.__GLASSTREAM_SUPABASE__;
}

export const supabase = getSupabaseSingleton();
