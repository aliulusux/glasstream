export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  // Approximate "son eklenen animeler": use recent seasons as proxy
  const r = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`);
  const j = await r.json();
  return Response.json(j);
}
