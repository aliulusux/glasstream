'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const quotes = [
  "“Power comes in response to a need, not a desire.” — Goku",
  "“A lesson without pain is meaningless.” — Edward Elric",
  "“People’s lives don’t end when they die. It ends when they lose faith.” — Itachi Uchiha",
  "“If you don’t take risks, you can’t create a future.” — Monkey D. Luffy",
  "“A lesson learned the hard way is a lesson remembered forever.” — Levi Ackerman",
  "“Fear is freedom! Subjugation is liberation! Contradiction is truth!” — Satsuki Kiryuuin",
  "“The world isn’t as cruel as you take it to be.” — Mikasa Ackerman",
];

export default function NotFoundPage() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Pick a random anime quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white overflow-hidden relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400/30 rounded-full blur-sm"
            initial={{ y: Math.random() * 800, x: Math.random() * 1200, opacity: 0 }}
            animate={{
              y: [null, Math.random() * -800],
              opacity: [0.2, 0.7, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl z-10 text-center"
      >
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          404
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Oops! Looks like you’ve wandered into the void 🌌
        </p>

        {quote && (
          <p className="text-sm text-white/60 italic mb-8">{quote}</p>
        )}

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition"
        >
          🏠 Return Home
        </Link>
      </motion.div>

      <p className="mt-10 text-xs text-white/40">
        AnimeStream © {new Date().getFullYear()} — Powered by Supabase
      </p>
    </div>
  );
}
