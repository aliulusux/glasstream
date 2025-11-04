"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAnimeById } from "@/lib/jikan";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export default function AnimeDetailsPage() {
  const { aid } = useParams(); // ✅ must match folder name [aid]
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ fetch anime data properly
  useEffect(() => {
    let active = true;

    (async () => {
      if (!aid) return;
      try {
        const data = await fetchAnimeById(aid);
        if (active) {
          setAnime(data);
        }
      } catch (err) {
        console.error("Failed to fetch anime:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [aid]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-white/60 animate-pulse">
        Loading anime details...
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-3">Not Found</h1>
        <p className="text-white/60 mb-6">Could not load this anime.</p>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const image =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    anime.image_url ||
    "/no-cover.jpg";

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative">
          <img
            src={image}
            alt={anime.title}
            className="w-full md:w-72 rounded-3xl border border-white/10 shadow-lg"
          />
          {/* ❤️ Floating Favorite Button */}
          <div className="absolute top-3 right-3">
            <FavoriteButton anime={anime} />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <p className="text-white/70 leading-relaxed whitespace-pre-line">
            {anime.synopsis || "No description available."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-white/70">
            {anime.type && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Type: {anime.type}
              </div>
            )}
            {anime.year && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Year: {anime.year}
              </div>
            )}
            {anime.episodes && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Episodes: {anime.episodes}
              </div>
            )}
            {anime.score && (
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                Score: {anime.score}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-6">
            <Link
              href="/popular"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20"
            >
              Back to Popular
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
