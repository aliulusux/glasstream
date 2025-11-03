import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 24;

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${slug}&page=${page}&limit=${limit}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Genre fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch genre list' }, { status: 500 });
  }
}
