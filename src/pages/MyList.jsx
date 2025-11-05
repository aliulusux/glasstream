"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function MyList() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user || null)
    );
    return () => listener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error) setFavorites(data);
    };
    fetchFavorites();
  }, [user]);

  if (!user)
    return (
      <div className="text-center text-white/70 mt-20">
        Favorilerinizi görmek için giriş yapın.
      </div>
    );

  if (favorites.length === 0)
    return (
      <div className="text-center text-white/70 mt-20">
        Henüz favoriniz yok 💔
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">🎀 Favorilerim</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
        {favorites.map((a) => (
          <Link
            key={a.mal_id}
            to={`/anime/${a.mal_id}`}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_15px_rgba(255,0,128,0.4)] transition-all"
          >
            <img
              src={a.image_url}
              alt={a.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-2">
              <h3 className="text-white text-sm font-semibold truncate">
                {a.title}
              </h3>
              {a.score && (
                <div className="mt-1 flex items-center gap-1 text-xs text-pink-400">
                  <span>★</span>
                  <span>{a.score}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
