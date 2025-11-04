// app/new/page.jsx
import { fetchRecentAnime } from "@/lib/jikan";
import AnimeGrid from "@/components/AnimeGrid";

export const revalidate = 300;

export default async function NewAnimePage() {
  const recentAnime = await fetchRecentAnime(1, 24);

  return (
    <main className="p-10 space-y-8">
      <h1 className="text-3xl font-bold text-white">This Season’s Highlights ✨</h1>
      <AnimeGrid animeList={recentAnime} />
    </main>
  );
}
