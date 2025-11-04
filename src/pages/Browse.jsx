import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AnimeGrid from "../components/AnimeGrid";
import Pagination from "../components/Pagination";

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const endpoint = q
          ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&page=${page}&sfw`
          : `https://api.jikan.moe/v4/top/anime?page=${page}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        setAnimeList(data?.data || []);
        setTotalPages(data?.pagination?.last_visible_page || 1);
      } catch (e) {
        console.error("Browse fetch error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    setSearchParams({ q: q || "", page: String(page) });
  }, [q, page, setSearchParams]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{q ? `Search: ${q}` : "Browse"}</h1>
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <AnimeGrid animeList={animeList} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
