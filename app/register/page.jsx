'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    setMessage(error ? error.message : '✅ Check your inbox to confirm your account!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a102c] via-[#261245] to-[#0f0618]">
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-white mb-6">Create an Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
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
            disabled={loading}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            {loading ? 'Registering…' : 'Sign Up'}
          </button>
        </form>
        {message && <p className="text-sm text-pink-400 mt-4">{message}</p>}
        <p className="mt-6 text-white/70">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-400 hover:text-pink-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
