import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthSwitch({ onAuthSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            import.meta.env.VITE_SITE_URL ||
            "http://localhost:5173", // update to your local dev port if different
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
      // ✅ Tell Header to refresh immediately after login
      if (onAuthSuccess) {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) onAuthSuccess(data.session.user);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLogin("google")}
        disabled={loading}
        className="px-4 py-1.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-md transition"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button
        onClick={() => handleLogin("github")}
        disabled={loading}
        className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold shadow-md transition"
      >
        {loading ? "..." : "Register"}
      </button>
    </div>
  );
}
