// app/page.jsx
import { fetchTopAnime, fetchRecentAnime } from "@/lib/jikan";
import AnimeGrid from "@/components/AnimeGrid";

export const revalidate = 300; // ✅ must be a number, not an object

export default async function HomePage() {
  const [topAnime, recentAnime] = await Promise.all([
    fetchTopAnime(1, 6),
    fetchRecentAnime(1, 6),
  ]);

  return (
    <main className="px-8 py-10 space-y-10">
      {/* Hero Section */}
      <section className="rounded-3xl p-10 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-lg">
        <h1 className="text-5xl font-bold text-white">
          Discover your next favorite <span className="text-pink-500">Anime</span>
        </h1>
        <p className="mt-3 text-white/70">
          Clean glass UI, smooth hover effects, and fresh data from Jikan API.
        </p>
      </section>

      {/* This Season’s Highlights */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">✨ This Season’s Highlights</h2>
          <a href="/new" className="text-white/60 hover:text-pink-400 transition">
            See all
          </a>
        </div>
        <AnimeGrid animeList={recentAnime} />
      </section>

      {/* Popular Anime */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">🔥 Popular Anime</h2>
          <a href="/popular" className="text-white/60 hover:text-pink-400 transition">
            See all
          </a>
        </div>
        <AnimeGrid animeList={topAnime} />
      </section>
    </main>
  );
}
