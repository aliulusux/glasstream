export async function fetchGenres() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/genres/anime");
    const data = await res.json();
    if (!data || !data.data) return [];

    // English → Turkish translation map
    const trMap = {
      Action: "Aksiyon",
      Adventure: "Macera",
      Comedy: "Komedi",
      Drama: "Drama",
      Fantasy: "Fantezi",
      Horror: "Korku",
      Romance: "Romantik",
      Sci-Fi: "Bilim Kurgu",
      Sports: "Spor",
      Slice: "Günlük Hayattan",
      Supernatural: "Doğaüstü",
      Mystery: "Gizem",
      Thriller: "Gerilim",
      Psychological: "Psikolojik",
      Mecha: "Mekanik",
      Music: "Müzik",
      School: "Okul",
      Military: "Askeri",
      Historical: "Tarihi",
      Shoujo: "Kızlara Yönelik",
      Shounen: "Erkeklere Yönelik",
      Super: "Süper Güçler",
      Ecchi: "Ecchi",
      Harem: "Harem",
      Parody: "Parodi",
      Samurai: "Samuray",
      Game: "Oyun",
      Demons: "Şeytanlar",
      Martial: "Dövüş Sanatları",
      Cars: "Arabalar",
      Kids: "Çocuk",
      Police: "Polisiye",
      Space: "Uzay",
    };

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
