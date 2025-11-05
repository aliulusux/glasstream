"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

/* ---------- HEADER ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 px-6 md:px-8 py-4 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight select-none flex items-center gap-1"
        >
          <span className="text-white">glas</span>
          <span className="text-pink-500 drop-shadow-[0_0_10px_rgba(255,77,216,0.8)]">
            S
          </span>
          <span className="text-white">tream</span>
        </Link>

        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition"
        >
          <Star size={16} className="text-pink-400" />
          <span className="text-white text-sm">Ana Sayfa</span>
        </button>
      </div>
    </header>
  );
}

/* ---------- AUTH PAGE ---------- */
export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) navigate("/");
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: username } },
      });
      if (error) alert(error.message);
      else alert("Kayıt başarılı! E-postanızı kontrol edin.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
      else navigate("/");
    }

    setLoading(false);
  };

  // ⚡ Google Sign-In
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a0f] to-[#1b1b22] text-white">
      <Header />

      <div className="flex flex-col items-center justify-center flex-grow px-4">
        {/* Switch Tabs */}
        <div className="flex bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden w-full max-w-md mb-8">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-4 text-lg font-semibold transition-all ${
              mode === "login"
                ? "bg-pink-500/80 text-white shadow-[0_0_15px_rgba(255,105,180,0.6)]"
                : "bg-transparent text-white/70 hover:text-white"
            }`}
          >
            GİRİŞ
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-4 text-lg font-semibold transition-all ${
              mode === "register"
                ? "bg-pink-500/80 text-white shadow-[0_0_15px_rgba(255,105,180,0.6)]"
                : "bg-transparent text-white/70 hover:text-white"
            }`}
          >
            KAYIT OL
          </button>
        </div>

        {/* Auth Forms */}
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 p-6"
            >
              <h2 className="text-center text-xl font-bold mb-6">Giriş Yap</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">E-posta</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-pink-400"
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Şifre</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-pink-400"
                    placeholder="Şifreniz"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-pink-500/80 hover:bg-pink-500 transition rounded-lg py-2 font-semibold"
                >
                  {loading ? "Giriş yapılıyor..." : "Giriş"}
                </button>
              </form>

              {/* Google Login */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-lg py-2 font-medium text-white"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google ile Giriş Yap
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 p-6"
            >
              <h2 className="text-center text-xl font-bold mb-6">Kayıt Ol</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Kullanıcı Adı</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-pink-400"
                    placeholder="Kullanıcı adınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">E-posta</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-pink-400"
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Şifre</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-pink-400"
                    placeholder="Şifrenizi oluşturun"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-pink-500/80 hover:bg-pink-500 transition rounded-lg py-2 font-semibold"
                >
                  {loading ? "Kaydediliyor..." : "Kayıt Ol"}
                </button>
              </form>

              {/* Google Register */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-lg py-2 font-medium text-white"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google ile Devam Et
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
