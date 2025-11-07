// src/pages/AuthCallback.jsx
import React, { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // ✅ handle the redirect result from Supabase
        const { data, error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("Auth callback error:", error.message);
          alert("Giriş başarısız: " + error.message);
          navigate("/", { replace: true });
          return;
        }

        console.log("Login success:", data.session);
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Unexpected callback error:", err.message);
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Giriş yapılıyor...</h2>
      <p className="text-gray-400 text-sm">Lütfen bekleyin 🌀</p>
    </div>
  );
}
