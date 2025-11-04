// /app/popular/page.jsx
import AnimeGrid from "@/components/AnimeGrid";
import { fetchTopAnime } from "@/lib/jikan";
import Link from "next/link";

export const revalidate = 300; // cache refresh every 5 minutes

export default async function PopularPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { data: animeList, pagination } = await fetchTopAnime(page, 24);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span className="text-orange-400 text-2xl">🔥</span>
        Popular Anime
      </h1>

      {/* Anime Grid */}
      {animeList.length > 0 ? (
        <AnimeGrid animeList={animeList} />
      ) : (
        <p className="text-center text-gray-400 mt-20">
          No popular anime found 😢
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        {/* Prev Button */}
        {page > 1 ? (
          <Link
            href={`/popular?page=${page - 1}`}
            className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all duration-200"
          >
            Prev
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
          >
            Prev
          </button>
        )}

        {/* Current Page */}
        <span className="text-gray-300 font-medium">Page {page}</span>

        {/* Next Button */}
        {pagination?.has_next_page ? (
          <Link
            href={`/popular?page=${page + 1}`}
            className="px-4 py-2 rounded-lg bg-pink-600/30 text-white hover:bg-pink-500/40 backdrop-blur-md border border-pink-400/20 transition-all duration-200 shadow-[0_0_10px_rgba(255,105,180,0.3)]"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
