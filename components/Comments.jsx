'use client';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import GlowCard from './GlowCard';

export default function Comments({ animeId }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const load = async () => {
    const { data, error } = await supabase
      .from('anime_comments')
      .select('id, content, created_at, user_id')
      .eq('anime_id', animeId)
      .order('created_at', { ascending: false });
    if (!error) setItems(data || []);
  };

  useEffect(() => { load(); }, [animeId]);

  const send = async () => {
    if (!user) return alert('Login to comment');
    if (!text.trim()) return;
    const { error } = await supabase.from('anime_comments').insert({
      anime_id: animeId, user_id: user.id, content: text.trim()
    });
    if (!error) {
      setText('');
      load();
    }
  };

  const remove = async (id) => {
    if (!user) return;
    await supabase.from('anime_comments').delete().eq('id', id).eq('user_id', user.id);
    load();
  };

  return (
    <GlowCard className="p-4">
      <h3 className="text-white font-semibold mb-3">Comments</h3>

      {user ? (
        <div className="flex gap-2 mb-4">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a comment…" className="flex-1 rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white"/>
          <button onClick={send} className="px-4 rounded-lg bg-white/15 border border-white/20 text-white hover:bg-white/25">Send</button>
        </div>
      ) : (
        <div className="text-white/70 mb-3">Login to join the discussion.</div>
      )}

      <div className="space-y-2">
        {items.map(c => (
          <div key={c.id} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white/90 flex justify-between">
            <div className="whitespace-pre-wrap">{c.content}</div>
            {user?.id === c.user_id && (
              <button onClick={()=>remove(c.id)} className="text-white/60 hover:text-red-300">✖</button>
            )}
          </div>
        ))}
        {items.length === 0 && <div className="text-white/60">No comments yet.</div>}
      </div>
    </GlowCard>
  );
}
