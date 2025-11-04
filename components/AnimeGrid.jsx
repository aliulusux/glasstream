import AnimeCard from "./AnimeCard";

export default function AnimeGrid({ animeList = [] }) {
  if (!Array.isArray(animeList)) animeList = [];
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {animeList.map((a) => (
        <AnimeCard key={a.mal_id} a={a} />
      ))}
    </div>
  );
}
