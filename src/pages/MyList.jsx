"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Heart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

export default function MyList() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const showToast = useToast();

  // ✅ Get logged in user
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );

      return () => listener.subscription.unsubscribe();
    };

    init();
  }, []);

  // ✅ Fetch user’s favorite anime
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch favorites error:", error);
        showToast("⚠️ Favoriler alınamadı!", "error");
      } else {
        setFavorites(data || []);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  // 🗑️ Remove from favorites
  const removeFavorite = async (mal_id) => {
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("mal_id", mal_id);

      if (error) throw error;

      setFavorites((prev) => prev.filter((a) => a.mal_id !== mal_id));
      showToast("❌ Favorilerden kaldırıldı!", "error");
    } catch (err) {
      console.error(err.message);
      showToast("⚠️ Favori silinirken hata oluştu!", "error");
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-20 py-20 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {user ? `${user.user_metadata?.name || "Kullanıcı"}’s Favorite Anime` : "Favori Anime"}
      </h1>

      {/* 🌀 Loading state */}
      {loading ? (
        <div className="text-center text-white/60">Yükleniyor...</div>
      ) : !user ? (
        <div className="text-center text-white/60">
          Favorilerinizi görmek için giriş yapmalısınız.
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center text-white/60">
          Henüz favori eklemediniz.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
          <AnimatePresence>
            {favorites.map((anime) => (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative group rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 hover:border-pink-500/50 hover:shadow-pink-500/10 transition shadow-lg"
              >
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-lg font-semibold">{anime.title}</h3>
                  {anime.score && (
                    <div className="text-pink-400 text-sm mt-1 flex items-center gap-1">
                      <span>★</span>
                      <span>{anime.score}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFavorite(anime.mal_id)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-pink-600/60 transition rounded-full p-2 backdrop-blur-md border border-white/10"
                  title="Favorilerden Kaldır"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
