"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import { Heart } from "lucide-react";

export default function FavoriteButton({ anime }) {
  const [isFav, setIsFav] = useState(false);

  // Load saved favorites from localStorage
  useEffect(() => {
    if (!anime?.mal_id) return;
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(saved.some((a) => a.mal_id === anime.mal_id));
  }, [anime]);

  // Toggle favorite
  const toggleFavorite = () => {
    if (!anime?.mal_id) return;
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (isFav) {
      updated = saved.filter((a) => a.mal_id !== anime.mal_id);
    } else {
      updated = [...saved, anime];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFav(!isFav);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`relative p-2 rounded-full transition-all duration-300
        border border-white/10 backdrop-blur-md shadow-md
        ${
          isFav
            ? "bg-pink-600/40 text-pink-400 shadow-[0_0_15px_rgba(255,105,180,0.6)] animate-pulse"
            : "bg-white/10 text-gray-300 hover:text-white hover:bg-white/20"
        }`}
    >
      <Heart
        className={`w-5 h-5 transition-transform ${
          isFav ? "fill-pink-500 scale-110" : "scale-100"
        }`}
      />
    </button>
  );
}