import { Suspense } from "react";
import AnimeCard from "@/components/AnimeCard";
import AutoCarousel from "@/components/AutoCarousel";

// 🚀 Prevent build-time crash (use runtime fetch)
export const dynamic = "force-dynamic";

// 🔥 Fetch top anime (Popular)
async function fetchHot() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime", {
      next: { revalidate: 600 },
    });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (err) {
    console.error("fetchHot error:", err);
    return [];
  }
}

// 🍂 Fetch current season anime (Seasonal)
async function fetchSeason() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/seasons/now", {
      next: { revalidate: 600 },
    });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (err) {
    console.error("fetchSeason error:", err);
    return [];
  }
}

export default async function HomePage() {
  const [hotAnimes, seasonAnimes] = await Promise.all([
    fetchHot(),
    fetchSeason(),
  ]);

  return (
    <div className="min-h-screen transition-colors duration-500 text-gray-900 dark:text-white bg-gradient-to-b from-[#f8f8ff] via-[#eceaff] to-[#d8d6ff] dark:from-[#120022] dark:via-[#180033] dark:to-[#100022]">

      {/* Featured Carousel */}
      <section className="pt-6 px-4 max-w-7xl mx-auto">
        {seasonAnimes.length > 0 ? (
          <AutoCarousel title="This Season's Highlights" animeList={seasonAnimes} />
        ) : (
          <div className="text-center text-gray-400 py-20">
            ⚠️ Could not load seasonal anime — try again later.
          </div>
        )}
      </section>

      {/* Popular List */}
      <section className="pt-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-3">🔥 Popular Anime</h2>
        {hotAnimes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {hotAnimes.map((a, i) => (
              <AnimeCard key={i} anime={a || { title: "Unknown" }} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10">
            ⚠️ Could not load popular anime.
          </div>
        )}
      </section>
    </div>
  );
}
