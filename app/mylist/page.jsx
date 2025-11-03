'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AnimeCard from '@/components/AnimeCard';
import Link from 'next/link';

export default function MyListPage() {
  const [animeList, setAnimeList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        fetchMyList(data.user.id);
      }
    };
    getUser();
  }, []);

  const fetchMyList = async (uid) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('anime_id, anime_title, cover_image')
      .eq('user_id', uid);

    if (!error) setAnimeList(data);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#10061f] to-[#1a1030] text-white">
      <h1 className="text-3xl font-bold mb-8">⭐ My Favorite Anime</h1>
      {animeList.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {animeList.map((anime) => (
            <AnimeCard key={anime.anime_id} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-white/70">
          <p>You haven’t added any anime yet.</p>
          <Link
            href="/browse"
            className="mt-4 inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition"
          >
            Browse Anime
          </Link>
        </div>
      )}
    </div>
  );
}
