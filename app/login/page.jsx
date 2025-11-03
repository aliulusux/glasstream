'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else router.push('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white px-4">
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Welcome Back 👋</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition font-semibold">
            Sign In
          </button>
        </form>
        {msg && <p className="text-sm text-pink-400 mt-4 text-center">{msg}</p>}
        <p className="mt-6 text-center text-white/70">
          Don’t have an account?{' '}
          <Link href="/register" className="text-pink-400 hover:text-pink-300">Create one</Link>
        </p>
      </div>
    </div>
  );
}
