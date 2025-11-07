import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ✅ Attach globally (for console access)
if (typeof window !== "undefined") {
  window.supabase = supabase;

  // 🔁 Force session restore on reload
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) {
      const saved = localStorage.getItem("sb-" + supabaseUrl.split("//")[1] + "-auth-token");
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



