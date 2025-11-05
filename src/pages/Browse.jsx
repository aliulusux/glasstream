'use client';
import React, { useState, useEffect } from "react";
import AnimeGrid from "@/components/AnimeGrid";
import { fetchAllAnime, fetchGenres } from "@/lib/jikan";

export default function Browse() {
  const [animeList, setAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    loadAnime();
  }, [page, selectedGenre, sortOption]);

  async function loadGenres() {
    const g = await fetchGenres();
    if (Array.isArray(g)) setGenres(g);
  }

  async function loadAnime() {
    const data = await fetchAllAnime(page, 18, selectedGenre);
    if (!data) return;
    let filtered = [...data];
    const currentYear = new Date().getFullYear();

    if (sortOption === "popular") {
      filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sortOption === "new") {
      filtered = filtered.filter((a) => a.year === currentYear);
    } else if (sortOption === "iconic") {
      const iconicNames = [
        "Naruto", "Naruto Shippuden", "Bleach", "One Piece", "Dragon Ball",
        "Dragon Ball Z", "Dragon Ball Super", "Attack on Titan",
        "Fullmetal Alchemist", "Fullmetal Alchemist: Brotherhood", "Death Note",
        "Hunter x Hunter", "One Punch Man", "Demon Slayer", "Kimetsu no Yaiba",
        "My Hero Academia", "Boku no Hero Academia", "Jujutsu Kaisen",
        "Chainsaw Man", "Tokyo Ghoul", "Black Clover", "Fairy Tail", "Re:Zero",
        "Code Geass", "Steins;Gate", "Sword Art Online", "Gintama",
        "Mob Psycho 100", "Vinland Saga", "Spy x Family", "Your Name",
        "A Silent Voice", "Neon Genesis Evangelion", "Cowboy Bebop",
        "Samurai Champloo", "Trigun", "JoJo's Bizarre Adventure", "Parasyte",
        "Made in Abyss", "Blue Exorcist", "Clannad", "Your Lie in April",
        "Bleach: Thousand-Year Blood War", "Berserk", "Monster", "Haikyuu",
        "Kuroko no Basket", "Overlord", "Psycho-Pass", "Hellsing Ultimate",
        "Akira", "Ghost in the Shell", "Erased", "Toradora", "Rurouni Kenshin",
        "Fate/Zero", "Fate/Stay Night", "D.Gray-man", "Elfen Lied", "Nana",
      ];

      filtered = data.filter((a) =>
        iconicNames.some((name) =>
          a.title.toLowerCase().includes(name.toLowerCase())
        )
      );
    }

    setAnimeList(filtered);
  }

  return (
    <div className="p-8">
      {/* Header: Genres + Sort */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          {genres.map((genre) => (
            <button
              key={genre.mal_id}
              onClick={() =>
                setSelectedGenre(selectedGenre === genre.mal_id ? null : genre.mal_id)
              }
              className={`px-4 py-2 text-sm font-medium rounded-full border backdrop-blur-md transition-all duration-300 shadow-[0_0_8px_rgba(255,0,128,0.2)] ${
                selectedGenre === genre.mal_id
                  ? "bg-pink-600/70 border-pink-400 text-white shadow-[0_0_15px_rgba(255,0,128,0.6)]"
                  : "bg-white/10 border-white/20 text-white hover:bg-pink-500/30"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-[0_0_10px_rgba(255,0,128,0.3)]"
          >
            Sırala ▼
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 z-50 min-w-[180px] bg-black/60 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
              <button
                onClick={() => {
                  setSortOption("popular");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-pink-500/30 text-sm ${
                  sortOption === "popular" ? "text-pink-400" : "text-white"
                }`}
              >
                ⭐ En Popüler
              </button>
              <button
                onClick={() => {
                  setSortOption("new");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-pink-500/30 text-sm ${
                  sortOption === "new" ? "text-pink-400" : "text-white"
                }`}
              >
                🕊️ Yeni Çıkanlar
              </button>
              <button
                onClick={() => {
                  setSortOption("iconic");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-pink-500/30 text-sm ${
                  sortOption === "iconic" ? "text-pink-400" : "text-white"
                }`}
              >
                💫 İkonik
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Title */}
      <h1 className="text-2xl font-bold text-white mb-6 drop-shadow-[0_0_8px_rgba(255,0,128,0.5)]">
        Tüm Animeler
      </h1>

      {/* Anime Grid */}
      <AnimeGrid animeList={animeList} />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition ${
            page <= 1 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          ← Önceki
        </button>
        <span className="text-white/80 text-sm">Sayfa {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}

/* fadeIn animation (for dropdown) */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}`;
document.head.appendChild(style);
