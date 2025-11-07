import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        // Supabase automatically handles hash (#access_token) when detectSessionInUrl = true
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data?.session) {
          console.log("✅ Session restored:", data.session);
          navigate("/", { replace: true });
        } else {
          // If session isn't ready yet, wait and check again briefly
          setTimeout(async () => {
            const retry = await supabase.auth.getSession();
            if (retry?.data?.session) {
              console.log("✅ Session restored on retry:", retry.data.session);
              navigate("/", { replace: true });
            } else {
              console.warn("⚠️ No session found after redirect");
              navigate("/login", { replace: true });
            }
          }, 1000);
        }
      } catch (err) {
        console.error("❌ Auth redirect error:", err);
        navigate("/", { replace: true });
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black/80 text-white text-lg"
      style={{
        fontFamily: "Inter, sans-serif",
        backdropFilter: "blur(20px)",
      }}
    >
      Google ile giriş yapılıyor, lütfen bekleyin...
    </div>
  );
}
