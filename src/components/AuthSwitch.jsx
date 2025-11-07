// src/components/AuthSwitch.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AuthModal from "./AuthModal";

export default function AuthSwitch({ children }) {
  const [session, setSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      {session ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
          <h2 className="text-2xl font-semibold mb-6">
            Giriş yapmanız gerekiyor 🔒
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-500 px-6 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Giriş Yap
          </button>

          {showModal && <AuthModal onClose={() => setShowModal(false)} />}
        </div>
      )}
    </>
  );
}
