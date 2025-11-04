"use client";
import Image from "next/image";
import Link from "next/link";

function cardCover(anime) {
  return (
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    anime?.image_url ||
    ""
  );
}

export default function AnimeGrid({ animeList = [] }) {
  if (!Array.isArray(animeList)) animeList = [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {animeList.map((a, i) => {
        const cover = cardCover(a);
        return (
          <Link
            href={`/anime/${a.mal_id}`}
            key={i}
            className="relative rounded-2xl overflow-hidden group bg-white/5 hover:bg-white/10 transition"
          >
            <Image
              src={cover}
              alt={a.title}
              width={300}
              height={400}
              className="object-cover w-full h-72 rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-sm truncate">
              {a.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
