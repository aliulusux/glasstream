import React from "react";
import { Link } from "react-router-dom";

export default function EpisodesScrollable({ episodes = [] }) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Episodes</h2>
        <span className="text-sm opacity-60">{episodes.length} bölüm</span>
      </div>

      <div className="relative">
        <ul
          className="
            glass-list rounded-2xl
            max-h-[520px] md:max-h-[600px]
            overflow-y-auto overscroll-contain pr-2
            divide-y divide-white/5
            scroll-smooth
          "
        >
          {episodes.map((ep, i) => {
            const id = ep.mal_id ?? ep.episode_id ?? ep.episode ?? i + 1;
            const title =
              ep.title || ep.title_english || ep.title_japanese || `Episode ${id}`;
            const aired =
              ep.aired && !Number.isNaN(Date.parse(ep.aired))
                ? new Date(ep.aired).toLocaleDateString()
                : null;

            return (
              <li key={id}>
                <Link
                  to={`/watch/${ep.anime_id || ep.mal_id || "unknown"}/${id}`}
                  className="
                    flex items-center gap-4 px-4 py-4 rounded-xl transition
                    hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,105,180,0.2)]
                    group
                  "
                >
                  <span className="w-28 shrink-0 text-pink-300 font-semibold group-hover:text-pink-400">
                    Episode {id}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-medium group-hover:text-white">
                      {title}
                    </div>
                    {aired && <div className="text-xs opacity-60">{aired}</div>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
