import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  if (!q) return NextResponse.json([]);

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${q}&limit=24`);
    const data = await res.json();
    return NextResponse.json(data.data || []);
  } catch (err) {
    console.error('Search fetch failed:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
