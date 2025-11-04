"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAnimeById } from "@/lib/jikan";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function AnimeDetailsPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!id) return;
      const data = await fetchAnimeById(id);
      if (active) {
        setAnime(data);
        setLoading(false);
      }
    })();
    return () => (active = false);
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-white/60 animate-pulse">
        Loading anime details...
      </div>
    );

  if (!anime)
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-3">Not Found</h1>
        <p className="text-white/60 mb-6">
          Could not load this anime. Try again later.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          Back to Home
        </Link>
      </div>
    );

  const image =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    anime.image_url ||
    "/placeholder.jpg";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* --- Cover + Info --- */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Anime Cover */}
        <div className="relative w-full md:w-80">
          <img
            src={image}
            alt={anime.title}
            className="rounded-3xl w-full shadow-lg border border-white/10 object-cover"
          />
          <div className="absolute top-3 right-3">
            <FavoriteButton anime={anime} />
          </div>
        </div>

        {/* Anime Info */}
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl font-extrabold">{anime.title}</h1>
          <p className="text-white/70 leading-relaxed whitespace-pre-line">
            {anime.synopsis || "No description available."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm text-white/70">
            {anime.type && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <strong>Type:</strong> {anime.type}
              </div>
            )}
            {anime.year && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <strong>Year:</strong> {anime.year}
              </div>
            )}
            {anime.episodes && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <strong>Episodes:</strong> {anime.episodes}
              </div>
            )}
            {anime.score && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <strong>Score:</strong> {anime.score}
              </div>
            )}
            {anime.status && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <strong>Status:</strong> {anime.status}
              </div>
            )}
            {anime.rating && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <strong>Rating:</strong> {anime.rating}
              </div>
            )}
          </div>

          {/* ✅ Safe map checks */}
          {Array.isArray(anime.genres) && anime.genres.length > 0 && (
            <div className="pt-4">
              <strong className="text-pink-400">Genres:</strong>{" "}
              {anime.genres.map((g) => g.name).join(", ")}
            </div>
          )}
          {Array.isArray(anime.producers) && anime.producers.length > 0 && (
            <div>
              <strong className="text-pink-400">Producers:</strong>{" "}
              {anime.producers.map((p) => p.name).join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* --- Optional Trailer --- */}
      {anime.trailer?.embed_url && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">🎬 Trailer</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <iframe
              src={anime.trailer.embed_url}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
