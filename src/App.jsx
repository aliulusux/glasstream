import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧱 Components
import Header from "./components/Header";

// 🗂️ Pages
import AuthCallback from "./pages/AuthCallback";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Popular from "./pages/Popular";
import New from "./pages/New";
import MyList from "./pages/MyList";
import Player from "./pages/Player";
import AnimeDetail from "./pages/AnimeDetail";
import WatchPage from "./pages/WatchPage";
import TestEnv from "./TestEnv";

export default function App() {
  return (
    
    <Router>
      {/* Global Header (always visible) */}
      <Header />

      {/* Page Routes */}
      <Routes>
        <TestEnv />
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/new" element={<New />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/anime/:mal_id" element={<AnimeDetail />} />
        <Route path="/anime/:mal_id" element={<Player />} />
        <Route path="/watch/:aid/:ep" element={<WatchPage />} />
      </Routes>
    </Router>
  );
}
