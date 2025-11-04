import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

/**
 * Minimal favorite toggler:
 * - Glowing pink when active
 * - Saves to localStorage immediately for UX
 * - If user is logged in, also upserts to Supabase table 'favorites'
 *
 * Supabase table schema suggestion:
 *   create table favorites (
 *     user_id uuid references auth.users on delete cascade,
 *     mal_id  bigint not null,
 *     title   text,
 *     cover   text,
 *     primary key (user_id, mal_id)
 *   );
 */
export default function FavoriteButton({ anime }) {
  const key = "glassstream:favs";
  const [active, setActive] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    const set = new Set(JSON.parse(raw || "[]"));
    setActive(set.has(anime.mal_id));
  }, [anime.mal_id]);

  async function toggle() {
    const raw = localStorage.getItem(key);
    const set = new Set(JSON.parse(raw || "[]"));
    const next = new Set(set);

    if (next.has(anime.mal_id)) next.delete(anime.mal_id);
    else next.add(anime.mal_id);

    localStorage.setItem(key, JSON.stringify([...next]));
    setActive(next.has(anime.mal_id));

    // try Supabase (optional; ignore errors for now)
    const { data: { user } = {} } = await supabase.auth.getUser();
    if (user) {
      if (next.has(anime.mal_id)) {
        await supabase.from("favorites").upsert({
          user_id: user.id,
          mal_id: anime.mal_id,
          title: anime.title,
          cover:
            anime?.images?.jpg?.large_image_url ||
            anime?.images?.jpg?.image_url ||
            null,
        });
      } else {
        await supabase.from("favorites").delete().match({
          user_id: user.id,
          mal_id: anime.mal_id,
        });
      }
    }
  }

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full bg-black/40 hover:bg-black/50 transition 
        ${active ? "shadow-glow" : ""}`}
      title={active ? "Remove from My List" : "Add to My List"}
      aria-label="Toggle favorite"
    >
      <Heart
        size={18}
        className={active ? "text-glassPink fill-glassPink" : "text-white"}
      />
    </button>
  );
}
