import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

export default function AuthSwitch() {
  const [mode, setMode] = useState("login");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 🚀 Google OAuth login
const handleGoogleLogin = async () => {
  try {
    const redirectTo =
      import.meta.env.VITE_PRODUCTION_URL ||
      import.meta.env.VITE_SITE_URL ||
      window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo, // Supabase will redirect back to your site
      },
    });

    if (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Check console for details.");
    }
  } catch (err) {
    console.error("Unexpected login error:", err);
  }
};

  return (
    <div className="relative">
      {/* Switch buttons */}
      <div className="flex items-center bg-white/10 rounded-full px-1 py-1 text-sm backdrop-blur-md border border-white/10 shadow-glow">
        {["login", "register"].map((item) => (
          <motion.button
            key={item}
            onClick={() => {
              setMode(item);
              openModal();
            }}
            className={`px-3 py-1 rounded-full transition font-medium ${
              mode === item
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_10px_rgba(255,0,128,0.8)]"
                : "text-white/80 hover:text-white"
            }`}
          >
            {item === "login" ? "Login" : "Register"}
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-4 w-80 bg-black/60 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-[0_0_25px_rgba(255,0,128,0.3)] p-5 z-50"
          >
            {/* Auth Modal */}
            <AuthModal isOpen={isOpen} onClose={closeModal} mode={mode} />

            {/* Google Login Button */}
            {mode === "login" && (
              <button
                onClick={handleGoogleLogin}
                className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-2 rounded-lg hover:opacity-90 transition shadow-[0_0_15px_rgba(255,0,128,0.5)]"
              >
                Sign in with Google
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
