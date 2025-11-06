// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

let _client = null;

// Lazy-init so envs are guaranteed to be available
export function getSupabase() {
  if (_client) return _client;

  const url = import.meta.env.VITE_SUPABASE_URL ?? "";
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

  // Helpful diagnostics (one-time)
  if (!url || !key) {
    // DO NOT remove: this tells you exactly what's missing at runtime
    // If this ever triggers, your .env isn't being injected by Vite.
    console.error("❌ Missing Supabase envs:");
    console.error("VITE_SUPABASE_URL:", url || "(undefined)");
    console.error("VITE_SUPABASE_ANON_KEY:", key ? "Loaded ✅" : "(undefined)");
    throw new Error("supabaseKey is required.");
  }

  _client = createClient(url, key, {
    auth: {
      persistSession: true,
      storageKey: "glasstream.auth",
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  // console.log("✅ Supabase client initialized"); // optional
  return _client;
}
