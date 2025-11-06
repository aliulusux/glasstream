import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AnimeGrid from "../components/AnimeGrid";

export default function MyList() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      // Try Supabase session first
      const { data } = await supabase.auth.getSession();
      let currentUser = data?.session?.user || null;

      // Fallback to localStorage
      if (!currentUser) {
        const stored = localStorage.getItem("google_user");
        if (stored) currentUser = JSON.parse(stored);
      }

      setUser(currentUser);
      setLoading(false);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Fetch favorites from localStorage or Supabase
    const storedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavs);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60 text-sm">
        Loading your list...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/70 text-lg">
        Favorilerinizi görmek için giriş yapın.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        {user.user_metadata?.name || user.name || "User"}’s Favorite Anime
      </h1>

      {favorites.length > 0 ? (
        <AnimeGrid animeList={favorites} />
      ) : (
        <div className="text-white/60 text-sm">Henüz favori eklemediniz.</div>
      )}
    </div>
  );
}
