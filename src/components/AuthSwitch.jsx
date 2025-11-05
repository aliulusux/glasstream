import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

export default function AuthSwitch() {
  const [mode, setMode] = useState("login");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMode = (newMode) => {
    setMode(newMode);
    setIsOpen((prev) => (newMode === mode ? !prev : true));
  };

  return (
    <div className="relative">
      {/* Switch */}
      <div className="flex bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => toggleMode("login")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            mode === "login"
              ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-[0_0_10px_2px_rgba(236,72,153,0.6)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => toggleMode("register")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            mode === "register"
              ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-[0_0_10px_2px_rgba(236,72,153,0.6)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Register
        </button>
      </div>

      {/* Modal appearing directly under the switch */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[110%] left-1/2 -translate-x-1/2 z-50"
          >
            <div className="relative bg-black/70 border border-white/10 backdrop-blur-lg rounded-2xl p-6 w-[250px] shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <AuthModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                mode={mode}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
