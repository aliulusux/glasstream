export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "24";
  const r = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}&sfw`);
  const j = await r.json();
  return Response.json(j);
}
