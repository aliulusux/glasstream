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
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="backdrop-blur-md bg-black/30 rounded-xl p-2">
              <div className="font-semibold text-sm line-clamp-1">{a.title}</div>
              {a.score && (
                <div className="mt-1 flex items-center gap-1 text-xs text-pink-300">
                  <span>★</span>
                  <span>{a.score}</span>
                </div>
              )}
            </div>
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
