import { supabase } from "./supabaseClient";
export async function addFavorite(user_id, anime){
  await supabase.from("anime").upsert({
    id: anime.mal_id,
    title: anime.title,
    image_url: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
    year: anime.year || null,
    score: anime.score || null,
  });
  return await supabase.from("favorites").upsert({ user_id, anime_id: anime.mal_id });
}
export async function removeFavorite(user_id, anime_id){
  return await supabase.from("favorites").delete().eq("user_id", user_id).eq("anime_id", anime_id);
}
export async function getFavorites(user_id){
  const { data } = await supabase.from("favorites").select("anime_id, anime(title, image_url, score, year, id)").eq("user_id", user_id).order("added_at", { ascending:false });
  return (data||[]).map(r => r.anime || { id: r.anime_id });
}
