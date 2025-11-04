import Link from "next/link";
import AnimeGrid from "@/components/AnimeGrid";
import { fetchRecentAnime, fetchTopAnime } from "@/lib/jikan";

export const revalidate = 120;

export default async function HomePage() {
  const [{ data: seasonals = [] }, { data: top = [] }] = await Promise.all([
    fetchRecentAnime(1, 12),
    fetchTopAnime(1, 12)
  ]);

  return (
    <>
      {/* Hero */}
      <section className="glass p-8 sm:p-10 mb-10">
        <div className="text-3xl sm:text-5xl font-extrabold leading-tight">
          Discover your next favorite <span className="text-accent drop-shadow">Anime</span>
        </div>
        <p className="mt-4 text-white/70">
          Clean glass UI, smooth hover effects, and fresh data from Jikan API.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/popular" className="btn">Watch Now</Link>
          <Link href="/browse" className="btn">Explore</Link>
        </div>
      </section>

      {/* This Season */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">✨ This Season’s Highlights</h2>
          <Link href="/new" className="link">See all</Link>
        </div>
        <AnimeGrid animeList={seasonals} />
      </section>

      {/* Popular */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">🔥 Popular Anime</h2>
          <Link href="/popular" className="link">See all</Link>
        </div>
        <AnimeGrid animeList={top} />
      </section>
    </>
  );
}
