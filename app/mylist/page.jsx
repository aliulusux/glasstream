'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getUserFavoritesPage, getUserFavoritesCount } from '@/lib/rpc';
import AnimeCard from '@/components/AnimeCard';
import EmptyState from '@/components/EmptyState';
const PER_PAGE = 24;
export default function MyList(){
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const maxPage = Math.max(1, Math.ceil(total / PER_PAGE));
  useEffect(()=>{ if (!user) return; getUserFavoritesCount().then(setTotal); }, [user]);
  useEffect(()=>{ if (!user) return; getUserFavoritesPage(page, PER_PAGE).then(setList); }, [user, page]);
  if (!user) return <div className="pt-4"><div className="glass p-6 rounded-2xl text-center">Benim Listem için lütfen giriş yap.</div></div>;
  if (total === 0) return <div className="pt-4"><h1 className="text-3xl font-bold mb-4">Benim Listem</h1><EmptyState /></div>;
  return (<div className="pt-4"><h1 className="text-3xl font-bold mb-4">Benim Listem</h1><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">{list.map(a => <AnimeCard key={a.id} a={a} removable />)}</div><div className="flex items-center justify-center gap-2 mt-8"><button onClick={()=>setPage(p=>Math.max(1,p-1))} className={`glass px-3 py-1 rounded-lg ${page<=1?'opacity-50 pointer-events-none':''}`}>Geri</button><div className="glass px-3 py-1 rounded-lg">{page} / {maxPage}</div><button onClick={()=>setPage(p=>Math.min(maxPage,p+1))} className={`glass px-3 py-1 rounded-lg ${page>=maxPage?'opacity-50 pointer-events-none':''}`}>İleri</button></div></div>);}
