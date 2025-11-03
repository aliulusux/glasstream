import { supabase } from "./supabaseClient";
export async function setStatus(user_id, anime_id, status){
  return await supabase.from("user_anime_status").upsert({ user_id, anime_id, status, updated_at: new Date().toISOString() });
}
export async function getStatuses(user_id){
  const { data } = await supabase.from("user_anime_status").select("anime_id,status").eq("user_id", user_id);
  const map = new Map(); (data||[]).forEach(r=>map.set(r.anime_id, r.status)); return map;
}
