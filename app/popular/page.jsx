// app/popular/page.jsx
import Link from "next/link";
import AnimeGrid from "@/components/AnimeGrid";
import { fetchTopAnime } from "@/lib/jikan";

export const revalidate = 0; // always fresh (or set a small number if you want ISR)
export const dynamic = "force-dynamic";

export default async function PopularPage({ searchParams }) {
  const page = Number(searchParams?.page) > 0 ? Number(searchParams.page) : 1;
  const limit = 24;

  const { data = [], pagination = {} } = await fetchTopAnime(page, limit);
  const hasPrev = page > 1;
  const hasNext = !!pagination?.has_next_page;

  return (
    <main className="px-6 pb-16">
      <h1 className="text-2xl font-semibold mb-6">🔥 Popular Anime</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">
          No anime available right now. Please try again later.
        </p>
      ) : (
        <AnimeGrid animeList={data} />
      )}

      <div className="mt-8 flex items-center gap-3">
        <Link
          href={`/popular${hasPrev ? `?page=${page - 1}` : ""}`}
          aria-disabled={!hasPrev}
          className={`px-4 py-2 rounded-xl transition ${
            hasPrev
              ? "bg-fuchsia-700/40 hover:bg-fuchsia-700/60"
              : "bg-white/5 text-white/40 pointer-events-none"
          }`}
        >
          Prev
        </Link>

        <span className="px-4 py-2 rounded-xl bg-white/5">Page {page}</span>

        <Link
          href={`/popular${hasNext ? `?page=${page + 1}` : ""}`}
          aria-disabled={!hasNext}
          className={`px-4 py-2 rounded-xl transition ${
            hasNext
              ? "bg-fuchsia-700/40 hover:bg-fuchsia-700/60"
              : "bg-white/5 text-white/40 pointer-events-none"
          }`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
