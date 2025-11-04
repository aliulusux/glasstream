"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/popular", label: "Popular" },
  { href: "/new", label: "New" },
  { href: "/mylist", label: "My List" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setShowSearch(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#141024]/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <nav className="flex items-center gap-3">
          {tabs.map((t) => {
            const active = pathname === t.href || pathname.startsWith(t.href + "/");
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`px-3 py-1.5 rounded-2xl text-sm transition
                  ${active
                    ? "bg-fuchsia-700/40 text-white"
                    : "hover:bg-white/10 text-white/80"}`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Toggle search"
            className="p-2 rounded-xl hover:bg-white/10"
          >
            <Search size={18} />
          </button>

          <form onSubmit={onSubmit}
            className={`overflow-hidden transition-[width,opacity] duration-300
            ${showSearch ? "opacity-100 w-56" : "opacity-0 w-0"}`}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search anime…"
              className="w-full bg-white/10 focus:bg-white/15 outline-none rounded-xl px-3 py-1.5 text-sm"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
