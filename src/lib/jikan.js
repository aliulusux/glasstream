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
        "Sci-Fi": "Bilim Kurgu", // ✅ FIXED (key wrapped in quotes)
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
        "Space": "Uzay"
    };

    export async function fetchAllAnime(page = 1, limit = 18, genreId = null) {
        try {
            // Build the API URL
            let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}&order_by=score&sort=desc`;

            if (genreId) {
            url += `&genres=${genreId}`;
            }

            const res = await fetch(url);
            const data = await res.json();

            if (!data || !data.data) {
            console.warn("No anime data received from Jikan API");
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
            console.error("fetchAllAnime failed:", err);
            return [];
        }
    }


    // Map + translate
    return data.data
      .map((g) => ({
        ...g,
        name: trMap[g.name] || g.name, // fallback if not found
      }))
      .slice(0, 18); // limit to 18
  } catch (e) {
    console.error("fetchGenres failed:", e);
    return [];
  }
}
