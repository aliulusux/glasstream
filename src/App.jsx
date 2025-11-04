import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Popular from "./pages/Popular";
import New from "./pages/New";
import MyList from "./pages/MyList";
import Player from "./pages/Player";

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    console.log("Current session:", data.session);
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    console.log("Auth changed:", session);
  });
}, []);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-glassDark to-[#0b0b19]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:mal_id" element={<Player />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/new" element={<New />} />
        <Route path="/mylist" element={<MyList />} />
      </Routes>
    </div>
  );
}
