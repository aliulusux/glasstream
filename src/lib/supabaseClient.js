// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

let supabase = null;

export function getSupabase() {
  if (supabase) return supabase;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ Missing Supabase env vars:", {
      url,
      key: key ? "Loaded" : "Missing",
    });
    throw new Error("Supabase URL or Key is missing!");
  }

  supabase = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  console.log("✅ Supabase client initialized");
  return supabase;
}
