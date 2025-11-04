import React, { useEffect, useState } from "react";
import { getUserWatchHistory } from "../lib/watchHistory";
import { Link } from "react-router-dom";

export default function ContinueWatching() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getUserWatchHistory().then((data) => setList(data || []));
  }, []);

  if (!list.length) return null;

  return (
    <section className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-xl font-semibold mb-4">🎞️ Continue Watching</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {list.map((item) => (
          <Link
            key={`${item.mal_id}-${item.episode}`}
            to={`/anime/${item.mal_id}?ep=${item.episode}`}
            className="glass rounded-2xl p-4 hover:shadow-glow transition"
          >
            <p className="text-white/90 font-medium">Anime #{item.mal_id}</p>
            <p className="text-sm text-white/60">Episode {item.episode}</p>
            <div className="h-2 w-full bg-white/20 rounded-full mt-2">
              <div
                className="h-2 bg-glassPink rounded-full transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
