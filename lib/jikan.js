// /lib/jikan.js

const BASE_URL = "https://api.jikan.moe/v4";

/**
 * Safe fetch wrapper — prevents build crash if Jikan API is slow or down.
 */
async function safeFetch(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("⚠️ Jikan fetch failed:", url, err.message);
    // Return empty list instead of crashing the build
    return [];
  }
}

/**
 * Get top anime list
 */
export async function fetchTopAnime(page = 1, limit = 24) {
  const url = `${BASE_URL}/top/anime?page=${page}&limit=${limit}`;
  return safeFetch(url);
}

/**
 * Get current season anime (now airing)
 */
export async function fetchRecentAnime(page = 1, limit = 24) {
  const url = `${BASE_URL}/seasons/now?page=${page}&limit=${limit}`;
  return safeFetch(url);
}

/**
 * Get anime by genre
 */
export async function fetchByGenre(genreId, page = 1, limit = 24) {
  const url = `${BASE_URL}/anime?genres=${genreId}&page=${page}&limit=${limit}`;
  return safeFetch(url);
}

/**
 * Search anime by title
 */
export async function searchAnime(query, page = 1, limit = 24) {
  const url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
  return safeFetch(url);
}
