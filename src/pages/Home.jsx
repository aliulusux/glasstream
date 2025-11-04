import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import AnimeGrid from "../components/AnimeGrid";

export default function Home() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // seasonal picks (you can swap with /top/anime)
        const res = await fetch("https://api.jikan.moe/v4/seasons/now?limit=20");
        const json = await res.json();
        setAnime(json?.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      <Hero />
      <section className="max-w-6xl mx-auto mt-10 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">✨ This Season’s Highlights</h2>
          <a href="/browse" className="text-sm text-white/70 hover:text-glassPink">See all</a>
        </div>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimeGrid animeList={anime} />
        )}
      </section>
    </main>
  );
}
