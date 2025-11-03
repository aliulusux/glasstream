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
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {animeList.map((a, i) => {
        const cover = cardCover(a);
        const score = Number(a?.score) || null;

        return (
          <Link
            href={`/anime/${a?.mal_id || a?.id || ''}`}
            key={a?.mal_id || i}
            className="relative group rounded-2xl overflow-hidden bg-white/10 border border-white/10 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
          >
            {cover ? (
              <Image
                src={cover}
                alt={a?.title || 'anime cover'}
                width={300}
                height={400}
                className="w-full h-[380px] object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[380px] bg-gradient-to-br from-purple-800/40 to-pink-800/40 flex items-center justify-center text-white/60">
                No Image
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
              <h2 className="text-white font-semibold text-sm truncate">
                {a?.title || 'Unknown'}
              </h2>
              {score && (
                <p className="text-pink-300 text-xs mt-1">
                  ⭐ {score.toFixed(1)}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
