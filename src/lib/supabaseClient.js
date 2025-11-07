import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY;


// ✅ Attach globally (for console access)
if (typeof window !== "undefined") {
  window.supabase = supabase;

  // 🔁 Force session restore on reload
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) {
      const saved = localStorage.getItem("sb-" + SUPABASE_URL.split("//")[1] + "-auth-token");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed?.currentSession) {
            supabase.auth.setSession(parsed.currentSession);
          }
        } catch (e) {
          console.warn("Session restore failed:", e);
        }
      }
    }
  });
}

export default supabase;



