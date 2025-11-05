"use client";

import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton"

/**
 * 🔹 AnimeGrid Component
 * - Displays anime in a glassmorphism grid.
 * - Each card links to /anime/:mal_id for detailed view.
 * - Supports Jikan API data structure.
 */
export default function AnimeGrid({ animeList = [] }) {
  if (!Array.isArray(animeList)) animeList = [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {animeList.map((a) => {
        const cover =
          a?.images?.jpg?.large_image_url ||
          a?.images?.jpg?.image_url ||
          a?.image_url ||
          "";
        const score = Number(a?.score) || null;

        {/* favorite */}
            <div className="absolute top-2 right-2">
              <FavoriteButton anime={a} />
            </div>

        return (
          <Link
            key={a.mal_id}
            to={`/anime/${a.mal_id}`}
            className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] transition-all duration-300"
          >
            {/* Anime Cover */}
            <img
              src={cover}
              alt={a.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Title + Score Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-2 flex flex-col items-start">
              <h3 className="text-white text-sm font-semibold truncate w-full">
                {a.title}
              </h3>
              {score && (
                <div className="mt-1 flex items-center gap-1 text-xs text-pink-400">
                  <span>★</span>
                  <span>{score}</span>
                </div>
              )}
            </div>
            

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-pink-500/10 rounded-2xl"></div>
          </Link>
   
        );
      })}
    </div>
  );
}



