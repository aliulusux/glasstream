import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AuthModal({ isOpen, onClose, mode }) {
  if (!isOpen) return null;

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl shadow-[0_0_25px_rgba(255,105,180,0.4)] border border-white/10 w-[90%] max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-white/70 mb-6">
          {mode === "login"
            ? "Use your account to continue"
            : "Sign up easily with Google"}
        </p>

        <button
          onClick={handleGoogle}
          className="flex items-center justify-center gap-2 bg-white text-black rounded-xl px-4 py-3 font-medium hover:bg-white/90 transition w-full"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-pink-400 hover:text-pink-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
