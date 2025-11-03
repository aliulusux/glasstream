'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import GlowCard from './GlowCard';

export default function FloatingPlayer({ src, title, onClose, onProgress }) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const h = () => onProgress?.(Math.floor(v.currentTime));
    v.addEventListener('timeupdate', h);
    return () => v.removeEventListener('timeupdate', h);
  }, [onProgress]);

  if (!mounted) return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-4 right-4 z-[1000] w-[320px]"
    >
      <GlowCard className="overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 text-white/80">
          <div className="truncate">{title}</div>
          <button onClick={onClose} className="hover:text-white">✖</button>
        </div>
        <video ref={videoRef} src={src} controls className="w-full h-44 bg-black" />
      </GlowCard>
    </motion.div>,
    document.body
  );
}
