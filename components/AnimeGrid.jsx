// /components/AnimeGrid.jsx
"use client";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid({ items = [] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {items.map((it) => <AnimeCard key={it.mal_id} item={it} />)}
    </div>
  );
}
