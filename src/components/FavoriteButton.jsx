"use client";
import React, { useEffect, useState } from "react";
import { Heart, AlertTriangle, Check } from "lucide-react";
import { useSupabase } from "../context/SupabaseProvider";
import { useToast } from "../context/ToastContext";

// 💖 Favorite Button — works with Supabase + glassy toasts
export default function FavoriteButton({ anime, className = "" }) {
  const { user, supabase, loading } = useSupabase();
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = useToast();

  // 🔄 Load favorite status
  useEffect(() => {
    if (!user || loading) return;
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
  }, [user, loading, anime.mal_id, supabase]);

  // ❤️ Toggle favorite (add/remove)
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
    <>
      <button
        onClick={toggleFavorite}
        disabled={loading}
        className={`relative p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition ${
          isFavorite ? "text-pink-400 animate-pulse-glow" : "text-white/70 hover:text-pink-400"
        } ${className}`}
        title={isFavorite ? "Favorilerden Kaldır" : "Favorilere Ekle"}
      >
        <Heart size={18} className={`transition-all ${isFavorite ? "fill-pink-400" : ""}`} />
        {isFavorite && (
          <span className="absolute inset-0 rounded-full bg-pink-500/40 blur-md animate-pulse-glow" />
        )}
      </button>

      {/* 🌸 Glass Toast */}
      {toast && (
        <div
          className={`fixed top-16 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-2xl text-sm font-medium shadow-lg border backdrop-blur-xl transition-all duration-500 animate-fadeSlide ${
            toast.type === "error"
              ? "bg-red-500/20 border-red-400/30 text-red-100"
              : toast.type === "success"
              ? "bg-pink-500/25 border-pink-400/40 text-pink-100"
              : toast.type === "removed"
              ? "bg-gray-500/20 border-gray-400/30 text-gray-100"
              : "bg-white/10 border-white/20 text-white"
          }`}
          style={{
            boxShadow: "0 0 30px rgba(255, 77, 216, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2">
            {toast.type === "error" && <AlertTriangle size={16} />}
            {toast.type === "success" && <Check size={16} />}
            {toast.msg}
          </div>
        </div>
      )}
    </>
  );
}
