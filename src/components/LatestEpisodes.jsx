'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 🔥 Fetch latest added episodes from Jikan API
async function fetchLatestEpisodes() {
  const res = await fetch('https://api.jikan.moe/v4/watch/episodes');
  const data = await res.json();
  return data.data || [];
}

export default function LatestEpisodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    (async () => {
      const ep = await fetchLatestEpisodes();
      setEpisodes(ep.slice(0, 12)); // limit to 12
    })();
  }, []);

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          🎬 <span>Son Çıkan Bölümler</span>
        </h2>
        <Link
          href="/browse?sort=recent"
          className="text-sm text-white/70 hover:text-pink-400 transition"
        >
          Tümünü Gör
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        {episodes.map((ep, i) => {
          const anime = ep.entry?.[0];
          if (!anime) return null;
          const cover =
            anime.images?.jpg?.large_image_url ||
            anime.images?.jpg?.image_url ||
            '';

          return (
            <Link
              key={i}
              href={`/anime/${anime.mal_id}`}
              className="group relative rounded-xl overflow-hidden bg-white/5 
                         backdrop-blur-sm border border-white/10 hover:border-pink-500/50 
                         shadow-md hover:shadow-pink-500/20 transition-all duration-300"
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={cover}
                  alt={anime.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                <p className="text-sm font-medium truncate">{anime.title}</p>
                <p className="text-xs text-pink-400 mt-1">
                  Bölüm {ep.episodes?.[0]?.mal_id || '—'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
