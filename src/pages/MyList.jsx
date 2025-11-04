import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import AnimeGrid from "../components/AnimeGrid";

export default function MyList() {
  const [list, setList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setLoggedIn(false);
        setLoading(false);
        navigate("/");
        return;
      }

      setLoggedIn(true);

      // Fetch favorites from Supabase
      const { data } = await supabase
        .from("favorites")
        .select("mal_id,title,cover")
        .eq("user_id", session.user.id)
        .limit(100);

      if (data && data.length > 0) {
        setList(
          data.map((d) => ({
            mal_id: d.mal_id,
            title: d.title,
            images: { jpg: { large_image_url: d.cover } },
          }))
        );
      } else {
        setList([]);
      }

      setLoading(false);
    }

    fetchData();
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-white/70">Loading...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        My List {loggedIn ? "(Synced)" : "(Local)"}
      </h1>
      {list.length > 0 ? (
        <AnimeGrid animeList={list} />
      ) : (
        <p className="text-white/70">No favorites yet.</p>
      )}
    </main>
  );
}
