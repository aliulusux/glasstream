// lib/rpc.js
// Supabase RPC (Stored Procedure) helpers
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get paginated favorites using Supabase RPC
export async function getUserFavorites(page = 1, pageSize = 24) {
  const { data, error } = await supabase.rpc('get_user_favorites', {
    p_page: page,
    p_page_size: pageSize,
  });
  if (error) {
    console.error('getUserFavorites error:', error);
    return [];
  }
  return data || [];
}

// Get total favorites count
export async function getFavoritesCount() {
  const { data, error } = await supabase.rpc('get_user_favorites_count');
  if (error) {
    console.error('getFavoritesCount error:', error);
    return 0;
  }
  return data || 0;
}
