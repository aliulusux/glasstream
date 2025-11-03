// /lib/jikan.js
"use client";

const BASE = "https://api.jikan.moe/v4";

function simplify(list = []) {
  return list.map(x => ({
    id: x.mal_id,
    title: x.title || x.title_english || x.title_japanese || "Untitled",
    image: x.images?.jpg?.large_image_url || x.images?.jpg?.image_url || "/placeholder.png",
    score: x.score ?? null,
    year: x.year ?? null,
    type: x.type ?? "",
    episodes: x.episodes ?? null,
  }));
}

export async function fetchTopAnime(page = 1) {
  const res = await fetch(`${BASE}/top/anime?page=${page}`, { cache: "no-store" });
  const json = await res.json();
  return {
    items: simplify(json?.data || []),
    pageInfo: { hasNext: !!json?.pagination?.has_next_page, cur: page }
  };
}

export async function fetchRecentAnime(page = 1) {
  const res = await fetch(`${BASE}/seasons/now?page=${page}`, { cache: "no-store" });
  const json = await res.json();
  return {
    items: simplify(json?.data || []),
    pageInfo: { hasNext: !!json?.pagination?.has_next_page, cur: page }
  };
}

export async function fetchAnimeById(id) {
  const res = await fetch(`${BASE}/anime/${id}`, { cache: "no-store" });
  const json = await res.json();
  const d = json?.data;
  if (!d) return null;
  return {
    id: d.mal_id,
    title: d.title,
    image: d.images?.jpg?.large_image_url || d.images?.jpg?.image_url || "/placeholder.png",
    score: d.score ?? null,
    year: d.year ?? null,
    type: d.type ?? "",
    episodes: d.episodes ?? null,
    synopsis: d.synopsis ?? "",
  };
}
