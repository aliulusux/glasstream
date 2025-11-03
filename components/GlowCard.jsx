'use client';
import { motion } from 'framer-motion';

export default function GlowCard({ className = '', children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={
        `rounded-2xl border border-white/10 bg-white/6
         backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.25)]
         hover:shadow-[0_12px_60px_rgba(120,80,255,.35)]
         ${className}`
      }
    >
      {children}
    </motion.div>
  );
}
