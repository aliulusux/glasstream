'use client';

import Image from 'next/image';
import Link from 'next/link';

function cardCover(anime) {
  return (
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image_url ||
    ''
  );
}

export default function AnimeGrid({ animeList = [] }) {
  if (!Array.isArray(animeList)) animeList = [];

  return (
    <div className="w-full">
      {/* 🟣 Show message if list is empty */}
      {animeList.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No anime available right now. Please try again later.
        </p>
      )}

      {/* 🟢 Anime grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        {animeList.map((a, i) => {
          const cover = cardCover(a);
          const score = Number(a?.score) || null;

          return (
            <Link
              key={i}
              href={`/anime/${a.mal_id}`}
              className="group relative block overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-md transition-all duration-300"
            >
              <Image
                src={cover}
                alt={a.title}
                width={300}
                height={400}
                className="w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 text-sm text-center">
                <h3 className="font-medium text-white truncate">{a.title}</h3>
                {score && (
                  <p className="text-xs text-gray-400 mt-1">
                    ⭐ {score.toFixed(1)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
