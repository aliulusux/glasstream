// app/popular/page.jsx
"use client";
import { useEffect, useState } from "react";
import { fetchTopAnime } from "@/lib/jikan";
import AnimeGrid from "@/components/AnimeGrid";

export const revalidate = 300;

export default async function PopularAnimePage() {
  const topAnime = await fetchTopAnime(1, 24);
  const [page, setPage] = useState(1);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnime() {
      setLoading(true);
      const res = await fetchTopAnime(page, 24);
      setAnime(res);
      setLoading(false);
    }
    loadAnime();
  }, [page]);

  return (
    <main className="p-10 space-y-8">
      <h1 className="text-3xl font-bold text-white">Popular Anime 🔥</h1>
      {loading ? <p className="text-white/50">Loading...</p> : <AnimeGrid animeList={anime} />}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-pink-500/30 disabled:opacity-30"
        >
          ← Prev
        </button>
        <span className="text-white/70">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-pink-500/30"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
