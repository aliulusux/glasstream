import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Example redirect: http://localhost:3000/#access_token=XXXX
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("access_token", token);
      navigate("/"); // redirect to homepage
    } else {
      navigate("/login"); // fallback
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-white">
      <div className="animate-pulse text-center">
        <p className="text-2xl font-semibold">Signing you in...</p>
        <p className="text-pink-400 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}
