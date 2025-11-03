"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

export default function AnimeCard({ anime }) {
  const image =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    anime.image_url ||
    "/no-cover.jpg";

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg transition hover:scale-[1.03] hover:shadow-xl">
      {/* Anime Cover */}
      <Link href={`/anime/${anime.mal_id}`} className="block">
        <Image
          src={image}
          alt={anime.title}
          width={300}
          height={400}
          className="w-full h-auto object-cover transition duration-300 group-hover:opacity-80"
        />
      </Link>

      {/* 🩷 Floating Heart Button (top-right) */}
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton anime={anime} small />
      </div>

      {/* Card Info */}
      <div className="p-3 text-sm text-white/90 bg-gradient-to-t from-black/60 via-black/20 to-transparent absolute bottom-0 w-full">
        <h3 className="font-semibold truncate">{anime.title}</h3>
        <div className="flex items-center gap-2 text-xs text-white/60">
          {anime.score && (
            <span className="flex items-center gap-1">
              ⭐ {anime.score.toFixed(2)}
            </span>
          )}
          {anime.year && <span>{anime.year}</span>}
        </div>
      </div>
    </div>
  );
}
