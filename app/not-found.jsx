'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();
  const quotes = [
    '“Power comes in response to a need, not a desire.” — Goku',
    '“A lesson without pain is meaningless.” — Edward Elric',
    '“People’s lives don’t end when they die. It ends when they lose faith.” — Itachi Uchiha',
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
      >
        404
      </motion.h1>

      <p className="text-lg mt-3 text-white/80">
        You seem lost in the anime universe 🌌
      </p>
      <p className="text-sm mt-2 italic text-white/60">{randomQuote}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition"
        >
          ⬅ Go Back
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}
