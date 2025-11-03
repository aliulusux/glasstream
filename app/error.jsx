'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white px-6">
      {/* Animated error icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="url(#grad)"
          className="w-20 h-20 drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.div>

      {/* Error text */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold mb-2"
      >
        Something went wrong
      </motion.h1>
      <p className="text-white/70 max-w-md mb-8">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset?.()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all font-semibold"
        >
          🔁 Try Again
        </button>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-2xl border border-white/20 transition-all font-semibold"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
