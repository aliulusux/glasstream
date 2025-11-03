import { fetchTopAnime } from '@/lib/jikan';
import AnimeGrid from '@/components/AnimeGrid';

export const revalidate = 600;

export default async function PopularPage() {
  const animeList = await fetchTopAnime();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Popular Anime</h1>
      <AnimeGrid animeList={animeList || []} />
    </main>
  );
}
