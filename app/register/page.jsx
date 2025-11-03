'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    setMsg('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMsg(error.message);
    else setMsg('✅ Check your email to verify your account!');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0613] via-[#1a1030] to-[#2b1948] text-white px-4">
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Create Account ✨</h1>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition font-semibold">
            Sign Up
          </button>
        </form>
        {msg && <p className="text-sm text-center mt-4 text-pink-300">{msg}</p>}
        <p className="mt-6 text-center text-white/70">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-400 hover:text-pink-300">Login</Link>
        </p>
      </div>
    </div>
  );
}
