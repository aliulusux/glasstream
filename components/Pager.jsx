"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pager({ page = 1, hasNext = false, base = "" }) {
  const router = useRouter();
  const params = useSearchParams();

  const setPage = (p) => {
    const q = new URLSearchParams(params.toString());
    q.set("page", String(p));
    router.push(`${base}?${q.toString()}`);
  };

  return (
    <div className="mt-8 flex items-center gap-3">
      <button
        className="btn disabled:opacity-50"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-sm">
        Page {page}
      </span>
      <button
        className="btn disabled:opacity-50"
        disabled={!hasNext}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
