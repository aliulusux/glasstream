import { useEffect, useState } from "react";
import AnimeGrid from "../components/AnimeGrid";
import Pagination from "../components/Pagination";

export default function New() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNew() {
      try {
        setLoading(true);
        const res = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}&limit=24`);
        const json = await res.json();
        setList(json?.data || []);
        setTotalPages(json?.pagination?.last_visible_page || 1);
      } catch (e) {
        console.error("New fetch error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchNew();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">This Season</h1>
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <AnimeGrid animeList={list} />
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  );
}
