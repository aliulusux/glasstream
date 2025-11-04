import { useEffect, useState } from "react";
import AnimeGrid from "../components/AnimeGrid";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function MyList() {
  const [list, setList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { user } = {} } = await supabase.auth.getUser();
      if (user) {
        setLoggedIn(true);
        const { data } = await supabase
          .from("favorites")
          .select("mal_id,title,cover")
          .eq("user_id", user.id)
          .limit(200);
        setList((data || []).map((d) => ({
          mal_id: d.mal_id,
          title: d.title,
          images: { jpg: { large_image_url: d.cover } }
        })));
      } else {
        // fallback to localStorage
        const key = "glassstream:favs";
        const ids = new Set(JSON.parse(localStorage.getItem(key) || "[]"));
        if (ids.size) {
          const qs = [...ids].slice(0, 25).map((id) => `ids[]=${id}`).join("&");
          const res = await fetch(`https://api.jikan.moe/v4/anime?${qs}`);
          const j = await res.json();
          setList(j?.data || []);
        } else {
          setList([]);
        }
      }
    })();
  }, []);

export default function MyList() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-white/70">Loading…</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My List {loggedIn ? "(Synced)" : "(Local)"}</h1>
      {list.length ? <AnimeGrid animeList={list} /> : <p className="text-white/70">No favorites yet.</p>}
    </main>
  );
}
