"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { addFavorite, removeFavorite } from "@/lib/favorites";

export default function AnimeCard({ a, tag, user }) {
  const [fav, setFav] = useState(false);

  async function toggleFav() {
    setFav(!fav);
    if (!fav) await addFavorite(user?.id || "anon", a);
    else await removeFavorite(user?.id || "anon", a.mal_id);
  }

function cover(a){ 
  return a?.images?.jpg?.large_image_url || a?.images?.jpg?.image_url || a?.image_url || "/placeholder.png";
}

export default function AnimeCard({ a, tag }){
  return (
    <motion.div whileHover={{ y:-6 }}>
      <Link href={`/anime/${a.mal_id}`} className="card group block">
        <div className="relative w-full aspect-[2/3]">
          <Image src={cover(a)} alt={a.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {tag && <div className="absolute top-2 left-2 badge">{tag}</div>}
        </div>
        <div className="p-3">
          <div className="text-sm opacity-80">{a.year || a.aired?.from?.slice(0,4) || ""}</div>
          <h3 className="font-semibold line-clamp-1">{a.title}</h3>
          {a.score && <div className="mt-1 text-primary">★ {a.score}</div>}
        </div>
      </Link>
      <button
        onClick={toggleFav}
        className={`absolute top-3 right-3 text-lg ${
          fav ? "text-pink-400" : "text-white/60"
        } hover:text-pink-500 transition`}
      >
        ♥
      </button>
    </motion.div>
  );
}
