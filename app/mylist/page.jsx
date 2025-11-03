'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AnimeGrid from '@/components/AnimeGrid';
import Link from 'next/link';

export default function MyListPage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('user_favorites').select('*');
        setAnimeList(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return <div className="text-center text-white/60 p-10 animate-pulse">Loading your list...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💖 My List</h1>
      {animeList.length > 0 ? (
        <AnimeGrid animeList={animeList} />
      ) : (
        <div className="text-center mt-10">
          <p className="text-white/60 mb-4">You haven’t added anything yet.</p>
          <Link
            href="/popular"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white hover:scale-105 transition"
          >
            Browse Anime →
          </Link>
        </div>
      )}
    </main>
  );
}
