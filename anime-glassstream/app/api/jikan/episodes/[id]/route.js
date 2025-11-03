export async function GET(req, { params }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const r = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${page}`);
  const j = await r.json();
  return Response.json(j);
}
