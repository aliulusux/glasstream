import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 🔥 Fetch latest episodes safely
async function fetchLatestEpisodes(page = 1) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/watch/episodes?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch latest episodes");
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error("fetchLatestEpisodes error:", err);
    return [];
  }
}

export default function LatestEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEpisodes = async () => {
      setLoading(true);
      const eps = await fetchLatestEpisodes(page);
      setEpisodes(eps.slice(0, 12)); // limit to 12 cards
      setLoading(false);
    };
    loadEpisodes();
  }, [page]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="mt-16 px-4 sm:px-8 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          🎬 <span>Son Çıkan Bölümler</span>
        </h2>

        <Link
          to="/browse?sort=recent"
          className="px-4 py-1.5 rounded-full text-sm font-medium text-white 
                     bg-gradient-to-r from-pink-500 to-purple-600 
                     shadow-[0_0_10px_rgba(255,0,128,0.6)] 
                     hover:shadow-[0_0_20px_rgba(255,0,128,0.9)] 
                     transition-all duration-300"
        >
          Tümünü Gör
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-white/60">Yükleniyor...</p>
      ) : episodes.length === 0 ? (
        <p className="text-center text-white/50 italic">
          Şu anda gösterilecek bölüm bulunamadı.
        </p>
      ) : (
        <>
          {/* Episode Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {episodes.map((item, index) => {
              // handle both array and object structure safely
              const anime =
                Array.isArray(item.entry) && item.entry.length
                  ? item.entry[0]
                  : item.entry || item.anime;

              if (!anime) return null;

              const cover =
                anime.images?.jpg?.large_image_url ||
                anime.images?.jpg?.image_url ||
                anime.images?.webp?.image_url ||
                "";
              const episode =
                item.episodes?.[0]?.mal_id ||
                item.episodes?.[0]?.title ||
                item.episode ||
                "?";

              return (
                <Link
                  key={index}
                  to={`/anime/${anime.mal_id}`}
                  className="group relative rounded-xl overflow-hidden 
                             bg-white/5 backdrop-blur-md border border-white/10 
                             hover:border-pink-500/40 transition-all duration-300 
                             shadow-md hover:shadow-pink-500/20"
                >
                  <div className="relative w-full aspect-[3/4]">
                    {cover ? (
                      <img
                        src={cover}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black/30 text-white/40 text-sm">
                        Kapak Yok
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                    <p className="text-sm font-medium truncate">{anime.title}</p>
                    <p className="text-xs text-pink-400 mt-1">
                      Bölüm {episode}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Floating Pagination Bar */}
          <div
            className="sticky bottom-6 flex justify-center items-center gap-4 mt-10 
                       mx-auto w-fit px-6 py-3 rounded-2xl 
                       bg-black/50 backdrop-blur-xl border border-white/10 
                       shadow-[0_0_20px_rgba(255,0,128,0.2)] 
                       hover:shadow-[0_0_25px_rgba(255,0,128,0.4)] 
                       transition-all duration-500"
          >
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                page === 1
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white hover:text-pink-400"
              }`}
            >
              ← Önceki
            </button>

            <span className="text-white/70 text-sm">Sayfa {page}</span>

            <button
              onClick={nextPage}
              className="text-white hover:text-pink-400 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300"
            >
              Sonraki →
            </button>
          </div>
        </>
      )}
    </section>
  );
}
