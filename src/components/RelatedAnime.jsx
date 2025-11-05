import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export default function RelatedAnime({ related = [] }) {
  const [fullRelated, setFullRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function enrichData() {
      if (!Array.isArray(related) || related.length === 0) {
        setLoading(false);
        return;
      }

      const enriched = [];
      for (const [i, a] of related.entries()) {
        try {
          // 👇 Add short delay to avoid Jikan rate limit
          await new Promise((r) => setTimeout(r, 200 * i));

          const res = await fetch(`https://api.jikan.moe/v4/anime/${a.mal_id}`);
          const json = await res.json();
          if (json.data) enriched.push(json.data);
        } catch (err) {
          console.warn("Failed fetching related anime:", a.title, err);
        }
      }

      setFullRelated(enriched);
      setLoading(false);
    }

    enrichData();
  }, [related]);

  if (loading)
    return (
      <div className="text-center text-white/70 mt-6 animate-pulse">
        Loading related anime...
      </div>
    );

  if (!fullRelated.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-white mb-5">Related Anime</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {fullRelated.map((a, index) => {
          const cover =
            a?.images?.jpg?.large_image_url ||
            a?.images?.jpg?.image_url ||
            a?.image_url ||
            "";
          const score = Number(a?.score) || null;
          const year = Number(a?.year) || null;
          const delay = `${index * 60}ms`;

          const isTopRated = score >= 8.0;
          const isTrending =
            !isTopRated && score >= 7.7 && year === currentYear;

          return (
            <div
              key={a.mal_id || a.title}
              style={{ animationDelay: delay }}
              className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transition-all duration-500 animate-[fadeInUp_0.5s_ease_forwards]"
            >
              <Link to={`/anime/${a.mal_id}`} className="block relative">
                <img
                  src={cover}
                  alt={a.title}
                  onError={(e) => (e.target.style.display = "none")}
                  className="w-full h-60 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* 🔥 Trending Badge */}
                {isTrending && (
                  <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 text-xs font-semibold text-white shadow-[0_0_12px_rgba(255,0,128,0.6)] backdrop-blur-sm border border-white/20 animate-pulse z-20">
                    🔥 Trending Now
                  </div>
                )}

                {/* ⭐ Top Rated Badge */}
                {isTopRated && (
                  <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-xs font-semibold text-black shadow-[0_0_12px_rgba(255,215,0,0.7)] backdrop-blur-sm border border-yellow-300/40 animate-pulse z-20">
                    ⭐ Top Rated
                  </div>
                )}

                {/* ❤️ Favorite Button */}
                <div className="absolute top-2 right-2 z-30">
                  <FavoriteButton anime={a} />
                </div>
              </Link>

              <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-2">
                <h3 className="text-white text-sm font-semibold truncate w-full">
                  {a.title || "Untitled"}
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
    </section>
  );
}

// ✨ Fade animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
document.head.appendChild(style);
