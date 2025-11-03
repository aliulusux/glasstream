// /app/not-found.jsx
"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
      <div className="text-7xl">🛰️</div>
      <h1 className="text-2xl font-bold">Sayfa bulunamadı</h1>
      <p className="text-white/70">
        Yıldızlar arasında kaybolduk gibi… Aradığınız sayfa yok ya da taşınmış olabilir.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">Ana sayfa</Link>
        <Link href="/popular" className="px-4 py-2 rounded-xl bg-pink-500/80 hover:bg-pink-500 text-white">Popüler</Link>
      </div>
    </div>
  );
}
