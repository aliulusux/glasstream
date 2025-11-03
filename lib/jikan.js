const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";
async function wrap(u){ try { const r = await fetch(u, { next:{ revalidate:300 } }); if(!r.ok) throw 0; return await r.json(); } catch(e){ return { data: [] }; } }
export async function getTop(p=1,l=24){return wrap(`${BASE}/api/jikan/top?page=${p}&limit=${l}`)}
export async function getSeasonNow(p=1,l=24){return wrap(`${BASE}/api/jikan/season-now?page=${p}&limit=${l}`)}
export async function searchAnime(q,p=1,l=24){return wrap(`${BASE}/api/jikan/search?q=${encodeURIComponent(q)}&page=${p}&limit=${l}`)}
export async function getAnime(id){return wrap(`${BASE}/api/jikan/anime/${id}`)}
export async function getEpisodes(id,p=1){return wrap(`${BASE}/api/jikan/episodes/${id}?page=${p}`)}
export async function getRecentEpisodes(p=1){return wrap(`${BASE}/api/jikan/recent-episodes?page=${p}`)}
export async function getRecentAnime(p=1){return wrap(`${BASE}/api/jikan/recent-anime?page=${p}`)}
export async function getByGenre(gid,p=1,l=24){return wrap(`${BASE}/api/jikan/genre?gid=${gid}&page=${p}&limit=${l}`)}
