'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const t = useRef();

  useEffect(() => {
    if (!q) { setResults([]); return; }
    clearTimeout(t.current);
    t.current = setTimeout(async () => {
      const res = await fetch(`/api/jikan/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data.slice(0, 8) : []);
      setOpen(true);
    }, 250);
    return () => clearTimeout(t.current);
  }, [q]);

  const random = async () => {
    const res = await fetch('https://api.jikan.moe/v4/random/anime');
    const j = await res.json();
    const id = j?.data?.mal_id;
    if (id) window.location.href = `/anime/${id}`;
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Search anime..."
          className="w-full rounded-xl px-4 py-2 bg-white/10 border border-white/15 text-white placeholder-white/60 outline-none"
        />
        <button onClick={random} className="px-3 rounded-xl bg-white/10 text-white border border-white/15 hover:bg-white/20">🎲</button>
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/15 bg-black/70 backdrop-blur-xl p-2">
          {results.map(r => {
            const cover = r?.images?.jpg?.image_url;
            return (
              <Link
                key={r.mal_id}
                href={`/anime/${r.mal_id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
                onClick={()=>setOpen(false)}
              >
                <Image src={cover} alt={r.title} width={40} height={56} className="rounded-md object-cover" />
                <div className="text-sm text-white/90">{r.title}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
