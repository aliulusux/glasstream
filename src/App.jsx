import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧱 Components
import Header from "./components/Header";

// 🗂️ Pages
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Popular from "./pages/Popular";
import New from "./pages/New";
import MyList from "./pages/MyList";
import Player from "./pages/Player";
import AnimeDetail from "./pages/AnimeDetail";

export default function App() {
  return (
    <Router>
      {/* Global Header (always visible) */}
      <Header />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/new" element={<New />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/anime/:mal_id" element={<AnimeDetail />} />
        <Route path="/anime/:mal_id" element={<Player />} />
      </Routes>
    </Router>
  );
}
