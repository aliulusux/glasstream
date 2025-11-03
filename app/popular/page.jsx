import { getTop } from "@/lib/jikan";
import AnimeCard from "@/components/AnimeCard";
import Pagination from "@/components/Pagination";

export default async function Popular({ searchParams }){
  const page = Number(searchParams?.page || 1);
  const res = await getTop(page, 30);
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-4">Popular</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {(res.data||[]).map(a => <AnimeCard key={a.mal_id} a={a} tag="Top" />)}
      </div>
      <Pagination baseUrl="/popular" page={page} hasNext={res.pagination?.has_next_page} />
    </div>
  );
}
