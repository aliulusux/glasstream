"use client";
import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  // Show toast with message + type
  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200); // auto hide
  };

  // Define gradient style by type
  const getToastStyle = (type) => {
    switch (type) {
      case "success":
        return "from-pink-500/70 via-fuchsia-500/60 to-purple-500/50 border-pink-400/40";
      case "error":
        return "from-red-500/80 via-pink-500/60 to-orange-500/50 border-red-400/40";
      case "warning":
        return "from-amber-400/80 via-orange-500/60 to-pink-400/50 border-amber-300/40";
      default:
        return "from-white/20 via-white/10 to-transparent border-white/20";
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {/* 🪩 Floating Toast */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] flex justify-center w-full pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative pointer-events-auto px-6 py-3 rounded-2xl text-sm font-medium text-white backdrop-blur-xl border shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-gradient-to-r ${getToastStyle(
                toast.type
              )}`}
            >
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl opacity-40" />
              {/* Message content */}
              <div className="relative z-10 flex items-center gap-2">
                {toast.msg}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// Hook
export const useToast = () => useContext(ToastContext);
