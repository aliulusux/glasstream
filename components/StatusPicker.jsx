'use client';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { setStatus, getStatuses } from '@/lib/status';

export default function StatusPicker({ animeId }){
  const { user } = useAuth();
  const [value, setValue] = useState('');

  useEffect(()=>{
    if(!user) return;
    getStatuses(user.id).then(map => {
      const v = map.get(Number(animeId)) || '';
      setValue(v);
    });
  }, [user, animeId]);

  async function handleChange(e){
    const v = e.target.value;
    setValue(v);
    if(user){
      const { setStatus: _ } = await import('@/lib/status');
      await _.apply(null, [user.id, Number(animeId), v]);
    }
  }

  if (!user) return null;

  return (
    <div className="glass rounded-xl px-3 py-2">
      <label className="text-sm opacity-80">İzleme Durumu</label>
      <select value={value} onChange={handleChange}
        className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40">
        <option value="">Seç...</option>
        <option value="watching">İzliyorum</option>
        <option value="completed">Bitirdim</option>
        <option value="planned">Planlıyorum</option>
      </select>
    </div>
  );
}
