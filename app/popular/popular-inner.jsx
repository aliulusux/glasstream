'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchTopAnime } from '@/lib/jikan';
import AnimeGrid from '@/components/AnimeGrid';

export default function PopularInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const page = Number(sp.get('page') || '1');

  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    let on = true;
    (async () => {
      const res = await fetchTopAnime(page);
      if (!on) return;
      setItems(res.items);
      setHasNext(res.pageInfo.hasNext);
    })();
    return () => (on = false);
  }, [page]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">🔥 Popular Anime</h1>
      <AnimeGrid items={items} />
      <div className="flex items-center gap-2 justify-center pt-4">
        <button
          onClick={() => router.push(`/popular?page=${Math.max(1, page - 1)}`)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
        >
          Prev
        </button>
        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Page {page}</span>
        <button
          onClick={() => router.push(`/popular?page=${page + 1}`)}
          disabled={!hasNext}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
