"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "popular", label: "En Popüler" },
    { value: "new", label: "Yeni Çıkanlar" },
    { value: "iconic", label: "İkonik" },
  ];

  const selected = options.find((o) => o.value === value)?.label || "Sırala";

  return (
    <div className="relative inline-block text-left select-none">
      {/* Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-2 min-w-[160px]
                   bg-gradient-to-r from-pink-500/20 to-pink-400/10 
                   backdrop-blur-xl text-pink-100 font-semibold rounded-2xl
                   px-5 py-2 border border-white/10 shadow-[0_0_20px_rgba(255,20,147,0.3)]
                   hover:shadow-[0_0_25px_rgba(255,105,180,0.5)]
                   transition-all duration-300"
      >
        <span>{selected}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-pink-300 text-sm"
        >
          ▼
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 z-50 rounded-2xl 
                       bg-[rgba(24,24,28,0.6)] backdrop-blur-2xl 
                       border border-white/10 shadow-[0_0_25px_rgba(255,20,147,0.25)] overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-5 py-2 text-sm font-medium transition-all duration-150 ${
                  value === opt.value
                    ? "bg-pink-500/30 text-white shadow-inner"
                    : "text-pink-100 hover:bg-pink-400/10 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
