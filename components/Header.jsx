// /components/Header.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthProvider";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse", disabled: true }, // placeholder
  { href: "/popular", label: "Popular" },
  { href: "/new", label: "New" },
  { href: "/mylist", label: "My List" },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
        <motion.h6 className="drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          <span className="text-white/90">glas</span>
          <span className="text-pink-400 " >sS</span> 
          <span className="text-white/90">tream</span>
        </motion.h6>  
        </Link>
        <nav className="flex gap-1">
          {tabs.map(t => (
            <Link
              key={t.href}
              href={t.disabled ? "#" : t.href}
              className={[
                "px-3 py-1.5 rounded-xl text-sm",
                pathname === t.href ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5",
                t.disabled && "pointer-events-none opacity-40"
              ].join(" ")}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* 🔍 Search toggle */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full bg-white/10 hover:bg-pink-500/20 transition"
            >
              <Search className="w-5 h-5 text-white" />
            </button>

            {searchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-2 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent outline-none text-white placeholder-white/50 w-48"
                />
                <button
                  type="submit"
                  className="text-sm text-white/80 hover:text-pink-400 transition"
                >
                  Go
                </button>
              </form>
            )}
          </div>
          {!user ? (
            <>
              <Link href="/login" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm">Giriş</Link>
              <Link href="/register" className="px-3 py-1.5 rounded-xl bg-pink-500/80 hover:bg-pink-500 text-sm text-white shadow-lg shadow-pink-500/25">Kaydol</Link>
            </>
          ) : (
            <>
              <span className="text-white/80 text-sm hidden sm:inline">Hi, {user.email}</span>
              <button onClick={logout} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm">Çıkış</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
