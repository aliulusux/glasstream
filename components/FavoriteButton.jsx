"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const KEY = "gs_favorites";

export default function FavoriteButton({ item }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    setFav(list.some((x) => x.mal_id === item.mal_id));
  }, [item.mal_id]);

  function toggle() {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    let next;
    if (list.some((x) => x.mal_id === item.mal_id)) {
      next = list.filter((x) => x.mal_id !== item.mal_id);
      setFav(false);
    } else {
      next = [{ mal_id: item.mal_id, title: item.title, images: item.images }, ...list];
      setFav(true);
    }
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle favorite"
      className={`rounded-full p-1.5 border ${fav ? "bg-pink-500/20 text-pink-300 border-pink-500/40" : "bg-black/40 text-white/70 border-white/20"}`}
    >
      <Heart size={16} fill={fav ? "currentColor" : "transparent"} />
    </button>
  );
}
