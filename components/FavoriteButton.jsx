"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import { Heart } from "lucide-react";

export default function FavoriteButton({ anime }) {
  const { user } = useAuth();
  const [inList, setInList] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user || !anime?.id) return;

    (async () => {
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("anime_id", anime.id)
        .maybeSingle();
      setInList(!!data);
    })();
  }, [user, anime?.id]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please log in to manage favorites.");
      return;
    }

    setBusy(true);
    if (inList) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("anime_id", anime.id);
      setInList(false);
    } else {
      await supabase.from("favorites").upsert([
        {
          user_id: user.id,
          anime_id: anime.id,
          title: anime.title,
          cover_url:
            anime.images?.jpg?.large_image_url ||
            anime.images?.jpg?.image_url ||
            anime.image_url,
        },
      ]);
      setInList(true);
    }
    setBusy(false);
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={busy}
      className={`relative flex items-center justify-center w-8 h-8 rounded-full 
        bg-black/40 backdrop-blur-md border border-white/10 
        hover:bg-black/60 transition duration-300 ${
          inList ? "text-pink-500" : "text-white/70 hover:text-pink-400"
        }`}
    >
      <Heart
        className={`w-5 h-5 ${
          inList ? "fill-pink-500" : "fill-transparent"
        } transition-all duration-500 ease-out`}
      />
      {inList && (
        <span className="absolute inset-0 rounded-full animate-ping bg-pink-500/30" />
      )}
    </button>
  );
}
