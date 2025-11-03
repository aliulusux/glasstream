"use client";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthProvider";
export default function AuthButtons(){
  const { user } = useAuth();
  async function signInGoogle(){ await supabase.auth.signInWithOAuth({ provider: "google" }); }
  async function signOut(){ await supabase.auth.signOut(); }
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm opacity-80">Merhaba, {user.email || user.id.slice(0,6)}</span>
        <a href="/mylist" className="glass px-3 py-1 rounded-xl hover:bg-white/20">Benim Listem</a>
        <button onClick={signOut} className="glass px-3 py-1 rounded-xl hover:bg-white/20">Çıkış</button>
      </div>
    );
  }
  return <button onClick={signInGoogle} className="glass px-3 py-1 rounded-xl hover:bg-white/20">Google ile Giriş</button>;
}
