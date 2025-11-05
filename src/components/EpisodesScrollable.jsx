// components/EpisodesScrollable.jsx
import React from "react";

export default function EpisodesScrollable({ episodes = [] }) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Episodes</h2>
        <span className="text-sm opacity-60">{episodes.length} bölüm</span>
      </div>

      <div className="relative">
        {/* top / bottom gradient hints */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 rounded-t-2xl bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent" />

        <ul
          className="
            glass-list rounded-2xl
            max-h-[520px] md:max-h-[600px] overflow-y-auto overscroll-contain pr-2
            divide-y divide-white/5
            scroll-smooth
          "
          aria-label="Episode list"
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
              <li
                key={id}
                className="
                  px-4 py-4 transition
                  hover:bg-white/5
                "
              >
                <div className="flex items-center gap-4">
                  <span className="w-28 shrink-0 text-pink-300 font-semibold">
                    Episode {id}
                  </span>

                  <div className="min-w-0">
                    <div className="truncate font-medium">{title}</div>
                    {aired && (
                      <div className="text-xs opacity-60">{aired}</div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
