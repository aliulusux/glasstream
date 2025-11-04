"use client";
import { useEffect, useState } from "react";
import AnimeGrid from "@/components/AnimeGrid";

export default function MyListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("gs_favorites");
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">⭐ My List</h1>
      <AnimeGrid animeList={items} />
      {items.length === 0 && (
        <p className="text-white/70">Your list is empty. Tap the heart on any anime to save it here.</p>
      )}
    </>
  );
}
