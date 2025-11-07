import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AuthModal from "./AuthModal";

export default function AuthSwitch({ children }) {
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session && !showAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">You need to login</h1>
        <button
          onClick={() => setShowAuth(true)}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-all font-semibold"
        >
          Login / Register
        </button>
      </div>
    );
  }

  return (
    <>
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onAuth={setSession} />
      )}
      {session && children}
    </>
  );
}
