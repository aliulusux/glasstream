import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { aid } = params;
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${aid}/full`);
    const data = await res.json();
    return NextResponse.json(data.data || {});
  } catch (err) {
    console.error('Jikan anime fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch anime' }, { status: 500 });
  }
}
