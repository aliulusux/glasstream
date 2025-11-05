import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AuthModal({ isOpen, onClose, mode }) {
  if (!isOpen) return null;

  // 🚀 Google OAuth login
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = "email profile openid";
    const responseType = "token";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=select_account`;

    window.location.href = authUrl;
  };

  return (
    <div className="text-white space-y-4">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md"
      >
        {mode === "login" ? "Welcome Back!" : "Create Account"}
      </motion.h2>

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white/5 text-white placeholder-white/50 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400/40 backdrop-blur-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white/5 text-white placeholder-white/50 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400/40 backdrop-blur-md"
        />
      </motion.div>

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-[0_0_15px_rgba(255,0,128,0.5)] hover:opacity-90 transition"
      >
        {mode === "login" ? "Login" : "Register"}
      </motion.button>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 my-4"
      >
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/60">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </motion.div>

      {/* Google login */}
      <motion.button
        onClick={handleGoogleLogin}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(255,0,128,0.6)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500/40 to-purple-600/40 text-white font-medium py-2 rounded-lg border border-white/20 backdrop-blur-md hover:from-pink-500/60 hover:to-purple-600/60 transition"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Sign in with Google
      </motion.button>

      {/* Close */}
      <motion.button
        onClick={onClose}
        className="block mx-auto text-xs text-white/50 hover:text-white/70 mt-2 transition"
      >
        Close
      </motion.button>
    </div>
  );
}
