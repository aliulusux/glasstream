import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

// 🔹 Components
import Header from "./components/Header";

// 🔹 Pages
import AuthCallback from "./pages/AuthCallback";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Popular from "./pages/Popular";
import New from "./pages/New";
import MyList from "./pages/MyList";
import Player from "./pages/Player";
import AnimeDetail from "./pages/AnimeDetail";
import WatchPage from "./pages/WatchPage";

export default function App() {
  useEffect(() => {
    // Ensure supabase is ready
    if (!supabase) {
      console.error("❌ Supabase client not initialized!");
      return;
    }

    // 🔸 Listen for login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth event:", _event, session);
        // Force reload UI on login/logout to update header etc.
        if (session) window.location.reload();
      }
    );

    return () => {
      // Clean up safely
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <Router>
      {/* 🔹 Global header visible on all pages */}
      <Header />

      {/* 🔹 Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/new" element={<New />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/anime/:mal_id" element={<AnimeDetail />} />
        <Route path="/anime/:mal_id/:ep" element={<Player />} />
        <Route path="/watch/:id/:ep" element={<WatchPage />} />
      </Routes>
    </Router>
  );
}
