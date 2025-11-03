'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toggleLike, getLikeCounts } from '@/lib/likes';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { motion } from 'framer-motion';

/**
 * AnimeCard Component
 * - Displays anime cover, title, score, and like button
 * - Integrates with Supabase 'anime_likes' table
 */

export default function AnimeCard({ anime }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  const animeId = anime?.mal_id || anime?.id;

  // Load like count
  useEffect(() => {
    if (!animeId) return;
    (async () => {
      const res = await getLikeCounts(supabase, [animeId]);
      if (res?.[0]) setLikes(res[0].likes || 0);
    })();
  }, [animeId, supabase]);

  // Handle like toggle
  const handleLike = async () => {
    if (!user) {
      alert('Please log in to like anime ❤️');
      return;
    }
    setLoading(true);
    const { liked: newLiked, likes: newCount } = await toggleLike(
      supabase,
      user.id,
      animeId
    );
    setLiked(newLiked);
    setLikes(newCount);
    setLoading(false);
  };

  const cover =
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image_url ||
    '/no-cover.jpg';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300"
    >
      <Link href={`/anime/${animeId}`} className="block">
        <Image
          src={cover}
          alt={anime.title}
          width={300}
          height={400}
          className="object-cover w-full h-[400px]"
          priority={false}
        />
      </Link>

      <div className="p-3 text-center text-white">
        <h3 className="text-base font-semibold truncate">{anime.title}</h3>
        {anime.score && (
          <p className="text-sm text-purple-300">⭐ {anime.score.toFixed(1)}</p>
        )}
      </div>

      {/* Like button */}
      <button
        onClick={handleLike}
        disabled={loading}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-lg border ${
          liked
            ? 'bg-pink-500/70 hover:bg-pink-500 text-white'
            : 'bg-black/40 hover:bg-white/20 text-white'
        } transition-all`}
      >
        {liked ? '❤️' : '🤍'}
      </button>

      {/* Like count */}
      <div className="absolute bottom-3 right-4 text-sm text-white/80">
        ❤️ {likes}
      </div>
    </motion.div>
  );
}
