// /components/Header.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthProvider";

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

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          <span className="text-pink-400">Anime</span>
          <span className="text-white/90">Stream</span>
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
