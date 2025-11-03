import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req) {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("anime_id, title, cover_url, meta, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ favorites: data });
  } catch (err) {
    console.error("Favorites API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
