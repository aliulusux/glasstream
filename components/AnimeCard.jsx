'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AnimeCard({ anime }) {
  if (!anime) return null;

  const img =
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image_url ||
    '';

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,79,176,0.35)]"
    >
      {/* Anime cover */}
      <Image
        src={img}
        alt={anime.title}
        width={300}
        height={420}
        className="w-full h-[260px] object-cover"
      />

      {/* Glassy overlay for title + score */}
      <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-white/10 backdrop-blur-lg backdrop-brightness-125 border-t border-white/10">
        <h3 className="text-sm font-medium text-white/90 truncate">
          {anime.title}
        </h3>
        {anime.score && (
          <div className="mt-0.5 flex items-center gap-1 text-xs text-pink-400">
            <span>★</span>
            <span>{anime.score}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
