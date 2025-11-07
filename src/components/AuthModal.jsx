// src/components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { X } from "lucide-react";

export default function AuthModal({ onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };
    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const redirectUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5173/auth/callback"
          : "https://glasstream.vercel.app/auth/callback";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) throw error;
    } catch (err) {
      console.error("Google login failed:", err.message);
      alert("Google girişi başarısız: " + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center backdrop-blur-md z-50">
      <div className="bg-black/60 text-white backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[380px] relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 w-4 h-4 rounded-full hover:scale-110 transition"
        />

        <h2 className="text-2xl font-bold text-center mb-4">
          {user ? "Hesabım" : "Giriş Yap"}
        </h2>

        {user ? (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={user.user_metadata?.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full border border-pink-400"
            />
            <p className="text-lg">{user.user_metadata?.full_name}</p>
            <p className="text-sm text-white/60">{user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-xl"
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center bg-white text-black font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              Google ile Giriş Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
