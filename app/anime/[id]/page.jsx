import Image from "next/image";
import { getAnime, getEpisodes } from "@/lib/jikan";
import AnimeCard from "@/components/AnimeCard";
import PlayClient from "@/components/PlayClient";

export default async function AnimePage({ params, searchParams }){
  const { id } = params;
  const page = Number(searchParams?.page || 1);
  const info = await getAnime(id);
  const data = info.data;
  const eps = await getEpisodes(id, page);
  const episodes = eps.data || [];

  return (
    <div className="pt-4">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass rounded-3xl overflow-hidden">
          <div className="relative w-full h-64">
            {data?.images?.jpg?.large_image_url && <Image src={data.images.jpg.large_image_url} alt={data.title} fill className="object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold">{data?.title}</h1>
                <div className="mt-2 opacity-80">{data?.year} • {data?.episodes} Bölüm • {data?.rating}</div>
              </div>
              <PlayClient />
            </div>
          </div>
          <div className="p-6">
            <p className="text-white/80 leading-relaxed">{data?.synopsis}</p>
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="font-semibold mb-3">Bilgiler</h3>
          <div className="space-y-2 text-white/80">
            <div><span className="badge">Skor</span> <span className="ml-2">★ {data?.score || "-"}</span></div>
            <div><span className="badge">Tür</span> <span className="ml-2">{(data?.genres||[]).map(g=>g.name).join(", ")}</span></div>
            <div><span className="badge">Süre</span> <span className="ml-2">{data?.duration}</span></div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Bölümler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {episodes.map(ep => (
            <div key={ep.mal_id} className="glass rounded-xl p-4 hover:bg-white/10 transition">
              <div className="text-sm opacity-80">Bölüm {ep.mal_id || ep.episode}</div>
              <div className="font-semibold line-clamp-1">{ep.title}</div>
              {ep.aired && <div className="text-xs opacity-70 mt-1">{new Date(ep.aired).toLocaleDateString()}</div>}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <a className={`glass px-3 py-1 rounded-lg ${page<=1?'opacity-50 pointer-events-none':''}`} href={`/anime/${id}?page=${page-1}`}>Geri</a>
          <div className="glass px-3 py-1 rounded-lg">{page}</div>
          <a className={`glass px-3 py-1 rounded-lg ${!eps.pagination?.has_next_page?'opacity-50 pointer-events-none':''}`} href={`/anime/${id}?page=${page+1}`}>İleri</a>
        </div>
      </section>

      {data?.relations?.length>0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-3">İlgili</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {(data.relations||[]).slice(0,12).map((rel, idx) => {
              const a = rel.entry?.[0];
              return a ? <AnimeCard key={idx} a={{ ...a, images:{jpg:{image_url: data.images?.jpg?.image_url}} }} tag={rel.relation} /> : null;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
