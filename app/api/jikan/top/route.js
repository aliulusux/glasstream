// app/api/jikan/top/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime");
    const { data } = await res.json();

    const items = data.map((a) => ({
      mal_id: a.mal_id,
      title: a.title,
      year: a.year,
      type: a.type,
      score: a.score,
      images: a.images, // ✅ important
    }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Jikan top error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
