import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RelatedAnime({ mal_id }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}/recommendations`);
        const json = await res.json();
        setRelated(json?.data?.slice(0, 12) || []);
      } catch (err) {
        console.error("Related fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRelated();
  }, [mal_id]);

  if (loading)
    return <p className="text-center mt-8 text-white/70">Loading related anime…</p>;

  if (!related.length)
    return <p className="text-center mt-8 text-white/70">No related anime found.</p>;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">
        Related Anime
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        {related.map((r) => {
          const anime = r.entry || {};
          const cover =
            anime?.images?.jpg?.large_image_url ||
            anime?.images?.jpg?.image_url ||
            "";
          return (
            <Link
              key={anime.mal_id}
              to={`/anime/${anime.mal_id}`}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] transition-all duration-300"
            >
              <img
                src={cover}
                alt={anime.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-2">
                <h3 className="text-sm font-semibold text-white truncate">{anime.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
