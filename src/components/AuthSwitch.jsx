import { useState } from "react";
import AuthModal from "./AuthModal";
import { motion } from "framer-motion";

export default function AuthSwitch() {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="relative flex items-center gap-2">
      {/* Glassy Switch */}
      <div
        onClick={toggleMode}
        className="relative flex w-28 h-9 bg-white/10 border border-white/10 rounded-full backdrop-blur-md cursor-pointer shadow-[inset_0_0_10px_rgba(255,105,180,0.4)]"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`absolute top-[2px] ${
            isLogin ? "left-[2px]" : "left-[calc(100%-58px)]"
          } w-[56px] h-[calc(100%-4px)] rounded-full bg-pink-500 shadow-[0_0_12px_rgba(255,105,180,0.8)]`}
        />
        <span
          className={`flex-1 text-center text-sm font-semibold z-10 transition ${
            isLogin ? "text-white" : "text-white/60"
          }`}
        >
          Login
        </span>
        <span
          className={`flex-1 text-center text-sm font-semibold z-10 transition ${
            !isLogin ? "text-white" : "text-white/60"
          }`}
        >
          Register
        </span>
      </div>

      {/* Action Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] text-white flex items-center gap-2"
      >
        <span className="text-pink-400">★</span>
        {isLogin ? "Login" : "Register"}
      </button>

      {/* Modal */}
      <AuthModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode={isLogin ? "login" : "register"}
      />
    </div>
  );
}
