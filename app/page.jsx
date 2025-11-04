"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimeGrid from "@/components/AnimeGrid";
import { fetchRecentAnime, fetchTopAnime } from "@/lib/jikan";

export default function HomePage() {
  const [recent, setRecent] = useState([]);
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch anime data
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [recentData, topData] = await Promise.all([
          fetchRecentAnime(12),
          fetchTopAnime(12),
        ]);
        if (!active) return;
        setRecent(recentData);
        setTop(topData);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen text-white px-6 md:px-10 lg:px-20 py-10 space-y-20 bg-gradient-to-b from-[#0b0018] via-[#120029] to-[#0b0018] overflow-hidden">

      {/* 🎥 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <h2 className="text-sm text-white/50 mb-2">Featured</h2>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
        >
          Discover your next favorite{" "}
          <span className="text-pink-500">Anime</span>
        </motion.h1>
        <p className="text-white/70 max-w-2xl mb-8">
          Clean glass UI, smooth hover effects, and fresh data from Jikan API.
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium shadow-lg transition-all duration-300"
          >
            Watch Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 font-medium transition-all duration-300"
          >
            Explore
          </motion.button>
        </div>
      </motion.section>

      {/* 🌸 Seasonal Anime */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            animate={{
              textShadow: [
                "0 0 5px #ec4899",
                "0 0 15px #ec4899",
                "0 0 5px #ec4899",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-xl font-bold"
          >
            This Season’s Highlights ✨
          </motion.h2>
          <a
            href="/browse"
            className="text-sm text-white/60 hover:text-white transition"
          >
            See all
          </a>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-3xl bg-white/5 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <AnimeGrid
            items={recent.map((a, i) => ({
              ...a,
              trending: i < 3, // add glow badge to first 3
            }))}
          />
        )}
      </motion.section>

      {/* 🔥 Popular Anime */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            animate={{
              textShadow: [
                "0 0 5px #38bdf8",
                "0 0 15px #38bdf8",
                "0 0 5px #38bdf8",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-xl font-bold"
          >
            Popular Anime 💫
          </motion.h2>
          <a
            href="/popular"
            className="text-sm text-white/60 hover:text-white transition"
          >
            See all
          </a>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-3xl bg-white/5 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <AnimeGrid items={top} />
        )}
      </motion.section>
    </main>
  );
}


/*<Link href="/popular" className="text-sm text-white/70 hover:text-white">See all</Link>*/
