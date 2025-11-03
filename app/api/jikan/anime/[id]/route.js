export async function GET(_req, { params }) {
  const { id } = params;
  const r = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const j = await r.json();
  return Response.json(j);
}
