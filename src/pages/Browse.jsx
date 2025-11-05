'use client';
import React, { useEffect, useState } from 'react';
import AnimeGrid from '../components/AnimeGrid';

// 🎭 Türkçe genre dictionary
const GENRE_MAP = {
  1: 'Aksiyon',
  2: 'Macera',
  4: 'Komedi',
  8: 'Drama',
  10: 'Fantezi',
  14: 'Korku',
  22: 'Romantik',
  24: 'Bilim Kurgu',
  30: 'Spor',
  36: 'Dilim Hayattan',
  37: 'Doğaüstü',
  38: 'Gerilim',
  46: 'Gizem',
  47: 'Suç',
  48: 'Psikolojik',
  49: 'Parodi',
  50: 'Aile',
  54: 'Askeri',
};

export default function Browse() {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch anime list per page + genre
  const fetchAnime = async () => {
    setLoading(true);
    try {
      const base = `https://api.jikan.moe/v4/anime?limit=18&page=${page}`;
      const url = genre ? `${base}&genres=${genre}` : base;
      const res = await fetch(url);
      const data = await res.json();
      setAnimeList(data.data || []);
      setTotalPages(data.pagination?.last_visible_page || 1);
    } catch (err) {
      console.error('Failed to fetch anime:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [page, genre]);

  const handleGenreClick = (id) => {
    setGenre(id === genre ? null : id);
    setPage(1);
  };

  return (
    <div className="px-6 py-8 text-white">
      {/* 🌈 Genre Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.entries(GENRE_MAP).map(([id, name]) => (
          <button
            key={id}
            onClick={() => handleGenreClick(id)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ease-out backdrop-blur-md 
            ${
              Number(id) === genre
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(255,0,128,0.8)] scale-105 border-pink-300 animate-pulse'
                : 'bg-pink-500/20 text-white/80 hover:shadow-[0_0_15px_rgba(255,0,128,0.6)] hover:bg-pink-500/40 hover:text-white hover:scale-105'
            }`}
            style={{ transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)' }}
          >
            <span className="relative z-10">{name}</span>
            {/* Glowing gradient ring */}
            <span
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-md opacity-0 transition-all duration-300 ${
                Number(id) === genre ? 'opacity-60' : 'group-hover:opacity-40'
              }`}
            ></span>
          </button>
        ))}
      </div>

      {/* ✨ Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text animate-pulse">
          {genre ? `${GENRE_MAP[genre]} Anime` : 'Tüm Animeler'}
        </h1>
      </div>

      {/* 🌀 Anime Section */}
      {loading ? (
        <div className="text-center py-20 text-pink-400 animate-pulse">
          Yükleniyor...
        </div>
      ) : (
        <AnimeGrid animeList={animeList} />
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-white/10 transition-all ${
            page === 1
              ? 'text-white/30 bg-white/5 cursor-not-allowed'
              : 'hover:bg-pink-500/20 hover:text-pink-300'
          }`}
        >
          ← Önceki
        </button>

        <span className="text-white/80 text-sm">
          Sayfa <strong className="text-pink-400">{page}</strong> / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-white/10 transition-all ${
            page === totalPages
              ? 'text-white/30 bg-white/5 cursor-not-allowed'
              : 'hover:bg-pink-500/20 hover:text-pink-300'
          }`}
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}
