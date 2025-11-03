'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#120b25] via-[#1f1238] to-[#090316]">
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-white mb-6">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-sm text-pink-400 mt-4">{error}</p>}
        <p className="mt-6 text-white/70">
          Don’t have an account?{' '}
          <Link href="/register" className="text-pink-400 hover:text-pink-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
