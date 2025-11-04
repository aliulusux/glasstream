export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-10 items-start animate-pulse">
        {/* --- Left cover placeholder --- */}
        <div className="w-full md:w-80 h-[480px] bg-white/10 rounded-3xl border border-white/10 shadow-lg" />

        {/* --- Right info block --- */}
        <div className="flex-1 space-y-5">
          <div className="h-10 w-3/5 bg-white/10 rounded-xl" />
          <div className="h-4 w-full bg-white/5 rounded-md" />
          <div className="h-4 w-11/12 bg-white/5 rounded-md" />
          <div className="h-4 w-10/12 bg-white/5 rounded-md" />

          {/* --- Info boxes --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 bg-white/10 rounded-lg border border-white/10"
              />
            ))}
          </div>

          {/* --- Button shimmer --- */}
          <div className="flex gap-3 pt-6">
            <div className="w-32 h-10 bg-white/10 rounded-xl" />
            <div className="w-40 h-10 bg-pink-500/30 rounded-xl" />
          </div>
        </div>
      </div>

      {/* --- Trailer shimmer --- */}
      <div className="mt-12">
        <div className="h-6 w-40 bg-white/10 rounded-lg mb-4" />
        <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 shadow-lg" />
      </div>
    </div>
  );
}