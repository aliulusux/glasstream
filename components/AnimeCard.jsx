"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

export default function AnimeCard({ anime }) {
  if (!anime) return null;

  // 🧠 Safely access image fields
  const image =
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image_url ||
    "/no-cover.jpg";

  const title = anime?.title || "Untitled";
  const year = anime?.year || "Unknown";
  const score = anime?.score ? anime.score.toFixed(2) : "–";

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg transition hover:scale-[1.03] hover:shadow-xl">
      {/* ✅ Anime Cover (never breaks) */}
      <Link href={`/anime/${anime?.mal_id || "#"}`} className="block">
        <div className="relative w-full h-[360px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-300 group-hover:opacity-80"
            onError={(e) => {
              e.currentTarget.src = "/no-cover.jpg";
            }}
          />
        </div>
      </Link>

      {/* ❤️ Floating Heart Button */}
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton anime={anime} small />
      </div>

      {/* Info Overlay */}
      <div className="p-3 text-sm text-white/90 bg-gradient-to-t from-black/60 via-black/20 to-transparent absolute bottom-0 w-full">
        <h3 className="font-semibold truncate">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>⭐ {score}</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}
