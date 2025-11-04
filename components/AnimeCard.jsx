"use client";

import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";

export default function AnimeCard({ item }) {
  const { user } = useAuth();
  const [inList, setInList] = useState(false);

  const image =
    item?.images?.jpg?.large_image_url ||
    item?.images?.jpg?.image_url ||
    item?.image_url ||
    "/no-cover.jpg";

  // ✅ Check if this anime is already in user favorites
  useEffect(() => {
    if (!user || !item?.id) return;
    (async () => {
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("anime_id", item.id)
        .maybeSingle();
      setInList(!!data);
    })();
  }, [user, item?.id]);

  return (
    <div
      className={`relative group rounded-3xl overflow-hidden border transition-all duration-500
        backdrop-blur-sm shadow-lg hover:scale-[1.03]
        ${
          inList
            ? "border-pink-500/70 shadow-[0_0_20px_2px_rgba(236,72,153,0.4)]"
            : "border-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        }`}
    >
      {/* Cover image */}
      <Link href={`/anime/${item.id}`} prefetch={false}>
        <div className="relative">
          <img
            src={image}
            alt={item.title}
            className="w-full h-72 object-cover rounded-3xl transition duration-300 group-hover:opacity-90"
          />
          {/* ❤️ Animated Favorite Button */}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton anime={item} />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
        </div>
      </Link>

      {/* Info section */}
      <div className="p-3 space-y-1">
        <h3 title={item.title} className="font-semibold text-white truncate">
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>⭐ {item.score || "N/A"}</span>
          <span>{item.year || "—"}</span>
        </div>
        <Link
          href={`/anime/${item.id}`}
          className="inline-block mt-2 px-3 py-1.5 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-white/80 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
