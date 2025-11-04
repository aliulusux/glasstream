import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="auth-modal"
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 15 }}
            className="relative bg-glassDark p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-semibold mb-3 text-white">Sign in</h2>
            <p className="text-white/70 text-sm mb-6">
              Use your Google account to continue
            </p>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-lg py-2 hover:opacity-90 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>{loading ? "Connecting..." : "Continue with Google"}</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
