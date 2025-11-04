// /lib/jikan.js

// ✅ Base Jikan API URL
const JIKAN_BASE = "https://api.jikan.moe/v4";

// ✅ Fetch top anime (for homepage, popular, seasonal etc.)
export async function fetchTopAnime(limit = 24) {
  try {
    const res = await fetch(`${JIKAN_BASE}/top/anime?limit=${limit}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const { data } = await res.json();

    return data.map((a) => ({
      id: a.mal_id,
      mal_id: a.mal_id,
      title: a.title,
      year: a.year,
      type: a.type,
      score: a.score,
      images: a.images,
    }));
  } catch (err) {
    console.error("fetchTopAnime error:", err);
    return [];
  }
}

// ✅ Fetch anime by genre (for genre/[slug]/page.jsx)
export async function fetchByGenre(genreId, page = 1, limit = 24) {
  try {
    const res = await fetch(
      `${JIKAN_BASE}/anime?genres=${genreId}&page=${page}&limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("Failed to fetch genre anime");
    const { data } = await res.json();

    return data.map((a) => ({
      id: a.mal_id,
      mal_id: a.mal_id,
      title: a.title,
      year: a.year,
      type: a.type,
      score: a.score,
      images: a.images,
    }));
  } catch (err) {
    console.error("fetchByGenre error:", err);
    return [];
  }
}

// ✅ Fetch anime by ID (for /anime/[aid]/page.jsx)
export async function fetchAnimeById(aid) {
  try {
    const res = await fetch(`${JIKAN_BASE}/anime/${aid}`, {
      cache: "no-store", // always fresh
    });
    if (!res.ok) throw new Error("Failed to fetch anime details");
    const { data } = await res.json();

    return {
      id: data.mal_id,
      mal_id: data.mal_id,
      title: data.title,
      synopsis: data.synopsis,
      year: data.year,
      type: data.type,
      score: data.score,
      episodes: data.episodes,
      images: data.images,
    };
  } catch (err) {
    console.error("fetchAnimeById error:", err);
    return null;
  }
}

// ✅ (Optional) Related anime loader — if you use it later
export async function getRelatedAnimeWithCovers(aid) {
  try {
    const res = await fetch(`${JIKAN_BASE}/anime/${aid}/relations`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch related anime");
    const { data } = await res.json();

    const related = data.flatMap((rel) =>
      rel.entry.map((a) => ({
        id: a.mal_id,
        title: a.name,
        type: rel.relation,
        cover: a.images?.jpg?.large_image_url || "/no-cover.jpg",
      }))
    );

    return related;
  } catch (err) {
    console.error("getRelatedAnimeWithCovers error:", err);
    return [];
  }
}
