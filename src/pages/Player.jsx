import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { saveWatchProgress } from "../lib/watchHistory";
import { supabase } from "../lib/supabaseClient";

export default function Player() {
  const { mal_id } = useParams();
  const [searchParams] = useSearchParams();
  const episode = Number(searchParams.get("ep")) || 1;

  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [anime, setAnime] = useState(null);

  // Fetch anime info from Jikan
  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
        const json = await res.json();
        setAnime(json?.data || null);
      } catch (err) {
        console.error("Anime fetch failed:", err);
      }
    }
    fetchAnime();
  }, [mal_id]);

  // Resume progress from Supabase
  useEffect(() => {
    async function getProgress() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("watch_history")
        .select("progress")
        .eq("user_id", session.user.id)
        .eq("mal_id", mal_id)
        .eq("episode", episode)
        .maybeSingle();

      if (data && data.progress && videoRef.current) {
        const video = videoRef.current;
        video.addEventListener("loadedmetadata", () => {
          video.currentTime = (data.progress / 100) * video.duration;
        });
      }
    }

    getProgress();
  }, [mal_id, episode]);

  // Save progress periodically
  const handleTimeUpdate = (e) => {
    const video = e.target;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress > 0) {
        saveWatchProgress({ mal_id: Number(mal_id), episode, progress });
      }
    }, 15000); // every 15 seconds
    return () => clearInterval(interval);
  }, [mal_id, episode, progress]);

  return (
    <main className="min-h-screen bg-glassDark text-white p-6">
      <div className="max-w-5xl mx-auto">
        {anime && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {anime.title} <span className="text-glassPink">Ep {episode}</span>
            </h1>
            <p className="text-white/70 text-sm">{anime.title_japanese}</p>
          </div>
        )}

        <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-glow backdrop-blur-md">
          <video
            ref={videoRef}
            src={`https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4`} 
            controls
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-auto rounded-2xl"
          />
        </div>

        <div className="mt-3 text-sm text-white/70">
          Progress: {progress.toFixed(1)}%
        </div>
      </div>
    </main>
  );
}
