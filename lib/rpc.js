import { supabase } from "./supabaseClient";
export async function getUserFavoritesPage(page=1, pageSize=24){
  const { data, error } = await supabase.rpc("get_user_favorites", { p_page: page, p_page_size: pageSize });
  if (error) throw error; return data || [];
}
export async function getUserFavoritesCount(){
  const { data, error } = await supabase.rpc("get_user_favorites_count");
  if (error) throw error; return Number(data || 0);
}
