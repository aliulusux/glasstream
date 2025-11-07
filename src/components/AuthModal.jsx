import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔑 Email / Password auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (isLogin) {
        res = await supabase.auth.signInWithPassword({ email, password });
      } else {
        res = await supabase.auth.signUp({ email, password });
      }

      if (res.error) throw res.error;

      alert(isLogin ? "Giriş başarılı!" : "Kayıt başarılı! Lütfen e-postanızı kontrol edin.");
      onClose();
    } catch (err) {
      console.error("Auth error:", err);
      alert("Bir hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google login
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      console.log("Google login redirecting...", data);
    } catch (err) {
      console.error("Google login error:", err.message);
      alert("Google ile giriş yapılamadı: " + err.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[90%] max-w-sm bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-white/60 hover:text-pink-400 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-center text-2xl font-bold text-white mb-2">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@mail.com"
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-2 rounded-md font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Lütfen bekleyin..." : isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </button>
          </form>

          <div className="text-center text-white/60 my-3">veya</div>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google ile Devam Et
          </button>

          <p className="text-center text-sm text-white/70 mt-4">
            {isLogin ? (
              <>
                Hesabın yok mu?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-pink-400 hover:underline"
                >
                  Kayıt Ol
                </button>
              </>
            ) : (
              <>
                Zaten hesabın var mı?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-pink-400 hover:underline"
                >
                  Giriş Yap
                </button>
              </>
            )}
          </p>

          <button
            onClick={onClose}
            className="block mx-auto mt-5 text-sm text-white/50 hover:text-pink-400 transition"
          >
            Kapat
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
