import { useState } from "react";
import AuthModal from "./AuthModal";

export default function AuthSwitch() {
  const [mode, setMode] = useState("login");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMode = (newMode) => {
    setMode(newMode);
    setIsOpen(true); // show modal when clicked
  };

  return (
    <div className="relative">
      {/* Switch Buttons */}
      <div className="flex bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => toggleMode("login")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            mode === "login"
              ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-[0_0_10px_2px_rgba(236,72,153,0.6)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => toggleMode("register")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            mode === "register"
              ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-[0_0_10px_2px_rgba(236,72,153,0.6)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Register
        </button>
      </div>

      {/* Auth Modal */}
      {isOpen && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50">
          <AuthModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            mode={mode}
          />
        </div>
      )}
    </div>
  );
}
