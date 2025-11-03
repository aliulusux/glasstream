// /app/new/page.jsx
"use client";
import { useEffect, useState } from "react";
import { fetchRecentAnime } from "@/lib/jikan";
import AnimeGrid from "@/components/AnimeGrid";
import { useSearchParams, useRouter } from "next/navigation";

export default function NewPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const page = Number(sp.get("page") || "1");

  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    let on = true;
    (async () => {
      const res = await fetchRecentAnime(page);
      if (!on) return;
      setItems(res.items);
      setHasNext(res.pageInfo.hasNext);
    })();
    return () => (on = false);
  }, [page]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">This Season</h1>
      <AnimeGrid items={items} />

      <div className="flex items-center gap-2 justify-center pt-4">
        <button
          onClick={() => router.push(`/new?page=${Math.max(1, page - 1)}`)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
        >
          Geri
        </button>
        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Page {page}</span>
        <button
          onClick={() => router.push(`/new?page=${page + 1}`)}
          disabled={!hasNext}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
        >
          İleri
        </button>
      </div>
    </section>
  );
}
