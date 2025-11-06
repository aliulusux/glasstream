"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "../context/ToastContext";

export default function FavoriteButton({ anime, className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useToast();

  // ✅ Always keep Supabase session in sync
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) setUser(session.user);

      // Realtime auth listener
      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );

      return () => listener.subscription.unsubscribe();
    };

    init();
  }, []);

  // ✅ Fetch favorite status once user is known
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

  // ✅ Toggle favorite with toast
  const toggleFavorite = async () => {
    if (!user) {
      showToast("⚠️ Favorilere eklemek için giriş yapmalısınız!", "warning");
      return;
    }

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("mal_id", anime.mal_id);
      setIsFavorite(false);
      showToast("❌ Favorilerden kaldırıldı.", "error");
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
      showToast("💖 Favorilere eklendi!", "success");
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
