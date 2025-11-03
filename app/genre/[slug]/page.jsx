'use client';
import { useEffect, useMemo, useState } from "react";
import AnimeCard from "@/components/AnimeCard";
const GENRE_MAP = { action: 1, adventure: 2, cars: 3, comedy: 4, mystery: 7, drama: 8, fantasy: 10, romance: 22, school: 23, sci_fi: 24, sports: 30, supernatural: 37, seinen: 42, josei: 43 };
const THEME_CHECKS = ['Isekai','Time Travel','School','Romance','Sports','Music','Supernatural','Psychological','Mecha'];
export default function GenrePage({ params }){
  const slug = params.slug; const [page,setPage]=useState(1); const [data,setData]=useState({data:[],pagination:{}}); const [active,setActive]=useState([]);
  useEffect(()=>{const gid=GENRE_MAP[slug]||1; fetch(`/api/jikan/genre?gid=${gid}&page=${page}&limit=30`).then(r=>r.json()).then(setData);},[slug,page]);
  const list=useMemo(()=>{if(active.length===0)return data.data||[];const lower=active.map(a=>a.toLowerCase());return (data.data||[]).filter(a=>(a.themes||[]).some(t=>lower.includes((t.name||'').toLowerCase())))},[data,active]);
  function toggle(t){setActive(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])}
  return (<div className="pt-4"><div className="glass rounded-3xl p-6 mb-4"><h1 className="text-3xl font-extrabold capitalize">{slug.replaceAll("_"," ")}</h1><div className="mt-3 flex flex-wrap gap-2">{THEME_CHECKS.map(t=>(<button key={t} onClick={()=>toggle(t)} className={`badge ${active.includes(t)?'bg-primary/40':''}`}>{t}</button>))}</div></div><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">{list.map(a=><AnimeCard key={a.mal_id} a={a} tag="Genre"/>)}</div><div className="flex items-center justify-center gap-2 mt-8"><button onClick={()=>setPage(p=>Math.max(1,p-1))} className={`glass px-3 py-1 rounded-lg ${page<=1?'opacity-50 pointer-events-none':''}`}>Geri</button><div className="glass px-3 py-1 rounded-lg">{page}</div><button onClick={()=>setPage(p=>p+1)} className="glass px-3 py-1 rounded-lg">İleri</button></div></div>);}
