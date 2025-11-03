// /app/mylist/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import AnimeGrid from "@/components/AnimeGrid";

export default function MyListPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let on = true;
    const load = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("favorites")
        .select("anime_id:title, cover_url:image, meta")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn(error.message);
        return;
      }
      // Normalize to AnimeGrid format
      const out = (data || []).map((r, i) => ({
        id: r.meta?.id || r.anime_id || i,
        title: r.meta?.title || "Saved anime",
        image: r.cover_url || r.meta?.image || "/placeholder.png",
        score: r.meta?.score ?? null,
        year: r.meta?.year ?? null,
        type: r.meta?.type ?? "",
      }));
      if (on) setItems(out);
    };
    load();
    return () => (on = false);
  }, [user]);

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold mb-2">My List</h1>
        <p className="text-white/70">Giriş yapmalısın.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">My List</h1>
      {items.length ? (
        <AnimeGrid items={items} />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">Henüz favori eklenmedi.</div>
      )}
    </section>
  );
}
