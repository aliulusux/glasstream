"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { getSupabase } from "../lib/supabaseClient";

/**
 * 💖 FavoriteButton
 * - Uses Supabase `favorites` table instead of localStorage
 * - Syncs with user auth
 * - Includes glowing pulse animation when active
 */
export default function FavoriteButton({ anime, className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  const supabase = getSupabase();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user || null)
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchFavorite = async () => {
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("mal_id", anime.mal_id)
        .maybeSingle();
      setIsFavorite(!!data);
    };
    fetchFavorite();
  }, [user, anime.mal_id]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Favorilere eklemek için giriş yapmalısınız!");
      return;
    }

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("mal_id", anime.mal_id);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert([
        {
          user_id: user.id,
          mal_id: anime.mal_id,
          title: anime.title,
          image_url:
            anime?.images?.jpg?.large_image_url ||
            anime?.images?.jpg?.image_url ||
            anime?.image_url ||
            "",
          score: anime.score || null,
        },
      ]);
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`relative p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition ${
        isFavorite
          ? "text-pink-400 animate-pulse-glow"
          : "text-white/70 hover:text-pink-400"
      } ${className}`}
      title={isFavorite ? "Favorilerden Kaldır" : "Favorilere Ekle"}
    >
      <Heart
        size={18}
        className={`transition-all ${isFavorite ? "fill-pink-400" : ""}`}
      />
      {isFavorite && (
        <span className="absolute inset-0 rounded-full bg-pink-500/40 blur-md animate-pulse-glow" />
      )}
    </button>
  );
}
