"use client";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites";
import { useAuth } from "@/components/AuthProvider";
import { Heart } from "lucide-react";

export default function FavoriteButton({ anime }) {
  const { cleanUser } = useAuth();
  const user = cleanUser || {};
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id && anime?.mal_id) {
      isFavorite(user.id, anime.mal_id).then(setFav);
    }
  }, [user, anime]);

  async function toggleFav() {
    if (!user?.id || !anime?.mal_id) return;
    setLoading(true);
    if (fav) await removeFavorite(user.id, anime.mal_id);
    else await addFavorite(user.id, anime);
    setFav(!fav);
    setLoading(false);
  }

  return (
    <button
      onClick={toggleFav}
      disabled={loading}
      className={`transition-all duration-300 flex items-center gap-2 ${
        fav
          ? "text-pink-500 hover:text-pink-400"
          : "text-white/70 hover:text-white"
      }`}
    >
      <Heart
        size={22}
        fill={fav ? "#ec4899" : "none"}
        strokeWidth={fav ? 0 : 2}
      />
      {fav ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
