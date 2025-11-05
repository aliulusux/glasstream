// src/lib/jikan.js
// 🔗 Jikan API helper functions for Glasstream project
// Works perfectly with Browse.jsx and AnimeGrid components

// ----------------------------------------------
// 🧠 Fetch all anime (supports pagination & genre)
// ----------------------------------------------
export async function fetchAllAnime(page = 1, limit = 18, genreId = null, sortType = "popular") {
  try {
    let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}`;

    const currentYear = new Date().getFullYear();

    // Sorting logic
    if (sortType === "popular") {
      url += "&order_by=score&sort=desc";
    } else if (sortType === "new") {
      // only anime that started in the current year
      url += `&start_date=${currentYear}-01-01&end_date=${currentYear}-12-31&order_by=start_date&sort=desc`;
    } else if (sortType === "iconic") {
      const iconicIds = [
        5114, 11061, 20, 1735, 269, 31964, 16498, 1, 918, 9969, 30,
        1535, 50265, 21, 820, 813, 199, 223, 34134, 3588, 11757, 6547,
        28891, 32935, 32281, 9253, 28805, 38408
      ];
      const ids = iconicIds.slice((page - 1) * limit, page * limit).join(",");
      url = `https://api.jikan.moe/v4/anime?sfw=true&q=&ids=${ids}`;
    }

    if (genreId && sortType !== "iconic") {
      url += `&genres=${genreId}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    if (!data || !data.data) return [];

    // Filter out unreleased anime (for "new" mode)
    let result = data.data;
    if (sortType === "new") {
      result = result.filter((a) => a.year === currentYear);
    }

    return result.map((a) => ({
      mal_id: a.mal_id,
      title: a.title,
      year: a.year,
      score: a.score,
      images: a.images,
    }));
  } catch (err) {
    console.error("❌ fetchAllAnime failed:", err);
    return [];
  }
}

// ----------------------------------------------
// 🎭 Fetch genres (translated to Turkish)
// ----------------------------------------------
export async function fetchGenres() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/genres/anime");
    const data = await res.json();
    if (!data || !data.data) return [];

    // English → Turkish translation map
    const trMap = {
      "Action": "Aksiyon",
      "Adventure": "Macera",
      "Comedy": "Komedi",
      "Drama": "Drama",
      "Fantasy": "Fantezi",
      "Horror": "Korku",
      "Romance": "Romantik",
      "Sci-Fi": "Bilim Kurgu", // ✅ must be quoted
      "Sports": "Spor",
      "Slice of Life": "Günlük Hayattan",
      "Supernatural": "Doğaüstü",
      "Mystery": "Gizem",
      "Thriller": "Gerilim",
      "Psychological": "Psikolojik",
      "Mecha": "Mekanik",
      "Music": "Müzik",
      "School": "Okul",
      "Military": "Askeri",
      "Historical": "Tarihi",
      "Shoujo": "Kızlara Yönelik",
      "Shounen": "Erkeklere Yönelik",
      "Super Power": "Süper Güçler",
      "Ecchi": "Ecchi",
      "Harem": "Harem",
      "Parody": "Parodi",
      "Samurai": "Samuray",
      "Game": "Oyun",
      "Demons": "Şeytanlar",
      "Martial Arts": "Dövüş Sanatları",
      "Cars": "Arabalar",
      "Kids": "Çocuk",
      "Police": "Polisiye",
      "Space": "Uzay",
    };

    // Map + translate + limit to 18 for clean UI
    return data.data
      .map((g) => ({
        ...g,
        name: trMap[g.name] || g.name, // fallback to English if missing
      }))
      .slice(0, 18);
  } catch (e) {
    console.error("❌ fetchGenres failed:", e);
    return [];
  }
}

// ----------------------------------------------
// 🧩 (Optional) Helper for single anime detail
// ----------------------------------------------
export async function fetchAnimeById(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    console.error("❌ fetchAnimeById failed:", e);
    return null;
  }
}
