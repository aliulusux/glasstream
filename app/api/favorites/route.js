// app/api/favorites/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const { user_id, anime } = await req.json();
    if (!user_id || !anime) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const { error } = await supabase.from("favorites").upsert([
      {
        user_id,
        anime_id: anime.mal_id,
        title: anime.title,
        cover_url:
          anime.images?.jpg?.large_image_url ||
          anime.images?.jpg?.image_url ||
          anime.image_url ||
          "",
        meta: anime,
      },
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Favorites API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
