import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import RelatedAnime from "../components/RelatedAnime";
import EpisodesScrollable from "../components/EpisodesScrollable";

export default function AnimeDetail() {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [related, setRelated] = useState([]); // ✅ new
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [animeRes, epRes, relRes] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/anime/${mal_id}`).then((r) => r.json()),
          fetch(`https://api.jikan.moe/v4/anime/${mal_id}/episodes`).then((r) => r.json()),
          fetch(`https://api.jikan.moe/v4/anime/${mal_id}/relations`).then((r) => r.json()), // ✅ related
        ]);

        setAnime(animeRes.data);
        setEpisodes(epRes.data || []);

        // ✅ Extract related anime from the “relations” endpoint
        if (relRes.data && Array.isArray(relRes.data)) {
          const flattened = relRes.data
            .flatMap((group) => group.entry || [])
            .filter((a) => a.type === "anime");
          setRelated(flattened);
        }
      } catch (err) {
        console.error("AnimeDetail fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [mal_id]);

  if (loading)
    return <p className="text-center mt-20 text-white/70">Loading…</p>;
  if (!anime)
    return <p className="text-center mt-20 text-white/70">Anime not found.</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      {/* Anime header info */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          className="w-full md:w-64 h-auto rounded-2xl border border-white/10 shadow-lg object-cover"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold leading-snug">{anime.title}</h1>
          <p className="text-white/60 italic text-sm">{anime.title_japanese}</p>

          <div className="flex items-center gap-3">
            <span className="text-pink-400 font-semibold text-lg">
              ★ {anime.score || "N/A"}
            </span>
            <FavoriteButton anime={anime} />
          </div>

          <p className="text-white/80 leading-relaxed text-sm md:text-base max-w-prose">
            {anime.synopsis || "No description available."}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-white/60 mt-2">
            {anime.type && <span>🎬 {anime.type}</span>}
            {anime.episodes && <span>📺 {anime.episodes} Episodes</span>}
            {anime.status && <span>🕒 {anime.status}</span>}
            {anime.year && <span>📅 {anime.year}</span>}
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">
          Bölümler
        </h2>
        <EpisodesScrollable episodes={episodes} />
      </section>

      {/* ✅ Related Section Restored */}
      {related.length > 0 && (
        <div className="mt-12">
          <RelatedAnime related={related} />
        </div>
      )}
    </main>
  );
}
