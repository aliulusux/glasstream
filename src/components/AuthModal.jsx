import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AuthModal({ isOpen, onClose, mode = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-start justify-center pt-20 z-50 bg-black/70 backdrop-blur-3xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(255,0,255,0.3)] w-[90%] max-w-sm text-white p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </h2>

            {/* 📧 Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-white/70">E-posta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/10 focus:border-pink-500"
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
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/10 focus:border-pink-500 pr-10"
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
                className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition font-semibold text-white shadow-lg shadow-pink-500/30"
              >
                {loading
                  ? "Bekleyin..."
                  : isLogin
                  ? "Giriş Yap"
                  : "Kayıt Ol"}
              </button>
            </form>

            <div className="flex items-center justify-center my-4 text-white/60 text-sm">
              <span className="px-2">veya</span>
            </div>

            {/* 🌈 Google Login */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition font-medium"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              Google ile Devam Et
            </button>

            {/* 🔁 Switch between Login & Register */}
            <p className="text-center text-sm text-white/60 mt-4">
              {isLogin ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-400 hover:underline"
              >
                {isLogin ? "Kayıt Ol" : "Giriş Yap"}
              </button>
            </p>

            {/* ❌ Close */}
            <button
              onClick={onClose}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-pink-400 hover:underline text-sm"
            >
              Kapat
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



