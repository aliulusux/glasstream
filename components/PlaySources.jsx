'use client';
import { useMemo, useState } from 'react';
import PlayerModal from './PlayerModal';
function fromInfo(info){
  const arr = [];
  const trailer = info?.trailer;
  if (trailer?.url || trailer?.embed_url || trailer?.youtube_id){
    const embed = trailer.embed_url || (trailer.youtube_id ? `https://www.youtube.com/watch?v=${trailer.youtube_id}` : trailer.url);
    arr.push({ type: 'YouTube', url: embed });
  }
  (info?.streaming || []).forEach(s => {
    if (typeof s?.url === 'string'){
      if (s.url.endsWith('.mp4')) arr.push({ type: s.name || 'MP4', url: s.url });
    }
  });
  return arr;
}
export default function PlaySources({ info }){
  const sources = useMemo(()=>fromInfo(info?.data||info), [info]);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState('');
  if (sources.length === 0) return null;
  function openSrc(u){ setSrc(u); setOpen(true); }
  return (
    <div className="flex items-center gap-2">
      <select onChange={e=>openSrc(e.target.value)} defaultValue="">
        <option value="" disabled>Kaynak Seç</option>
        {sources.map((s, i) => <option key={i} value={s.url}>{s.type}</option>)}
      </select>
      <PlayerModal open={open} onClose={()=>setOpen(false)} src={src} />
    </div>
  );
}
