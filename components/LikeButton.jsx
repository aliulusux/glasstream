'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LikeButton({ liked, count, onToggle }) {
  const [burst, setBurst] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={async ()=>{ setBurst(true); await onToggle?.(); setTimeout(()=>setBurst(false), 400); }}
        className={`p-2 rounded-full border ${liked?'bg-pink-500/80 border-pink-300':'bg-black/40 border-white/20'} text-white`}
        aria-label="Like"
      >{liked?'❤️':'🤍'}</button>
      <span className="absolute -bottom-1 right-0 text-xs text-white/90">❤ {count||0}</span>

      <AnimatePresence>
        {burst && (
          <motion.div
            initial={{ scale: .5, opacity: .8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full bg-pink-400/40 blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
