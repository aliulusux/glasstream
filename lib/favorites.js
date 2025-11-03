"use client";
import { supabase } from "./supabaseClient";

export async function addFavorite(userId, anime) {
  if (!userId || !anime?.mal_id) return null;

  const { data, error } = await supabase.from("favorites").insert({
    user_id: userId,
    anime_id: anime.mal_id,
    title: anime.title,
    cover_url:
      anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "",
    meta: {
      score: anime.score || null,
      episodes: anime.episodes || null,
      type: anime.type || null,
    },
  });

  if (error) console.error("Add favorite error:", error);
  return { data, error };
}

export async function removeFavorite(userId, animeId) {
  if (!userId || !animeId) return null;
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("anime_id", animeId);
  if (error) console.error("Remove favorite error:", error);
  return !error;
}

export async function isFavorite(userId, animeId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("anime_id", animeId)
    .maybeSingle();

  if (error) return false;
  return !!data;
}

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data: data || [], error };
}
