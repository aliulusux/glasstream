'use client';
import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

function getCover(anime) {
  return (
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image_url ||
    ""
  );
}

export default function AnimeGrid({ animeList = [] }) {
  if (!Array.isArray(animeList)) animeList = [];

  const currentYear = new Date().getFullYear();

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {animeList.map((a) => {
        const cover = getCover(a);
        const score = Number(a?.score) || null;
        const year = Number(a?.year) || null;

        const isTopRated = score >= 9.0;
        const isTrending = !isTopRated && score >= 8.5 && year === currentYear;

        return (
          <div
            key={a.mal_id}
            className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transition-all"
          >
            {/* 🎞️ Clickable Cover */}
            <Link to={`/anime/${a.mal_id}`} className="block relative">
              <img
                src={cover}
                alt={a.title}
                className="w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* 🔥 Trending Badge */}
              {isTrending && (
                <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 text-xs font-semibold text-white shadow-[0_0_10px_rgba(255,0,128,0.6)] backdrop-blur-sm border border-white/20 animate-pulse z-20">
                  🔥 Bu Sezon Popüler
                </div>
              )}

              {/* ⭐ Top Rated Badge */}
              {isTopRated && (
                <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-xs font-semibold text-black shadow-[0_0_12px_rgba(255,215,0,0.7)] backdrop-blur-sm border border-yellow-300/40 animate-pulse z-20">
                  ⭐ En Çok Beğenilen
                </div>
              )}

              {/* ❤️ Favorite */}
              <div className="absolute top-2 right-2 z-30">
                <FavoriteButton anime={a} />
              </div>
            </Link>

            {/* 🩶 Overlay Title */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-2">
              <h3 className="text-white text-sm font-semibold truncate w-full">
                {a.title}
              </h3>
              {score && (
                <div className="mt-1 flex items-center gap-1 text-xs text-pink-400">
                  <span>★</span>
                  <span>{score}</span>
                  {year && (
                    <span className="ml-auto text-[11px] text-white/60">
                      {year}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
