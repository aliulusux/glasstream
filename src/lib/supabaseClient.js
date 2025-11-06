import { createClient } from "@supabase/supabase-js";

// ✅ Read from .env (Vite style)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 🚨 Check variables before creating client
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Supabase environment variables are missing!");
  console.error("Check your .env file — it must contain:");
  console.error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
  throw new Error("Supabase credentials missing — see console above.");
}

// ✅ Create a single Supabase client per browser tab
function getSupabaseSingleton() {
  const g = globalThis || window;
  if (!g.__GLASSTREAM_SUPABASE__) {
    g.__GLASSTREAM_SUPABASE__ = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        storageKey: "glasstream.auth",
        autoRefreshToken: true,
        detectSessionInUrl: true, // handles OAuth redirect tokens
      },
    });
  }
  return g.__GLASSTREAM_SUPABASE__;
}

// ✅ Export the client
export const supabase = getSupabaseSingleton();
