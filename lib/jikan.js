// lib/jikan.js
const BASE_URL = "https://api.jikan.moe/v4";

// Fetch trending / top anime
export async function fetchTopAnime() {
  try {
    const res = await fetch(`${BASE_URL}/top/anime?limit=25`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("fetchTopAnime error:", err);
    return [];
  }
}

// Fetch newly added anime
export async function fetchRecentAnime() {
  try {
    const res = await fetch(`${BASE_URL}/seasons/now?limit=25`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to fetch recent anime");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("fetchRecentAnime error:", err);
    return [];
  }
}

// Fetch anime by genre slug
export async function fetchByGenre(slug, page = 1, limit = 24) {
  try {
    const res = await fetch(`${BASE_URL}/anime?genres=${slug}&page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch genre anime");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("fetchByGenre error:", err);
    return [];
  }
}

// Fetch anime details by ID
export async function fetchAnime(aid) {
  try {
    const res = await fetch(`${BASE_URL}/anime/${aid}/full`);
    if (!res.ok) throw new Error("Failed to fetch anime details");
    const data = await res.json();
    return data.data || {};
  } catch (err) {
    console.error("fetchAnime error:", err);
    return {};
  }
}

// Fetch related anime by ID
export async function getRelatedAnimeWithCovers(aid) {
  try {
    const res = await fetch(`${BASE_URL}/anime/${aid}/relations`);
    if (!res.ok) throw new Error("Failed to fetch related anime");
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("getRelatedAnimeWithCovers error:", err);
    return [];
  }
}
