import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AuthModal({ isOpen, onClose, mode = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

const handleGoogleLogin = async () => {
  try {
    // Initiate the Google OAuth login with Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // must match your Supabase redirect URL
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      alert("Google ile giriş yapılamadı. Lütfen tekrar deneyin.");
    } else {
      console.log("Google login started:", data);
    }
  } catch (err) {
    console.error("Unexpected Google login error:", err);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await supabase.auth.signInWithPassword({ email, password });
      } else {
        await supabase.auth.signUp({ email, password });
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Instantly close on button click
  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 80%)",
            backdropFilter: "blur(18px)",
          }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.35, ease: [0.2, 0, 0, 1] },
            }}
            exit={{ opacity: 0 }}
            className="relative w-[90%] max-w-sm text-white rounded-2xl border border-white/10 
                       bg-black/80 backdrop-blur-3xl shadow-[0_0_40px_rgba(255,0,255,0.3)] 
                       overflow-hidden pointer-events-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">
                {isLogin ? "Giriş Yap" : "Kayıt Ol"}
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-white/70">E-posta</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-white 
                               placeholder:text-white/50 outline-none border border-white/10 
                               focus:border-pink-500"
                    placeholder="ornek@mail.com"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="text-sm text-white/70">Şifre</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-white 
                               placeholder:text-white/50 outline-none border border-white/10 
                               focus:border-pink-500 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-white/70 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 
                             hover:opacity-90 transition font-semibold text-white 
                             shadow-lg shadow-pink-500/30"
                >
                  {loading
                    ? "Bekleyin..."
                    : isLogin
                    ? "Giriş Yap"
                    : "Kayıt Ol"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center justify-center my-4 text-white/60 text-sm">
                <span className="px-2">veya</span>
              </div>

              {/* Google login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-gray-900 font-medium py-2 rounded-md hover:bg-gray-100 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google ile Devam Et
              </button>

              {/* Switch */}
              <p className="text-center text-sm text-white/60 mt-6">
                {isLogin ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pink-400 hover:underline"
                >
                  {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                </button>
              </p>
            </div>

            {/* Close button */}
            <div className="flex flex-col items-center mt-6 mb-5 space-y-3">
              <button
                onClick={handleClose}
                className="text-pink-400 hover:text-pink-300 hover:scale-105 transition-all duration-300 text-sm"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
