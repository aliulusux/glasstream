// components/ShimmerGrid.jsx
"use client";

export default function ShimmerGrid({ count = 12 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative h-72 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-md overflow-hidden animate-pulse"
        >
          {/* Simulate cover image */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 rounded-3xl" />

          {/* Title shimmer */}
          <div className="absolute bottom-4 left-4 right-4 h-5 bg-white/10 rounded-md" />

          {/* Subtext shimmer */}
          <div className="absolute bottom-2 left-4 w-1/3 h-3 bg-white/10 rounded-md" />
        </div>
      ))}
    </div>
  );
}
