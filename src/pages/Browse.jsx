// src/pages/Browse.jsx
import React, { useState, useEffect } from "react";
import AnimeGrid from "../components/AnimeGrid";
import { fetchAllAnime, fetchGenres } from "../lib/jikan";

export default function Browse() {
  const [animeList, setAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortType, setSortType] = useState("popular");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🧩 Load anime and genres
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [anime, genreList] = await Promise.all([
        fetchAllAnime(page, 18, selectedGenre, sortType),
        fetchGenres(),
      ]);
      setAnimeList(anime);
      setGenres(genreList);
      setLoading(false);
    }
    loadData();
  }, [page, selectedGenre, sortType]);

  // 🧠 Handlers
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen px-6 sm:px-12 py-10 text-white">
      {/* Header + Sort */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-pink-400 tracking-tight drop-shadow-[0_0_15px_rgba(255,192,203,0.3)]">
          Tüm Animeler
        </h2>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="relative inline-block">
            <select
              value={sortType}
              onChange={handleSortChange}
              className="appearance-none bg-gradient-to-r from-pink-600/30 via-purple-700/20 to-transparent 
                        backdrop-blur-md border border-white/10 text-pink-200 font-semibold 
                        rounded-xl px-6 py-2 pr-8 shadow-[0_0_20px_rgba(255,20,147,0.3)] 
                        focus:outline-none hover:shadow-pink-500/40 transition-all cursor-pointer"
            >
              <option value="popular" className="bg-[#1a1a1a] text-white">En Popüler</option>
              <option value="new" className="bg-[#1a1a1a] text-white">Yeni Çıkanlar</option>
              <option value="iconic" className="bg-[#1a1a1a] text-white">İkonik</option>
            </select>
            <span className="absolute right-3 top-2.5 text-pink-300 pointer-events-none">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Genre section */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 mb-10"
      >
        {genres
          .sort(() => Math.random() - 0.5) // randomize order
          .map((g) => (
            <button
              key={g.mal_id}
              onClick={() => handleGenreClick(g.mal_id)}
              className={`w-full px-5 py-2 text-center rounded-full text-sm font-medium backdrop-blur-lg 
                          border border-white/10 transition-all duration-200
                          ${
                            selectedGenre === g.mal_id
                              ? "bg-pink-500/40 text-white shadow-lg shadow-pink-500/50"
                              : "bg-white/10 text-pink-200 hover:bg-pink-400/20 hover:shadow-pink-500/30"
                          }`}
            >
              {g.name}
            </button>
          ))}
      </div>

      {/* Anime grid or loading */}
      {loading ? (
        <div className="text-center text-pink-300 text-lg animate-pulse">
          Yükleniyor...
        </div>
      ) : (
        <AnimeGrid animeList={animeList} />
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-5 py-2 rounded-lg bg-white/10 text-pink-300 hover:bg-pink-400/30 transition disabled:opacity-40 disabled:hover:bg-white/10"
        >
          ← Önceki
        </button>

        <span className="text-pink-200 text-lg font-medium select-none">
          Sayfa {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 rounded-lg bg-white/10 text-pink-300 hover:bg-pink-400/30 transition"
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}
