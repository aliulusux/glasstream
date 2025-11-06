import React, { useState, useEffect, useRef } from "react";
import { Search, LogOut, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "../lib/supabaseClient";
import AuthSwitch from "./AuthSwitch";

const supabase = getSupabase();

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "🎬 New episode: Spy x Family Season 3" },
    { id: 2, title: "🔥 Attack on Titan finale is now streaming" },
  ]);

  const navigate = useNavigate();
  const notifRef = useRef(null);

  // 🧩 Handle Google redirect (restore session)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token) {
        supabase.auth
          .setSession({ access_token, refresh_token })
          .then(({ data, error }) => {
            if (!error && data.session) {
              localStorage.setItem("google_user", JSON.stringify(data.session.user));
              localStorage.setItem("google_token", access_token);
              setUser(data.session.user);
              window.history.replaceState({}, document.title, "/"); // Clean URL
            }
          });
      }
    }
  }, []);

  // 🧠 Load user from Supabase or localStorage
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      } else {
        const stored = localStorage.getItem("google_user");
        if (stored) setUser(JSON.parse(stored));
      }
    }
    loadSession();

    // Listen for Supabase auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        localStorage.setItem("google_user", JSON.stringify(session.user));
        setUser(session.user);
      } else {
        localStorage.removeItem("google_user");
        setUser(null);
      }
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  // 🔁 Ensure re-render if localStorage user exists
  useEffect(() => {
    const checkLocal = setInterval(() => {
      const stored = localStorage.getItem("google_user");
      if (stored && !user) setUser(JSON.parse(stored));
    }, 1000);
    return () => clearInterval(checkLocal);
  }, [user]);

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("google_user");
    localStorage.removeItem("google_token");
    setUser(null);
    navigate("/");
  };

  // 🔍 Search
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
          <Link to="/" className="text-white/90 hover:text-glassPink transition">
            Home
          </Link>
          <Link to="/browse" className="text-white/90 hover:text-glassPink transition">
            Browse
          </Link>
          {user && (
            <Link to="/mylist" className="text-white/90 hover:text-glassPink transition">
              My List
            </Link>
          )}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4 relative">
          {/* 🔍 Search */}
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
            <div className="flex items-center gap-4 relative">
              {/* 🔔 Bell */}
              <div className="relative" ref={notifRef}>
                <div
                  onClick={() => setNotifOpen(!notifOpen)}
                  className={`relative cursor-pointer transition ${
                    notifications.length > 0
                      ? "text-glassPink drop-shadow-[0_0_10px_rgba(255,77,216,0.9)] animate-pulse"
                      : "text-white/90 hover:text-glassPink"
                  }`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                  )}
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 top-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl w-72 shadow-lg overflow-hidden"
                    >
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-white/70 text-sm">
                          No new notifications
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="px-4 py-2 border-b border-white/10 text-sm text-white/80 hover:bg-white/20 transition"
                          >
                            {n.title}
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 👤 User avatar + dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >
                  <img
                    src={
                      user.user_metadata?.avatar_url ||
                      user.picture ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=glasstream"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <span className="hidden sm:inline-block text-white/80 text-sm font-medium">
                    {user.user_metadata?.name || user.name || "User"}
                  </span>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 top-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden min-w-[160px] shadow-[0_0_20px_rgba(255,77,216,0.3)]"
                    >
                      <Link
                        to="/mylist"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/20 transition"
                      >
                        My List
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/20 transition"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/20 transition"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
