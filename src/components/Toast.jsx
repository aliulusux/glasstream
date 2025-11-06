import React from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export default function Toast({ toast }) {
  if (!toast) return null;
  const { msg, type } = toast;

  return (
    <AnimatePresence>
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: -60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
          px-6 py-3.5 rounded-2xl backdrop-blur-2xl border 
          shadow-[0_8px_40px_rgba(255,255,255,0.15)]
          ${colors[type]} flex items-center gap-3 
          font-semibold text-[15px] tracking-wide 
          select-none`}
      >
        {icons[type]}
        <span>{msg}</span>
      </motion.div>
    </AnimatePresence>
  );
}
