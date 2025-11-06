"use client";

import React, { useEffect, useState } from "react";
import { Heart, AlertTriangle, Check } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

/**
 * 💖 FavoriteButton — stable, glassy, no redirect, no false login errors
 */
export default function FavoriteButton({ anime, className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [toast, setToast] = useState(null);

  // Load Supabase user session safely
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoadingUser(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  // Fetch favorite state when user changes
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

  // Toast helper
  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  };

  // Toggle favorite handler
  const toggleFavorite = async () => {
    if (loadingUser) return; // Wait for user load
    if (!user) {
      showToast("Favorilere eklemek için giriş yapmalısınız!", "error");
      return;
    }

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("mal_id", anime.mal_id);
        if (error) throw error;
        setIsFavorite(false);
        showToast("Favorilerden kaldırıldı", "removed");
      } else {
        const { error } = await supabase.from("favorites").insert([
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
        if (error) throw error;
        setIsFavorite(true);
        showToast("Favorilere eklendi 💖", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Bir hata oluştu", "error");
    }
  };

  return (
    <>
      <button
        onClick={toggleFavorite}
        disabled={loadingUser}
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

      {/* ✅ Glassy toast */}
      {toast && (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2 rounded-2xl text-sm font-medium shadow-lg border backdrop-blur-lg transition-all duration-300 ${
            toast.type === "error"
              ? "bg-red-500/30 border-red-400/40 text-red-100"
              : toast.type === "success"
              ? "bg-pink-500/30 border-pink-400/40 text-pink-100"
              : toast.type === "removed"
              ? "bg-white/20 border-white/20 text-white/90"
              : "bg-white/10 border-white/10 text-white"
          }`}
          style={{ animation: "fadeIn 0.3s ease" }}
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
