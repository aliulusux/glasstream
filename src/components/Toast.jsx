import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, type = "info", onClose }) {
  // Auto close after 3s
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500/30 border-green-400/40 text-green-200",
    error: "bg-red-500/30 border-red-400/40 text-red-200",
    warning: "bg-yellow-500/30 border-yellow-400/40 text-yellow-200",
    info: "bg-white/20 border-white/30 text-white/90",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
            px-6 py-3 rounded-2xl backdrop-blur-md border 
            shadow-[0_0_25px_rgba(255,255,255,0.15)] 
            ${colors[type]} font-medium select-none`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
