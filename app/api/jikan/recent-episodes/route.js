export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  // Prefer watch/episodes if available; fallback to schedules
  let r = await fetch(`https://api.jikan.moe/v4/watch/episodes?page=${page}`).catch(()=>null);
  if (!r || !r.ok) {
    r = await fetch(`https://api.jikan.moe/v4/schedules?page=${page}`);
  }
  const j = await r.json();
  return Response.json(j);
}
