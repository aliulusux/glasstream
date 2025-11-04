import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { X, Google } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for login link");
    setLoading(false);
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        onClose();
      }
    });
    return () => listener?.subscription?.unsubscribe();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-glassDark/90 glass rounded-2xl p-8 w-full max-w-md mx-4 text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Login / Register</h2>
              <button onClick={onClose}><X size={24} className="text-white/70 hover:text-white"/></button>
            </div>
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-glassPink text-white py-2 rounded-lg shadow-glow hover:bg-pink-500 transition"
              >
                {loading ? "Sending..." : "Send magic link"}
              </button>
            </form>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-white/20 before:mr-2
                            after:flex-1 after:border-t after:border-white/20 after:ml-2">
              <span className="text-sm text-white/70">or</span>
            </div>
            <button
              onClick={handleGoogle}
              className="w-full border border-white/30 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition"
            >
              <Google size={20} className="text-white"/>
              <span>Continue with Google</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
