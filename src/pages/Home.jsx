import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import AnimeGrid from "../components/AnimeGrid";
import ContinueWatching from "../components/ContinueWatching";
import LatestEpisodes from '../components/LatestEpisodes';

export default function Home() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/seasons/now?limit=12");
        const json = await res.json();
        setAnime(json?.data || []);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, []);

  return (
    <main className="text-white">
      <Hero />
      <ContinueWatching />
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">✨ This Season’s Highlights</h2>
          <Link
            to="/browse?sort=recent"
            className="px-4 py-1.5 rounded-full text-sm font-medium text-white 
            bg-gradient-to-r from-pink-500 to-purple-600 
            shadow-[0_0_10px_rgba(255,0,128,0.6)] 
            hover:shadow-[0_0_20px_rgba(255,0,128,0.9)] 
            transition-all duration-300"
          >
            Tümünü Gör
          </Link>
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
        <LatestEpisodes />
      </section>
    </main>
  );
}
