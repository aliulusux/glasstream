"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";
import { Heart } from "lucide-react";

export default function FavoriteButton({ anime, small = false }) {
  // 🩵 Prevent errors on server
  if (typeof window === "undefined") return null;

  const { user } = useAuth();
  const [inList, setInList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user || !anime?.mal_id) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("anime_id", anime.mal_id)
        .maybeSingle();
      setInList(!!data);
      setLoading(false);
    })();
  }, [user, anime?.mal_id]);

  async function toggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      alert("Please log in to use favorites!");
      return;
    }
    setBusy(true);
    if (inList) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("anime_id", anime.mal_id);
      setInList(false);
    } else {
      await supabase.from("favorites").upsert([
        {
          user_id: user.id,
          anime_id: anime.mal_id,
          title: anime.title,
          cover_url:
            anime.images?.jpg?.large_image_url ||
            anime.images?.jpg?.image_url ||
            anime.image_url ||
            "",
          meta: anime,
        },
      ]);
      setInList(true);
    }
    setBusy(false);
  }

  const size = small ? 22 : 28;

  return (
    <button
      onClick={toggleFavorite}
      disabled={busy || loading}
      className={`relative transition duration-200 ${
        small ? "p-1" : "p-2"
      } rounded-full ${
        inList
          ? "text-pink-500 hover:text-pink-400"
          : "text-white/60 hover:text-white"
      } ${busy ? "opacity-70" : ""}`}
      aria-label="Toggle Favorite"
    >
      {/* 💖 Animated Glow */}
      <Heart
        size={size}
        fill={inList ? "currentColor" : "none"}
        className={`transition-all duration-300 ${
          inList
            ? "scale-110 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] animate-pulse-slow"
            : "scale-100"
        }`}
      />

      {/* Pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 4px rgba(236, 72, 153, 0.3));
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.8));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 4px rgba(236, 72, 153, 0.3));
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.8s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
