// /components/AuthProvider.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Ctx = createContext({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      setUser(data?.user ?? null);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  return <Ctx.Provider value={{ user }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
