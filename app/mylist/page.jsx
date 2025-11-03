"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getFavorites } from "@/lib/favorites";
import Image from "next/image";
import Link from "next/link";

export default function MyListPage() {
  const { cleanUser } = useAuth();
  const user = cleanUser || {};
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user?.id) getFavorites(user.id).then(({ data }) => setFavorites(data));
  }, [user]);

  if (!user?.id)
    return (
      <div className="text-center text-white/60 mt-20">
        Please login to view your list.
      </div>
    );

  if (!favorites.length)
    return (
      <div className="text-center text-white/60 mt-20">
        You have no favorites yet.
      </div>
    );

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
      {favorites.map((f) => (
        <Link
          key={f.id}
          href={`/anime/${f.anime_id}`}
          className="group relative"
        >
          <Image
            src={f.cover_url || "/placeholder.png"}
            alt={f.title}
            width={300}
            height={420}
            className="rounded-xl object-cover w-full h-[420px] transition-transform duration-300 group-hover:scale-105"
          />
          <h3 className="mt-2 text-white text-sm text-center truncate">
            {f.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
