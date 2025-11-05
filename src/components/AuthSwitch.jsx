import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

export default function AuthSwitch() {
  const [mode, setMode] = useState("login");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleMode = () => setMode((prev) => (prev === "login" ? "register" : "login"));
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 🧠 Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Switch */}
      <div className="flex items-center bg-white/10 rounded-full px-1 py-1 text-sm backdrop-blur-md border border-white/10 shadow-glow">
        {["login", "register"].map((item) => (
          <motion.button
            key={item}
            onClick={() => {
              setMode(item);
              openModal();
            }}
            className={`px-3 py-1 rounded-full transition font-medium ${
              mode === item
                ? "bg-glassPink text-white shadow-[0_0_10px_rgba(255,0,128,0.8)]"
                : "text-white/80 hover:text-white"
            }`}
          >
            {item === "login" ? "Login" : "Register"}
          </motion.button>
        ))}
      </div>

      {/* Modal directly below switch */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-4 w-72 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg shadow-pink-500/20 p-4 z-50"
          >
            <AuthModal isOpen={isOpen} onClose={closeModal} mode={mode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
