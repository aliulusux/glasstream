// /app/page.jsx
"use client";

import { useEffect, useState } from "react";
import { fetchRecentAnime, fetchTopAnime } from "@/lib/jikan";
import AnimeGrid from "@/components/AnimeGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const [recent, setRecent] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    let on = true;
    (async () => {
      const r = await fetchRecentAnime(1);
      const t = await fetchTopAnime(1);
      if (!on) return;
      setRecent(r.items.slice(0, 10));
      setTop(t.items.slice(0, 10));
    })();
    return () => (on = false);
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">
        <div className="max-w-3xl">
          <p className="text-sm text-white/70 mb-2">Featured</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Discover your next favorite <span className="text-pink-400">Anime</span>
          </h1>
          <p className="text-white/70 mt-4">
            Clean glass UI, smooth hover effects, and fresh data from Jikan API.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/popular" className="px-4 py-2 rounded-xl bg-pink-500/80 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/25">
              Watch Now
            </Link>
            <Link href="/new" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">
              Explore
            </Link>
          </div>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">This Season’s Highlights</h2>
          <Link href="/new" className="text-sm text-white/70 hover:text-white">See all</Link>
        </div>
        <AnimeGrid items={recent} />
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Anime</h2>
          <Link href="/popular" className="text-sm text-white/70 hover:text-white">See all</Link>
        </div>
        <AnimeGrid items={top} />
      </section>
    </div>
  );
}
