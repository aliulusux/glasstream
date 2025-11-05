import React, { useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import AuthModal from "./AuthModal";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [session, setSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function HeaderSearch() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {[
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
            { name: "Popular", path: "/popular" },
            { name: "New", path: "/new" },
          ]
            .concat(session ? [{ name: "My List", path: "/mylist" }] : [])
            .map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative group overflow-hidden"
              >
                <span className="transition-colors group-hover:text-pink-400 hover-glow">
                  {item.name}
                </span>
                {/* underline animation */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-pink-500 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </Link>
            ))}
        </nav>

        {/* Right: Search + Auth */}
        <div className="flex items-center gap-4">
          <div
            ref={inputRef}
            className={`flex items-center transition-all duration-300 ease-in-out ${
              expanded ? "w-56 sm:w-64 md:w-80" : "w-9"
            } bg-white/10 rounded-lg overflow-hidden`}
          >
            <button
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
