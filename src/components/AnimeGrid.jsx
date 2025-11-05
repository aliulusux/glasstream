import FavoriteButton from "./FavoriteButton";

function coverOf(a) {
  return (
    a?.images?.jpg?.large_image_url ||
    a?.images?.jpg?.image_url ||
    a?.image_url ||
    ""
  );
}

export default function AnimeGrid({ animeList = [] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {animeList.map((a) => (
        <div
          key={a.mal_id}
          className="relative group rounded-2xl overflow-hidden glass hover:shadow-glow hover:-translate-y-1"
        >
          <img
            src={coverOf(a)}
            alt={a.title}
            className="w-full h-72 object-cover"
            loading="lazy"
          />

          {/* top overlay for title/score (glassy) */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md px-3 py-2 flex flex-col items-start rounded-b-2xl">
            <h3 className="text-sm font-medium text-white truncate w-full">{a.title}</h3>

            {a.score && (
              <div className="mt-1 flex items-center gap-1 text-xs text-pink-400">
                <span>★</span>
                <span>{a.score}</span>
              </div>
            )}
          </div>

          {/* favorite */}
          <div className="absolute top-2 right-2">
            <FavoriteButton anime={a} />
          </div>
        </div>
      ))}
    </div>
  );
}
