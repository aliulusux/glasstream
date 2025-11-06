import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", "?"));
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("google_token", token);
      console.log("Google token:", token);

      // ✅ Fetch user info from Google API
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log("Google user:", user);
          localStorage.setItem("google_user", JSON.stringify(user));
          navigate("/"); // redirect home
        })
        .catch((err) => {
          console.error("User fetch failed:", err);
          navigate("/");
        });
    } else {
      navigate("/login");
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
