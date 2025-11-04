const BASE = "https://api.jikan.moe/v4";

// Unified fetch helper (handles rate-limits gently)
async function jikan(path, { cacheSeconds = 300, noStore = false } = {}) {
  const opts = noStore
    ? { cache: "no-store" }
    : { next: { revalidate: cacheSeconds } };
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    // Jikan 429 sometimes — just return empty
    return { data: [], pagination: { has_next_page: false, current_page: 1 } };
  }
  return res.json();
}

export async function fetchTopAnime(page = 1, limit = 24) {
  const { data = [], pagination = {} } =
    await jikan(`/top/anime?page=${page}&limit=${limit}`, { cacheSeconds: 120 });
  return { data, pagination };
}

export async function fetchRecentAnime(page = 1, limit = 24) {
  const { data = [], pagination = {} } =
    await jikan(`/seasons/now?page=${page}&limit=${limit}`, { cacheSeconds: 180 });
  return { data, pagination };
}

export async function fetchAnimeById(id) {
  const { data } = await jikan(`/anime/${id}`, { cacheSeconds: 300 });
  return data || null;
}

export async function searchAnime(q, page = 1, limit = 24) {
  if (!q) return { data: [], pagination: {} };
  const { data = [], pagination = {} } =
    await jikan(`/anime?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`, { noStore: true });
  return { data, pagination };
}
