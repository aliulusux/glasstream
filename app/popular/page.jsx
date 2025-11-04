import AnimeGrid from "@/components/AnimeGrid";
import Pager from "@/components/Pager";
import { fetchTopAnime } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function PopularPage({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const { data = [], pagination = {} } = await fetchTopAnime(page, 24);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">🔥 Popular Anime</h1>
      <AnimeGrid animeList={data} />
      {data.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No anime available right now. Please try again later.</p>
      )}
      <Pager page={page} hasNext={Boolean(pagination?.has_next_page)} base="/popular" />
    </>
  );
}
