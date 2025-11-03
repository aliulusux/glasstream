'use client';
import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import FloatingPlayer from '@/components/FloatingPlayer';
import { upsertHistory } from '@/lib/watch';
import GlowCard from '@/components/GlowCard';
import Link from 'next/link';

export default function WatchPage({ params }) {
  const { id } = params;
  const [mini, setMini] = useState(false);
  const user = useUser();

  // For now, use any sample URL — replace with your real episode source
  const src = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;

  const progress = async (pos) => {
    if (user)
      await upsertHistory({
        userId: user.id,
        animeId: Number(id),
        episode: 1,
        positionSeconds: pos,
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <GlowCard className="p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Now Watching Episode 1</h2>
        <Link
          href={`/anime/${id}`}
          className="px-4 py-1 rounded-lg bg-white/10 text-white border border-white/15 hover:bg-white/20"
        >
          ← Back to Details
        </Link>
      </GlowCard>

      {!mini && (
        <div className="relative rounded-2xl overflow-hidden">
          <video
            src={src}
            controls
            className="w-full aspect-video bg-black"
            onTimeUpdate={(e) =>
              progress(Math.floor(e.currentTarget.currentTime))
            }
          />
          <button
            onClick={() => setMini(true)}
            className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-white/10 text-white border border-white/15 hover:bg-white/20"
          >
            Mini
          </button>
        </div>
      )}

      {mini && (
        <FloatingPlayer
          src={src}
          title={`Episode 1`}
          onProgress={progress}
          onClose={() => setMini(false)}
        />
      )}
    </div>
  );
}
