"use client";

import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export default function AnimeCard({ item }) {
  if (!item) return null;

  const image =
    item?.images?.jpg?.large_image_url ||
    item?.images?.jpg?.image_url ||
    item?.image_url ||
    "/no-cover.jpg";

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
      {/* Image */}
      <Link href={`/anime/${item.id}`} prefetch={false}>
        <div className="relative">
          <img
            src={image}
            alt={item.title}
            className="w-full h-72 object-cover rounded-3xl transition duration-300 group-hover:opacity-90"
          />
          {/* ❤️ Animated Favorite Button */}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton anime={item} />
          </div>

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 space-y-1">
        <h3
          title={item.title}
          className="font-semibold text-white truncate"
        >
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>⭐ {item.score || "N/A"}</span>
          <span>{item.year || "—"}</span>
        </div>

        <Link
          href={`/anime/${item.id}`}
          className="inline-block mt-2 px-3 py-1.5 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-white/80 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
