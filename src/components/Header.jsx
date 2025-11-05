import React, { useState, useEffect } from "react";
import { Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import AuthSwitch from "./AuthSwitch";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/browse?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 px-6 md:px-8 py-4 bg-glassDark/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight select-none">
          <span className="text-white">glas</span>
          <span className="text-glassPink drop-shadow-[0_0_10px_rgba(255,77,216,0.8)]">S</span>
          <span className="text-white">tream</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-white/90 hover:text-glassPink">Home</Link>
          <Link to="/browse" className="text-white/90 hover:text-glassPink">Browse</Link>
          <Link to="/popular" className="text-white/90 hover:text-glassPink">Popular</Link>
          <Link to="/new" className="text-white/90 hover:text-glassPink">New</Link>
          {user && <Link to="/mylist" className="text-white/90 hover:text-glassPink">My List</Link>}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4 relative">
          {/* Search */}
          <form onSubmit={submitSearch} className="relative flex items-center">
            <Search
              onClick={() => setShowSearch((s) => !s)}
              className="w-5 h-5 text-white/90 cursor-pointer hover:text-glassPink transition"
            />
            <AnimatePresence>
              {showSearch && (
                <motion.input
                  key="search"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search anime..."
                  className="ml-2 px-3 py-1 rounded-lg bg-white/10 text-white placeholder:text-white/60 outline-none border border-white/10"
                />
              )}
            </AnimatePresence>
          </form>

          {/* Auth */}
          {!user ? (
            <AuthSwitch />
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 hover:opacity-90"
              >
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=glasstream"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <span className="hidden sm:inline-block text-white/80 text-sm font-medium">
                  {user.user_metadata?.name || "User"}
                </span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden min-w-[150px] shadow-glow"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-white/20"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
