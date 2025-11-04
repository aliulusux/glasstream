"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// ✅ Universal image resolver (handles all Jikan variations)
function cardCover(anime) {
  return (
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.images?.webp?.large_image_url ||
    anime?.images?.webp?.image_url ||
    anime?.image_url ||
    anime?.cover_image ||
    anime?.coverUrl ||
    anime?.meta?.image ||
    "/no-cover.jpg"
  );
}

export default function AnimeCard({ item }) {
  const { user } = useAuth();
  const [fav, setFav] = useState(false);
  const [busy, setBusy] = useState(false);

  const cover = cardCover(item);

  async function toggleFavorite() {
    if (!user) {
      alert("Please log in to manage your favorites.");
      return;
    }

    setBusy(true);
    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("anime_id", item.mal_id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("anime_id", item.mal_id);
      setFav(false);
    } else {
      await supabase.from("favorites").upsert([
        {
          user_id: user.id,
          anime_id: item.mal_id,
          title: item.title,
          cover_url: cover,
          meta: item,
        },
      ]);
      setFav(true);
    }
    setBusy(false);
  }

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
      {/* ❤️ Favorite Button (top-right corner) */}
      <button
        onClick={toggleFavorite}
        disabled={busy}
        className="absolute top-2 right-2 z-10"
      >
        <motion.div
          animate={{ scale: fav ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Heart
            className={`w-6 h-6 ${
              fav
                ? "fill-pink-500 text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
                : "text-white/70 hover:text-pink-400"
            }`}
          />
        </motion.div>
      </button>

      {/* 📸 Cover Image or Placeholder */}
      {cover ? (
        <Image
          src={cover}
          alt={item.title || "anime"}
          width={400}
          height={600}
          className="w-full h-auto object-cover aspect-[3/4] rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full aspect-[3/4] flex items-center justify-center text-white/40 text-sm">
          No Image
        </div>
      )}

      {/* 🩵 Info section */}
      <div className="p-3">
        <h3 className="font-semibold text-white truncate">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
          {item.score && <span>⭐ {item.score}</span>}
          {item.year && <span>{item.year}</span>}
        </div>
        <Link
          href={`/anime/${item.mal_id}`}
          className="inline-block mt-3 px-3 py-1.5 text-sm rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
