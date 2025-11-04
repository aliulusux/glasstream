import AnimeGrid from "@/components/AnimeGrid";
import Pager from "@/components/Pager";
import { searchAnime } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }) {
  const q = String(searchParams?.q || "");
  const page = Number(searchParams?.page || 1);
  const { data = [], pagination = {} } = await searchAnime(q, page, 24);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">🔎 Search</h1>
      <p className="text-white/70 mb-6">Query: <span className="text-white">{q || "—"}</span></p>
      <AnimeGrid animeList={data} />
      {data.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No results found.</p>
      )}
      <Pager page={page} hasNext={Boolean(pagination?.has_next_page)} base={`/search?q=${encodeURIComponent(q)}`} />
    </>
  );
}
