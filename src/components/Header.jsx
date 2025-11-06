import React, { useState, useEffect, useRef } from "react";
import { Search, LogOut, Bell, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import AuthSwitch from "./AuthSwitch";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(true);
  const [justCleared, setJustCleared] = useState(false);

  const navigate = useNavigate();
  const notifRef = useRef(null);

  /* ---------------- AUTH STATE ---------------- */
  useEffect(() => {
    // Load existing session
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) setUser(data.session.user);
    };
    loadSession();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user || null);
    });

    // Cleanup
    return () => subscription.unsubscribe();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const submitSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/browse?q=${encodeURIComponent(q.trim())}`);
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  /* ---------------- NOTIFICATIONS ---------------- */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoadingNotif(true);
        const res = await fetch("https://api.jikan.moe/v4/seasons/now");
        const data = await res.json();
        if (data?.data?.length > 0) {
          const list = data.data.slice(0, 5).map((a) => ({
            id: a.mal_id,
            title: a.title,
            message: "New episode just released!",
            cover:
              a.images?.jpg?.image_url ||
              a.images?.webp?.image_url ||
              "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",
            read: false,
          }));
          setNotifications(list);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Notification fetch error:", err);
        setNotifications([]);
      } finally {
        setLoadingNotif(false);
      }
    };
    fetchNotifications();
  }, []);

  /* ---------------- MARK ALL AS READ ---------------- */
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setJustCleared(true);
    setTimeout(() => setJustCleared(false), 1600);
  };

  const anyUnread = notifications.some((n) => !n.read);

  /* ---------------- HEADER ---------------- */
  return (
    <header className="sticky top-0 z-40 px-6 md:px-8 py-4 bg-glassDark/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight select-none"
        >
          <span className="text-white">glas</span>
          <span className="text-glassPink drop-shadow-[0_0_10px_rgba(255,77,216,0.8)]">
            S
          </span>
          <span className="text-white">tream</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-white/90 hover:text-glassPink transition"
          >
            Anasayfa
          </Link>
          <Link
            to="/browse"
            className="text-white/90 hover:text-glassPink transition"
          >
            Keşfet
          </Link>
          {user && (
            <Link
              to="/mylist"
              className="text-white/90 hover:text-glassPink transition"
            >
              My List
            </Link>
          )}
        </nav>

        {/* Right controls */}
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
                  placeholder="Anime ara..."
                  className="ml-2 px-3 py-1 rounded-lg bg-white/10 text-white placeholder:text-white/60 outline-none border border-white/10"
                />
              )}
            </AnimatePresence>
          </form>

          {/* Auth */}
          {!user ? (
              <AuthSwitch
                onAuthSuccess={() =>
                  supabase.auth.getSession().then(({ data }) =>
                    setUser(data?.session?.user)
                  )
                }
              />
          ) : (
            <div className="flex items-center gap-4 relative">
              {/* 🔔 Notifications */}
              <div className="relative" ref={notifRef}>
                <div
                  onClick={() => setNotifOpen((o) => !o)}
                  className={`relative cursor-pointer transition ${
                    anyUnread
                      ? "text-glassPink drop-shadow-[0_0_10px_rgba(255,77,216,0.9)] animate-pulse"
                      : "text-white/90 hover:text-glassPink"
                  }`}
                >
                  <Bell size={20} />
                  {anyUnread && (
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                  )}
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22 }}
                      className="absolute right-0 top-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl w-80 shadow-lg overflow-hidden"
                    >
                      {/* Header row */}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                        <span className="text-white/80 text-sm font-medium">
                          Notifications
                        </span>
                        <div className="h-6 flex items-center">
                          <AnimatePresence mode="wait">
                            {justCleared ? (
                              <motion.div
                                key="cleared"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.18 }}
                                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-glassPink/20 text-pink-200 border border-pink-400/40 shadow-[0_0_12px_rgba(255,77,216,0.35)]"
                              >
                                <Check size={14} />
                                All caught up!
                              </motion.div>
                            ) : notifications.length > 0 ? (
                              <motion.button
                                key="markbtn"
                                onClick={markAllAsRead}
                                whileTap={{ scale: 0.96 }}
                                className="flex items-center gap-1 text-xs text-glassPink hover:text-white px-2 py-1 rounded-md border border-white/10 hover:bg-white/10 transition"
                              >
                                <Check size={14} />
                                Mark all as read
                              </motion.button>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Content */}
                      {loadingNotif ? (
                        <div className="p-4 text-center text-white/70 text-sm">
                          Loading notifications...
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="p-4 text-center text-white/70 text-sm">
                          No new notifications found.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <Link
                            key={n.id}
                            to={`/anime/${n.id}`}
                            onClick={() => setNotifOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 border-b border-white/10 text-sm text-white/90 hover:bg-white/20 transition"
                          >
                            <img
                              src={n.cover}
                              alt={n.title}
                              className="w-10 h-14 rounded-md object-cover border border-white/10"
                            />
                            <div className="flex-1 leading-tight">
                              <span className="block text-white/90 font-medium">
                                {n.title}
                              </span>
                              <span className="block text-xs text-white/60">
                                {n.message}
                              </span>
                            </div>
                            {!n.read && (
                              <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-pink-200 bg-pink-500/20 border border-pink-400/30 px-2 py-0.5 rounded-full">
                                New
                              </span>
                            )}
                          </Link>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 👤 User Menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >
                  <img
                    src={
                      user?.user_metadata?.avatar_url ||
                      user?.picture ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=glasstream"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <span className="hidden sm:inline-block text-white/80 text-sm font-medium">
                    {user?.user_metadata?.name || user?.name || "User"}
                  </span>
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
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
