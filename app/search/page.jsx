"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnimeGrid from "@/components/AnimeGrid";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q");
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (!q) return;
    const fetchData = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=24`);
      const data = await res.json();
      setAnimeList(data.data || []);
    };
    fetchData();
  }, [q]);

  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-pink-400">{q}</span>
      </h1>
      <AnimeGrid animeList={animeList} />
    </div>
  );
}
