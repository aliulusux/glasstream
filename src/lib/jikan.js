// src/lib/jikan.js
// 🔗 Jikan API helper functions for Glasstream project
// Works perfectly with Browse.jsx and AnimeGrid components

// ----------------------------------------------
// 🧠 Fetch all anime (supports pagination & genre)
// ----------------------------------------------
export async function fetchAllAnime(page = 1, limit = 18, genreId = null, sortType = "popular") {
  try {
    // Base endpoint
    let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}`;

    // Sorting logic
    if (sortType === "popular") {
      url += "&order_by=score&sort=desc";
    } else if (sortType === "new") {
      url += "&order_by=start_date&sort=desc";
    } else if (sortType === "iconic") {
      // iconic = fixed list of legendary anime IDs
      const iconicIds = [
        5114, // Fullmetal Alchemist: Brotherhood
        11061, // Hunter x Hunter
        20, // Naruto
        1735, // Naruto: Shippuden
        269, // Bleach
        31964, // One Punch Man
        16498, // Attack on Titan
        1, // Cowboy Bebop
        918, // Gintama
        9969, // Fairy Tail
        11061, // Hunter x Hunter (2011)
        30, // Neon Genesis Evangelion
        1535, // Death Note
        50265, // Jujutsu Kaisen
        21, // One Piece
        11061, // Hunter x Hunter
        820, // Dragon Ball Z
        813, // Dragon Ball
        199, // Naruto (2002)
        223, // Dragon Ball GT
        34134, // Boku no Hero Academia
        3588, // Code Geass
        11757, // Sword Art Online
        6547, // Angel Beats!
        28891, // Kuroko no Basket
        32935, // Haikyuu!!
        32281, // One Punch Man
        9253, // Steins;Gate
        28805, // Shigatsu wa Kimi no Uso
        5114, // Fullmetal Brotherhood (for redundancy)
        38408 // Demon Slayer
      ];
      // build IDs string
      const ids = iconicIds.slice(0, limit).join(",");
      url = `https://api.jikan.moe/v4/anime?sfw=true&limit=${limit}&q=&ids=${ids}`;
    }

    // Add genre if selected
    if (genreId && sortType !== "iconic") {
      url += `&genres=${genreId}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.data) {
      console.warn("⚠️ No anime data returned from API.");
      return [];
    }

    return data.data.map((a) => ({
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
