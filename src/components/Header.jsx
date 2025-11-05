import React, { useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import AuthModal from "./AuthModal";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [session, setSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full bg-transparent border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold select-none flex items-center gap-1">
          <span className="text-white">glas</span>
          <span className="text-pink-500">sStream</span>
        </Link>

        {/* Center: Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium text-white/90">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/browse" className="hover:text-pink-400 transition">Browse</Link>
          <Link to="/popular" className="hover:text-pink-400 transition">Popular</Link>
          <Link to="/new" className="hover:text-pink-400 transition">New</Link>
          {session && (
            <Link to="/mylist" className="hover:text-pink-400 transition">My List</Link>
          )}
        </nav>

        {/* Right: Search + Auth */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-2 top-2.5 text-white/50" />
            <input
              type="text"
              placeholder="Search anime..."
              className="bg-white/10 text-sm pl-8 pr-3 py-1.5 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
          </div>

          {session ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 hover:bg-pink-600 rounded-md text-sm font-medium shadow-glow"
            >
              <Star size={14} /> Kaydol / Giriş
            </button>
          )}
        </div>
      </div>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}
