// src/pages/WatchPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WatchPage() {
  const { aid, ep } = useParams();
  const navigate = useNavigate();

  const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4"; // demo video

  return (
    <div className="min-h-screen bg-[rgba(10,10,15,0.8)] backdrop-blur-2xl flex flex-col items-center py-12">
      <h1 className="text-2xl font-semibold text-pink-400 mb-6">
        Watching Episode {ep}
      </h1>

      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,105,180,0.3)]">
        <video
          src={sampleVideo}
          controls
          autoPlay
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-pink-200 transition"
        >
          ← Back
        </button>
      </div>

      <p className="mt-4 text-pink-200/70 text-sm">
        Anime ID: {aid} • Episode {ep}
      </p>
    </div>
  );
}
