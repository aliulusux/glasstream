export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "24";
  const r = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`);
  const j = await r.json();
  return Response.json(j);
}
