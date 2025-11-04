"use client";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function AnimeCard({ a }) {
  const img =
    a?.images?.jpg?.large_image_url ||
    a?.images?.jpg?.image_url ||
    a?.image_url ||
    "";

  return (
    <div className="group relative card-hover-glow">
      <Link href={`/anime/${a.mal_id}`} className="block">
        <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,79,176,0.35)]">
          <Image
            src={img}
            alt={a.title}
            width={300}
            height={420}
            className="w-full h-[260px] object-cover transform transition group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-white/10 backdrop-blur-lg backdrop-brightness-125 border-t border-white/10">
        <h3 className="text-sm font-medium text-white/90 truncate">
          {anime.title}
        </h3>
        {a.score && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-pink-400">
                <span>★</span>
                <span>{a.score}</span>
            </div>
        )}
      </Link>
      </div>
      <div className="absolute right-2 top-2">
        <FavoriteButton item={a} />
      </div>
    </div>
  );
}
