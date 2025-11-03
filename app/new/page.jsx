import { fetchRecentAnime } from '@/lib/jikan';
import AnimeGrid from '@/components/AnimeGrid';

export const revalidate = 600;

export default async function NewPage() {
  const animeList = await fetchRecentAnime();

  // 👇 ÇÖZÜM: Veriyi burada JSON uyumlu hale getiriyoruz.
  const cleanAnimeList = JSON.parse(JSON.stringify(animeList || []));  

  return (
    <main className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🆕 New Anime</h1>
      <AnimeGrid animeList={cleanAnimeList} />
    </main>
  );
}
