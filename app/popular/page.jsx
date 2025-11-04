// app/popular/page.jsx
import { fetchTopAnime } from "@/lib/jikan";
import AnimeGrid from "@/components/AnimeGrid";

export const revalidate = 300;

export default async function PopularAnimePage() {
  const topAnime = await fetchTopAnime(1, 24);

  return (
    <main className="p-10 space-y-8">
      <h1 className="text-3xl font-bold text-white">Popular Anime 🔥</h1>
      <AnimeGrid animeList={topAnime} />
    </main>
  );
}
