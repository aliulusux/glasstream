import { createClient } from "@supabase/supabase-js";

let supabase = null;

export function getSupabase() {
  if (supabase) return supabase;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ Missing Supabase credentials!");
    console.error("VITE_SUPABASE_URL:", url);
    console.error("VITE_SUPABASE_ANON_KEY:", key ? "Loaded ✅" : "Missing ❌");
    throw new Error("Supabase credentials missing — check your .env");
  }

  supabase = createClient(url, key, {
    auth: {
      persistSession: true,
      storageKey: "glasstream.auth",
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  console.log("✅ Supabase client initialized!");
  return supabase;
}

// Default export (auto)
export { supabase };
