'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAnimeById } from '@/lib/jikan';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import FavoriteButton from "@/components/FavoriteButton";

export default function AnimeDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inList, setInList] = useState(false);
  const [busy, setBusy] = useState(false);

  // fetch anime
  useEffect(() => {
    let active = true;
    (async () => {
      if (!id) return;
      const data = await fetchAnimeById(id);
      if (active) {
        setAnime(data);
        setLoading(false);
      }
    })();
    return () => (active = false);
  }, [id]);

  // check if in mylist
  useEffect(() => {
    if (!user || !id) return;
    (async () => {
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('anime_id', id)
        .maybeSingle();
      setInList(!!data);
    })();
  }, [user, id]);

  async function toggleFavorite() {
    if (!user) {
      alert('Please log in to add to My List.');
      return;
    }
    setBusy(true);
    if (inList) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('anime_id', id);
      setInList(false);
    } else {
      await supabase.from('favorites').upsert([
        {
          user_id: user.id,
          anime_id: id,
          title: anime.title,
          cover_url: anime.image,
          meta: anime,
        },
      ]);
      setInList(true);
    }
    setBusy(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-white/60 animate-pulse">
        Loading anime details...
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-3">Not Found</h1>
        <p className="text-white/60 mb-6">Could not load this anime.</p>
        <Link href="/" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full md:w-72 rounded-3xl border border-white/10 shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <FavoriteButton anime={animeData} />
          <p className="text-white/70 leading-relaxed whitespace-pre-line">
            {anime.synopsis || 'No description available.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-white/70">
            {anime.type && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Type: {anime.type}
              </div>
            )}
            {anime.year && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Year: {anime.year}
              </div>
            )}
            {anime.episodes && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Episodes: {anime.episodes}
              </div>
            )}
            {anime.score && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Score: {anime.score}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-6">
            <button
              onClick={toggleFavorite}
              disabled={busy}
              className={`px-5 py-2.5 rounded-xl font-medium shadow-md transition ${
                inList
                  ? 'bg-pink-600/80 hover:bg-pink-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              {busy ? '...' : inList ? '❤️ Remove from My List' : '♡ Add to My List'}
            </button>

            <Link
              href="/popular"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20"
            >
              Back to Popular
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
