import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", "?"));
    const token = params.get("access_token");

    if (token) {
      // Store token locally (optional)
      localStorage.setItem("google_token", token);
      console.log("Google token:", token);

      // Redirect to homepage (or dashboard)
      navigate("/");
    } else {
      console.error("No token found in callback URL");
      navigate("/login"); // fallback
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Signing you in...</h2>
        <p className="text-sm opacity-75 mt-2">
          Please wait while we finish your Google login.
        </p>
      </div>
    </div>
  );
}
