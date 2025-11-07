import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Supabase automatically parses the URL hash fragment (?code=...)
        const { data, error } = await supabase.auth.getSession();

        // If there's no session in storage, try to recover it from the URL
        if (!data.session) {
          const { data: { session }, error: recoverError } =
            await supabase.auth.exchangeCodeForSession(window.location.href);

          if (recoverError) throw recoverError;

          if (session) {
            console.log("✅ Session restored from redirect:", session);
            navigate("/", { replace: true });
          } else {
            console.warn("⚠️ No session found after redirect");
            navigate("/login", { replace: true });
          }
        } else {
          console.log("✅ Active session found:", data.session);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("❌ Auth redirect error:", err);
        navigate("/", { replace: true });
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black/80 text-white text-lg"
      style={{
        fontFamily: "Inter, sans-serif",
        backdropFilter: "blur(20px)",
      }}
    >
      Giriş yapılıyor, lütfen bekleyin...
    </div>
  );
}
