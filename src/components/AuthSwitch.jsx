import { useState } from "react";
import AuthModal from "./AuthModal";
import { motion } from "framer-motion";

export default function AuthSwitch() {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleMode = () => setIsLogin((prev) => !prev);

  return (
    <div className="relative">
      {/* Switch */}
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center gap-2 bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl shadow-inner hover:shadow-[0_0_12px_rgba(255,105,180,0.5)] transition-all"
      >
        <span className="text-pink-400 text-lg">★</span>
        {isLogin ? "Login" : "Register"}
      </motion.button>

      {/* Switch toggle */}
      <div
        onClick={toggleMode}
        className="absolute -right-4 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(255,105,180,0.7)] hover:scale-110 transition"
        title="Switch Login/Register"
      ></div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode={isLogin ? "login" : "register"}
      />
    </div>
  );
}
