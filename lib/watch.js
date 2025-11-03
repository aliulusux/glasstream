import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function upsertHistory({ userId, animeId, episode, positionSeconds }) {
  const { data, error } = await supabase
    .from('watch_history')
    .upsert({ user_id: userId, anime_id: animeId, episode, position_seconds: positionSeconds }, { onConflict: 'user_id,anime_id' })
    .select()
    .single();
  if (error) console.error('upsertHistory', error);
  return data;
}

export async function getHistory(userId, limit = 20) {
  const { data, error } = await supabase
    .from('watch_history')
    .select('*').eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) console.error('getHistory', error);
  return data || [];
}

export async function getContinue(userId) {
  const { data, error } = await supabase
    .from('watch_history')
    .select('*').eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(8);
  if (error) console.error('getContinue', error);
  return data || [];
}
