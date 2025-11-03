import { getFavorites } from "@/lib/favorites";
import AnimeCard from "@/components/AnimeCard";

export default async function MyList({ searchParams }) {
  const user_id = "anon"; // (auth varsa burada değiştir)
  const list = await getFavorites(user_id);

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold mb-4">Benim Listem</h1>
      {list.length === 0 && (
        <div className="glass p-6 rounded-2xl text-center text-white/70">
          Henüz favori anime eklemedin.
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {list.map((a) => (
          <AnimeCard key={a.id} a={a} />
        ))}
      </div>
    </div>
  );
}
