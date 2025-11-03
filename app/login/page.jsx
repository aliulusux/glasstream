'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
export default function Login(){
  const [email,setEmail] = useState(''); const [password,setPassword] = useState(''); const [err,setErr] = useState(''); const router = useRouter();
  async function onSubmit(e){ e.preventDefault(); setErr(''); const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) setErr(error.message); else router.push('/mylist'); }
  return (<div className="pt-6 max-w-md mx-auto"><form onSubmit={onSubmit} className="glass rounded-2xl p-6 space-y-3"><h1 className="text-2xl font-bold">Giriş Yap</h1>{err&&<div className="text-red-300 text-sm">{err}</div>}<input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2" /><input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Şifre" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2" /><button className="glass px-4 py-2 rounded-xl hover:bg-white/20">Giriş</button></form></div>);}
