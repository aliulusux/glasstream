"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnimeGrid from "@/components/AnimeGrid";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!query) return;
    async function fetchResults() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=24`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");
        const { data, pagination } = await res.json();

        setAnimeList((prev) => (page === 1 ? data : [...prev, ...data]));
        setHasMore(pagination?.has_next_page ?? false);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query, page]);

  return (
    <main className="p-10 space-y-10">
    <Header />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Search Results for:{" "}
          <span className="text-pink-400">{query || "..."}</span>
        </h1>
      </div>

      {loading && animeList.length === 0 ? (
        <p className="text-white/50">Loading results...</p>
      ) : animeList.length === 0 ? (
        <p className="text-white/50">No anime found for “{query}”.</p>
      ) : (
        <AnimeGrid animeList={animeList} />
      )}

      {/* Pagination */}
      {animeList.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-pink-500/30 disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="text-white/70">Page {page}</span>
          <button
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-pink-500/30 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
