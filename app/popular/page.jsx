'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { fetchTopAnime } from '@/lib/jikan';
import AnimeGrid from '@/components/AnimeGrid';

export default function PopularPage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTopAnime();
        setAnimeList(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load popular anime.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (error)
    return <div className="text-center text-pink-400 p-10">{error}</div>;
  if (loading)
    return <div className="text-center text-white/60 p-10 animate-pulse">Loading popular anime...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Popular Anime</h1>
      <AnimeGrid animeList={animeList} />
    </main>
  );
}
