import { searchAnime } from "@/lib/jikan";
import AnimeCard from "@/components/AnimeCard";

export default async function Browse({ searchParams }){
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page || 1);
  const res = await searchAnime(q, page, 30);
  const list = res.data || [];
  const hasNext = !!res.pagination?.has_next_page;
  return (
    <div className="pt-4">
      <div className="glass rounded-2xl p-4 mb-6">
        <form className="flex gap-3">
          <input name="q" defaultValue={q} placeholder="Anime ara..." className="flex-1 bg-white/5 px-4 py-3 rounded-xl border border-white/10 outline-none focus:ring-2 focus:ring-primary/50" />
          <button className="glass px-4 rounded-xl">Ara</button>
        </form>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {list.map(a => <AnimeCard key={a.mal_id} a={a} />)}
      </div>
      <div className="flex items-center justify-center gap-2 mt-8">
        <a className={`glass px-3 py-1 rounded-lg ${page<=1?'opacity-50 pointer-events-none':''}`} href={`/browse?q=${encodeURIComponent(q)}&page=${page-1}`}>Geri</a>
        <div className="glass px-3 py-1 rounded-lg">{page}</div>
        <a className={`glass px-3 py-1 rounded-lg ${!hasNext?'opacity-50 pointer-events-none':''}`} href={`/browse?q=${encodeURIComponent(q)}&page=${page+1}`}>İleri</a>
      </div>
    </div>
  );
}
