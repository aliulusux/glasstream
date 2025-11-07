import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthModal({ onClose, onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      if (isRegister) {
        response = await supabase.auth.signUp({ email, password });
      } else {
        response = await supabase.auth.signInWithPassword({ email, password });
      }

      if (response.error) throw response.error;

      onAuth && onAuth(response.data.session);
      onClose();
    } catch (err) {
      console.error("Auth error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-lg w-[90%] max-w-md relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-pink-400 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/10 focus:border-pink-500 outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/10 focus:border-pink-500 outline-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pink-500 hover:bg-pink-600 transition-all rounded-lg font-semibold"
          >
            {loading
              ? "Loading..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-400 hover:text-pink-400"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don’t have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
