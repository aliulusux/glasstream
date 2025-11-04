import Image from "next/image";
import { fetchAnimeById } from "@/lib/jikan";

export const revalidate = 300;

export default async function AnimeDetail({ params }) {
  const a = await fetchAnimeById(params.id);
  if (!a) return <div className="text-white/70">Not found.</div>;

  const img = a.images?.jpg?.large_image_url || a.images?.jpg?.image_url || "";

  return (
    <article className="grid gap-6 md:grid-cols-[260px,1fr]">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <Image src={img} alt={a.title} width={300} height={420} className="w-full h-auto" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{a.title}</h1>
        <p className="text-white/70 mt-3">{a.synopsis}</p>
        <div className="mt-4 space-x-2">
          {a.genres?.map(g => (
            <span key={g.mal_id} className="badge">{g.name}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
