// /lib/jikan.js

// 🔥 Fetch Top Anime
export async function fetchTopAnime(page = 1, limit = 24) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 300 }, // ✅ allow ISR, avoid dynamic server usage
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch top anime: ${res.status}`);
    const { data } = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchTopAnime error:", err);
    return [];
  }
}


// 🔥 Fetch Current Season Anime
export async function fetchRecentAnime(page = 1, limit = 24) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch recent anime: ${res.status}`);
    const { data } = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchRecentAnime error:", err);
    return [];
  }
}

// 🔥 Fetch Anime by ID
export async function fetchAnimeById(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const json = await res.json();
  return json.data; // ✅ only return the "data" part
}

// 🔥 Fetch by Genre (optional)
export async function fetchByGenre(genre, page = 1, limit = 24) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?genres=${genre}&page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch by genre");
    const { data, pagination } = await res.json();
    return { data: Array.isArray(data) ? data : [], pagination: pagination || {} };
  } catch (err) {
    console.error("fetchByGenre error:", err);
    return { data: [], pagination: {} };
  }
}
