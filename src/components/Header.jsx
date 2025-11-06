import React, { useState, useEffect, useRef } from "react";
import { Search, LogOut, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import AuthSwitch from "./AuthSwitch";

// ⏰ Helper for relative timestamps
const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [newNotif, setNewNotif] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const loaderRef = useRef(null);

  // 🔔 Fetch anime updates
  const fetchNotifications = async () => {
    try {
      const res = await fetch("https://api.jikan.moe/v4/seasons/now");
      const data = await res.json();
      const list = data.data.map((anime) => ({
        id: anime.mal_id,
        title: anime.title,
        subtitle: "New episode available!",
        time: timeAgo(anime.aired?.from || anime.year || Date.now()),
        image: anime.images.jpg?.large_image_url,
      }));

      // Detect new arrivals
      if (notifications.length > 0) {
        const oldIds = notifications.map((n) => n.id);
        const newOnes = list.filter((n) => !oldIds.includes(n.id));
        if (newOnes.length > 0) {
          setNewNotif(true);
          setTimeout(() => setNewNotif(false), 5000);
        }
      }

      setNotifications(list);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 🧠 Handle Google redirect fragment manually
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token) {
        supabase.auth
          .setSession({
            access_token,
            refresh_token,
          })
          .then(({ data, error }) => {
            if (!error && data.session) {
              localStorage.setItem("google_token", access_token);
              localStorage.setItem("google_user", JSON.stringify(data.session.user));
              setUser(data.session.user);
              navigate("/"); // redirect home after successful login
            }
          });
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (!e.target.closest(".user-menu")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("google_user");
    localStorage.removeItem("google_token");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/browse?q=${encodeURIComponent(q.trim())}`);
  };

  // 🌀 Infinite scroll for notifications
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < notifications.length) {
        setVisibleCount((prev) => prev + 10);
      }
    });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [notifications, visibleCount]);

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

        {/* Right side */}
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

          {!user ? (
            <AuthSwitch />
          ) : (
            <div className="flex items-center gap-4 relative">
              {/* 🔔 Notifications */}
              <div className="relative" ref={notifRef}>
                <motion.button
                  onClick={() => setNotifOpen((prev) => !prev)}
                  animate={newNotif ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
                  transition={{
                    repeat: newNotif ? Infinity : 0,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="text-white/90 hover:text-glassPink transition relative"
                >
                  <Bell
                    size={20}
                    className={
                      newNotif
                        ? "drop-shadow-[0_0_10px_rgba(255,0,128,0.8)] text-pink-400"
                        : ""
                    }
                  />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_6px_rgba(255,0,128,0.8)]" />
                  )}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 top-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden w-80 shadow-[0_0_25px_rgba(255,77,216,0.3)] max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20"
                    >
                      {notifications.length > 0 ? (
                        <>
                          {notifications.slice(0, visibleCount).map((n) => (
                            <motion.div
                              key={n.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/10 transition"
                            >
                              <img
                                src={n.image}
                                alt=""
                                className="w-10 h-14 object-cover rounded-md border border-white/10"
                              />
                              <div className="flex-1">
                                <Link
                                  to={`/anime/${n.id}`}
                                  className="text-white/90 text-sm font-medium line-clamp-2 hover:text-glassPink transition"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {n.title}
                                </Link>
                                <div className="text-xs text-white/70">{n.subtitle}</div>
                                <div className="text-xs text-white/50 mt-1">{n.time}</div>
                              </div>
                            </motion.div>
                          ))}
                          {visibleCount < notifications.length && (
                            <div ref={loaderRef} className="p-3 text-center text-white/60 text-sm">
                              Loading more...
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-4 text-center text-white/60 text-sm">
                          No new notifications
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 👤 User menu */}
              <div className="relative user-menu">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
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
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 top-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden min-w-[160px] shadow-[0_0_25px_rgba(255,77,216,0.3)]"
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
