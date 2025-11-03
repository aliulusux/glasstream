'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AnimeGrid from '@/components/AnimeGrid';
import Link from 'next/link';

export default function MyListPage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyList() {
      try {
        const { data, error } = await supabase.from('user_favorites').select('*');
        if (error) throw error;
        setAnimeList(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyList();
  }, []);

  const cleanAnimeList = JSON.parse(JSON.stringify(animeList || []));

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💖 My Anime List</h1>
      {loading ? (
        <p className="text-center text-white/70">Loading your saved anime...</p>
      ) : animeList.length > 0 ? (
        <AnimeGrid animeList={cleanAnimeList} />
      ) : (
        <div className="text-center mt-10">
          <p className="text-white/60 mb-4">You haven’t added anything yet.</p>
          <Link
            href="/browse"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white hover:scale-105 transition"
          >
            Browse Anime →
          </Link>
        </div>
      )}
    </div>
  );
}
