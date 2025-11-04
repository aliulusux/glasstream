// app/popular/page.jsx
import AnimeGrid from "@/components/AnimeGrid";
import { fetchTopAnime } from "@/lib/jikan";
import { Suspense } from "react";
import ShimmerGrid from "@/components/ShimmerGrid";

export const revalidate = 300; // cache refresh every 5min

export default async function PopularPage() {
  const data = await fetchTopAnime(1, 24);

  return (
    <section className="px-8 py-10">
      <h2 className="text-3xl font-bold text-white mb-6">🔥 Popular Anime</h2>
      <Suspense fallback={<ShimmerGrid count={12} />}>
        <AnimeGrid animeList={Array.isArray(data) ? data : []} />
      </Suspense>
    </section>
  );
}
