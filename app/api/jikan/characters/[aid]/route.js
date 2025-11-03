import { NextResponse } from 'next/server';
export async function GET(_req, { params }) {
  const { aid } = params;
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${aid}/characters`);
    const j = await res.json();
    return NextResponse.json(j?.data || []);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
