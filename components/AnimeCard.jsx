"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FavoriteButton from "@/components/FavoriteButton";

// fallback for broken covers
const getCover = (anime) =>
  anime?.images?.jpg?.large_image_url ||
  anime?.images?.jpg?.image_url ||
  anime?.image_url ||
  "/no-cover.jpg";

// glow color map based on your own themes
const themeColors = {
  sunset: "from-pink-500 via-red-400 to-orange-400",
  neon: "from-cyan-400 via-blue-400 to-purple-500",
  amethyst: "from-violet-500 via-fuchsia-500 to-pink-400",
  dark: "from-gray-600 via-gray-800 to-gray-900",
  light: "from-gray-200 via-white to-gray-100",
  iced: "from-sky-400 via-cyan-300 to-blue-300",
  pastel: "from-pink-300 via-purple-300 to-blue-300",
  default: "from-pink-500 via-fuchsia-500 to-violet-500",
};

export default function AnimeCard({ item }) {
  // 🌈 Detect user’s active theme from localStorage (your existing theme system)
  const theme =
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "default"
      : "default";
  const gradient = themeColors[theme] || themeColors.default;

  const image = getCover(item);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg backdrop-blur-lg hover:shadow-pink-500/20 transition-all duration-500"
    >
      <Link href={`/anime/${item.mal_id}`} className="block relative">
        {/* anime cover */}
        <div className="relative w-full h-72 overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 50vw, 25vw"
            priority={false}
          />

          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />

          {/* ✨ trending badge */}
          {item.trending && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg backdrop-blur-md`}
            >
              ✨ Trending
            </motion.div>
          )}

          {/* ❤️ favorite button hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
          >
            <FavoriteButton anime={item} />
          </motion.div>
        </div>

        {/* anime info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b-3xl backdrop-blur-sm">
          <h3 className="font-semibold text-sm md:text-base truncate mb-1">
            {item.title}
          </h3>
          <div className="flex items-center text-xs text-white/70 gap-2">
            {item.score && (
              <span className="flex items-center gap-1">
                ⭐ <span>{item.score}</span>
              </span>
            )}
            {item.year && <span>{item.year}</span>}
            {item.type && <span>{item.type}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
