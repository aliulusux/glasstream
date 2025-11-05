import React, { useState, useEffect } from "react";
import { Search, Star, LogOut, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import AuthModal from "./AuthModal";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🧠 Supabase auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  // ✅ Auto-close search when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
    setExpanded(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 px-6 md:px-8 py-4 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight select-none flex items-center gap-1"
          onClick={() => setExpanded(false)}
        >
          <span className="text-white">glas</span>
          <span className="text-pink-500 drop-shadow-[0_0_10px_rgba(255,77,216,0.8)]">S</span>
          <span className="text-white">tream</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
            { name: "Popular", path: "/popular" },
            { name: "New", path: "/new" },
          ]
            .concat(user ? [{ name: "My List", path: "/mylist" }] : [])
            .map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setExpanded(false)}
                className={`relative group transition ${
                  isActive(item.path)
                    ? "text-pink-400 after:w-full"
                    : "text-white/90 hover:text-pink-400"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-[-2px] h-[2px] bg-pink-500 rounded-full transition-all duration-300 ease-out ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 relative">
          {/* Expanding Search */}
          <form
            onSubmit={handleSearchSubmit}
            className={`flex items-center bg-white/10 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
              expanded ? "w-56 sm:w-64 md:w-80 shadow-[0_0_10px_rgba(255,105,180,0.4)]" : "w-9"
            }`}
          >
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="p-2 text-white/70 hover:text-pink-400 transition"
            >
              {expanded ? <X size={18} /> : <Search size={18} />}
            </button>
            {expanded && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime..."
                autoFocus
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none px-2"
              />
            )}
          </form>

          {/* Auth Area */}
          {!user ? (
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition"
            >
              <Star size={16} className="text-pink-400" />
              <span className="text-white text-sm">Kaydol / Giriş</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 hover:opacity-90"
              >
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=glassUser"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <span className="hidden sm:inline-block text-white/80 text-sm font-medium">
                  {user.user_metadata?.name || "User"}
                </span>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden min-w-[150px]"
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

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
