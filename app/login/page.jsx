// /app/login/page.jsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handle(e) {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErr(error.message);
    router.push("/");
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <h1 className="text-2xl font-semibold mb-6">Giriş yap</h1>
      <form onSubmit={handle} className="space-y-4">
        <input
          className="w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          required
        />
        {err && <p className="text-pink-300 text-sm">{err}</p>}
        <button className="w-full rounded-xl bg-pink-500/80 hover:bg-pink-500 py-2">Sign in</button>
      </form>
      <p className="mt-4 text-sm text-white/70">
        Don’t have an account? <Link className="text-pink-300 hover:text-pink-200" href="/register">Create one</Link>
      </p>
    </div>
  );
}
