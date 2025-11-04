// /lib/jikan.js

// 🔥 Fetch Top Anime
export async function fetchTopAnime(page = 1, limit = 24) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`,
      { next: { revalidate: 125 } }
    );
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const { data, pagination } = await res.json();
    return { data: Array.isArray(data) ? data : [], pagination: pagination || {} };
  } catch (err) {
    console.error("fetchTopAnime error:", err);
    return { data: [], pagination: {} };
  }
}

// 🔥 Fetch Current Season Anime
export async function fetchRecentAnime(page = 1, limit = 24) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("Failed to fetch current season anime");
    const { data, pagination } = await res.json();
    return { data: Array.isArray(data) ? data : [], pagination: pagination || {} };
  } catch (err) {
    console.error("fetchRecentAnime error:", err);
    return { data: [], pagination: {} };
  }
}

// 🔥 Fetch Anime by ID
export async function fetchAnimeById(id) {
  try {
    if (!id) throw new Error("No ID provided");
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!res.ok) throw new Error("Failed to fetch anime details");
    const { data } = await res.json();
    return data || null;
  } catch (err) {
    console.error("fetchAnimeById error:", err);
    return null;
  }
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
