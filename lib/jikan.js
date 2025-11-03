const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";
async function wrap(url){ try{ const res = await fetch(url, { next:{ revalidate:300 } }); if(!res.ok) throw 0; return await res.json(); } catch(e){ return { data: [] }; } }
export async function getTop(page=1, limit=24){ return wrap(`${BASE}/api/jikan/top?page=${page}&limit=${limit}`); }
export async function getSeasonNow(page=1, limit=24){ return wrap(`${BASE}/api/jikan/season-now?page=${page}&limit=${limit}`); }
export async function searchAnime(q, page=1, limit=24){ return wrap(`${BASE}/api/jikan/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`); }
export async function getAnime(id){ return wrap(`${BASE}/api/jikan/anime/${id}`); }
export async function getEpisodes(id, page=1){ return wrap(`${BASE}/api/jikan/episodes/${id}?page=${page}`); }
export async function getRecentEpisodes(page=1){ return wrap(`${BASE}/api/jikan/recent-episodes?page=${page}`); }
export async function getRecentAnime(page=1){ return wrap(`${BASE}/api/jikan/recent-anime?page=${page}`); }
