import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing Supabase credentials!");
  throw new Error("Supabase credentials missing — check .env");
}

function getSupabaseSingleton() {
  const g = globalThis || window;
  if (!g.__GLASSTREAM_SUPABASE__) {
    g.__GLASSTREAM_SUPABASE__ = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: true,
        storageKey: "glasstream.auth",
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return g.__GLASSTREAM_SUPABASE__;
}

export const supabase = getSupabaseSingleton();
