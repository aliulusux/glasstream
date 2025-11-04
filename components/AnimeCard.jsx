"use client";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function AnimeCard({ a }) {
  const img =
    a?.images?.jpg?.large_image_url ||
    a?.images?.jpg?.image_url ||
    a?.image_url ||
    "";

  return (
    <div className="group relative">
      <Link href={`/anime/${a.mal_id}`} className="block">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src={img}
            alt={a.title}
            width={300}
            height={420}
            className="w-full h-[260px] object-cover transform transition group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-2 text-sm text-white/90 line-clamp-1">{a.title}</div>
      </Link>
      <div className="absolute right-2 top-2">
        <FavoriteButton item={a} />
      </div>
    </div>
  );
}
