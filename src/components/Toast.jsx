import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

const icons = {
  info: <Info className="w-5 h-5 text-blue-300" />,
  success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  error: <XCircle className="w-5 h-5 text-rose-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
};

const colors = {
  info: "bg-white/10 text-white/90 border-blue-400/20",
  success: "bg-white/10 text-emerald-200 border-emerald-400/20",
  error: "bg-white/10 text-rose-200 border-rose-400/20",
  warning: "bg-white/10 text-amber-200 border-amber-400/20",
};


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
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed top-8 left-1/2 -translate-x-1/2 z-[9999]
                px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/20
                shadow-[0_0_30px_rgba(255,255,255,0.2)]
                text-center ${colors[type]} font-semibold tracking-wide`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
