"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, Star } from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/popular", label: "Popular" },
  { href: "/new", label: "New" },
  { href: "/mylist", label: "My List" }
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setShowSearch(false);
    setQ("");
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/10 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-3">
        <Link href="/" className="font-black text-xl tracking-tight">
          <span className="text-white">glass</span>
          <span className="text-accent">Stream</span>
        </Link>

        <nav className="ml-4 hidden md:flex items-center gap-2">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "px-3 py-1.5 rounded-xl text-sm transition",
                  active
                    ? "bg-[#2A213F] text-white shadow-glass"
                    : "text-white/75 hover:text-white hover:bg-white/5"
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Search toggle */}
        <form onSubmit={submit} className="relative">
          <button
            type="button"
            onClick={() => setShowSearch((s) => !s)}
            className="btn mr-2 flex items-center gap-2"
            aria-label="Search"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>

          <div
            className={clsx(
              "absolute right-0 sm:right-auto sm:left-0 top-full mt-2 transition-all origin-top",
              showSearch ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            )}
          >
            <div className="glass p-2 w-[82vw] sm:w-[380px]">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search anime..."
                className="w-full bg-transparent outline-none px-3 py-2 rounded-lg border border-white/10"
              />
              <div className="flex justify-end">
                <button className="btn mt-2" type="submit">Find</button>
              </div>
            </div>
          </div>
        </form>

        <button className="btn hidden sm:inline-flex">
          <Star size={16} className="mr-2" /> Kaydol
        </button>
      </div>
    </header>
  );
}
