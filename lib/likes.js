import { supabase } from "./supabaseClient";
export async function toggleLike(user_id, anime_id){
  const { data: existing } = await supabase.from("anime_likes").select("id").eq("user_id", user_id).eq("anime_id", anime_id).maybeSingle();
  if (existing) { return await supabase.from("anime_likes").delete().eq("user_id", user_id).eq("anime_id", anime_id); }
  else { return await supabase.from("anime_likes").insert({ user_id, anime_id }); }
}
export async function getLikeCounts(ids){
  const { data, error } = await supabase.rpc("get_like_counts", { anime_ids: ids });
  if (error) return new Map(); const m = new Map(); (data||[]).forEach(r => m.set(r.anime_id, Number(r.likes))); return m;
}
