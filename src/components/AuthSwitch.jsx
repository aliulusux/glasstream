import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// 🧠 İngilizce → Türkçe hata mesajı dönüştürme fonksiyonu
function translateError(message) {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials"))
    return "Geçersiz e-posta veya şifre.";
  if (lower.includes("email not confirmed"))
    return "E-posta adresinizi doğrulamanız gerekiyor.";
  if (lower.includes("password"))
    return "Şifre en az 6 karakter olmalıdır.";
  if (lower.includes("rate limit"))
    return "Çok fazla deneme yaptınız. Lütfen birkaç dakika bekleyin.";
  if (lower.includes("already registered"))
    return "Bu e-posta adresi zaten kayıtlı.";
  if (lower.includes("network"))
    return "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.";

  return "Bir hata oluştu. Lütfen tekrar deneyin.";
}

export default function AuthModal({ isOpen, onClose, mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  // 🔑 E-posta + Şifre Girişi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Giriş başarılı! 🎉");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Kayıt başarılı! E-posta adresinizi doğrulayın.");
      }
      onClose();
    } catch (err) {
      setMessage(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google ile giriş
  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (err) {
      setMessage(translateError(err.message));
    }
  };

  return (
    <div className="text-white text-center">
      <h2 className="text-lg font-semibold mb-3">
        {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
      </h2>

      {/* E-posta + Şifre Formu */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
        <div>
          <label className="block text-sm mb-1 text-white/80">
            Kullanıcı Adı / E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 outline-none text-sm"
            placeholder="ornek@mail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white/80">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 outline-none text-sm"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading
            ? "Bekleyin..."
            : mode === "login"
            ? "Giriş Yap"
            : "Kayıt Ol"}
        </button>
      </form>

      <div className="my-4 text-white/50 text-sm">veya</div>

      {/* Google ile giriş butonu */}
      <button
        onClick={handleGoogle}
        className="flex items-center justify-center gap-2 w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Google ile Devam Et
      </button>

      {/* Kapat butonu */}
      <button
        onClick={onClose}
        className="mt-4 text-pink-400 text-sm hover:text-pink-300 transition"
      >
        Kapat
      </button>

      {message && (
        <p className="mt-2 text-xs text-pink-400">{message}</p>
      )}
    </div>
  );
}
