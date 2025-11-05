import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

export default function AnimeDetail() {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [animeRes, epRes] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/anime/${mal_id}`).then((r) => r.json()),
          fetch(`https://api.jikan.moe/v4/anime/${mal_id}/episodes`).then((r) => r.json())
        ]);
        setAnime(animeRes.data);
        setEpisodes(epRes.data || []);
      } catch (e) {
        console.error("Error loading anime detail:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [mal_id]);

  if (loading) return <p className="text-center mt-20 text-white/70">Loading…</p>;
  if (!anime) return <p className="text-center mt-20 text-white/70">Anime not found.</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          className="w-64 h-auto rounded-xl border border-white/10 shadow-lg"
        />
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <p className="text-white/70 text-sm italic">{anime.title_japanese}</p>
          <div className="flex items-center gap-3">
            <span className="text-glassPink font-semibold">★ {anime.score || "N/A"}</span>
            <FavoriteButton anime={anime} />
          </div>
          <p className="text-white/80 leading-relaxed">{anime.synopsis}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Episodes</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {episodes.map((ep) => (
            <Link
              key={ep.mal_id || ep.episode_id}
              to={`/player/${mal_id}?ep=${ep.mal_id || ep.mal_id || ep.episode_id}`}
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <h3 className="font-medium">{ep.mal_id ? `Ep ${ep.mal_id}` : `Ep ${ep.episode_id}`}</h3>
              <p className="text-white/70 text-sm truncate">{ep.title || "No title"}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
