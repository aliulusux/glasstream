import { supabase } from "./supabaseClient";
export async function addFavorite(user_id,anime){
  await supabase.from("anime").upsert({
    id: anime.mal_id||anime.id,
    title: anime.title,
    image_url: anime.images?.jpg?.large_image_url||anime.images?.jpg?.image_url||anime.image_url||null,
    year: anime.year||null,
    score: anime.score||null
  });
  return await supabase.from("favorites").upsert({ user_id, anime_id: anime.mal_id||anime.id });
}
export async function removeFavorite(user_id,anime_id){
  return await supabase.from("favorites").delete().eq("user_id",user_id).eq("anime_id",anime_id);
}
