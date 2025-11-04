import { useEffect, useState } from "react";
import AnimeGrid from "../components/AnimeGrid";

export default function Popular() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?limit=24")
      .then((r) => r.json())
      .then((j) => setList(j?.data || []));
  }, []);
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Popular</h1>
      <AnimeGrid animeList={list} />
    </main>
  );
}
