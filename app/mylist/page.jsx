"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getFavorites } from "@/lib/favorites";
import AnimeCard from "@/components/AnimeCard";

export default function MyList(){
  const { user } = useAuth();
  const [list, setList] = useState([]);

  useEffect(()=>{
    if (!user) return;
    getFavorites(user.id).then(setList);
  }, [user]);

  if (!user) {
    return <div className="pt-4"><div className="glass p-6 rounded-2xl text-center">Benim Listem için lütfen giriş yap.</div></div>;
  }

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold mb-4">Benim Listem</h1>
      {list.length === 0 && (<div className="glass p-6 rounded-2xl text-center text-white/70">Henüz favori anime eklemedin.</div>)}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {list.map(a => <AnimeCard key={a.id} a={a} />)}
      </div>
    </div>
  );
}
