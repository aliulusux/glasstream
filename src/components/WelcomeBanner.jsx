import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeBanner({ user }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) {
      // show for 3 seconds whenever new user logs in
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-banner"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-6 py-2 rounded-2xl shadow-glow">
            <span className="text-glassPink font-semibold">
              Welcome back,{" "}
            </span>
            {user.user_metadata?.name || user.email || "User"}!
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
