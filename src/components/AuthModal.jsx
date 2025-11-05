import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AuthModal({ isOpen, onClose, mode }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });
        if (error) throw error;
        setMessage("Kayıt başarılı! E-posta adresinizi doğrulayın.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Giriş başarılı! 🎉");
      }
      onClose();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div className="text-white text-center">
      <h2 className="text-lg font-semibold mb-3">
        {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
        {mode === "register" && (
          <div>
            <label className="block text-sm mb-1 text-white/80">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 outline-none text-sm"
              placeholder="örnek: aliulusux"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm mb-1 text-white/80">E-posta</label>
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
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 outline-none text-sm pr-8"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2 top-2 text-white/60 hover:text-white transition"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Bekleyin..." : mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </form>

      <div className="my-4 text-white/50 text-sm">veya</div>

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

      <button
        onClick={onClose}
        className="mt-4 text-pink-400 text-sm hover:text-pink-300 transition"
      >
        Kapat
      </button>

      {message && <p className="mt-2 text-xs text-pink-400">{message}</p>}
    </div>
  );
}
