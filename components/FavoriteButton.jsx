"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";
import { Heart } from "lucide-react";

/**
 * FavoriteButton – client-only component for adding/removing favorites
 * Works safely with Supabase and Next.js App Router
 */
export default function FavoriteButton({ anime }) {
  const { user } = useAuth();
  const [inList, setInList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // --- Check if this anime is already in user's favorites ---
  useEffect(() => {
    if (!user || !anime?.mal_id) {
      setLoading(false);
      return;
    }

    (async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("anime_id", anime.mal_id)
        .maybeSingle();

      if (!error && data) setInList(true);
      setLoading(false);
    })();
  }, [user, anime?.mal_id]);

  // --- Toggle favorite ---
  async function handleToggle() {
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

  // --- Loading state (while checking DB) ---
  if (loading) {
    return (
      <button
        disabled
        className="px-4 py-2.5 rounded-xl bg-white/5 text-white/50 cursor-wait"
      >
        Checking...
      </button>
    );
  }

  // --- Render favorite button ---
  return (
    <button
      onClick={handleToggle}
      disabled={busy}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition 
        ${inList ? "bg-pink-600/80 hover:bg-pink-600 text-white" : "bg-white/10 hover:bg-white/20 text-white/80"}
        ${busy ? "opacity-70 cursor-wait" : ""}`}
    >
      <Heart
        size={20}
        fill={inList ? "currentColor" : "none"}
        className={`transition-transform ${busy ? "scale-90" : "hover:scale-110"}`}
      />
      {busy ? "Saving..." : inList ? "Remove from My List" : "Add to My List"}
    </button>
  );
}
