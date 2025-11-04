// app/new/page.jsx
import AnimeGrid from "@/components/AnimeGrid";
import { fetchRecentAnime } from "@/lib/jikan";
import { Suspense } from "react";
import ShimmerGrid from "@/components/ShimmerGrid";

export const revalidate = 300;

export default async function NewPage() {
  const data = await fetchRecentAnime(1, 24);

  return (
    <section className="px-8 py-10">
      <h2 className="text-3xl font-bold text-white mb-6">🌸 This Season’s Highlights</h2>
      <Suspense fallback={<ShimmerGrid count={12} />}>
        <AnimeGrid animeList={Array.isArray(data) ? data : []} />
      </Suspense>
    </section>
  );
}
