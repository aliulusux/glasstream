// /components/AnimeCard.jsx
"use client";
import Link from "next/link";

export default function AnimeCard({ item }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 font-semibold text-white/90">{item.title}</h3>
        <p className="text-xs text-white/60 mt-1 flex gap-2">
          {item.score != null && <span>⭐ {item.score}</span>}
          {item.type && <span>{item.type}</span>}
          {item.year && <span>{item.year}</span>}
        </p>
        <Link
          href={`/anime/${item.id}`}
          className="mt-3 inline-block text-sm px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
