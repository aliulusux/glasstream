import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 disabled:opacity-50"
      >
        <ChevronLeft size={20} /> Prev
      </button>
      <span className="text-white/80">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 disabled:opacity-50"
      >
        Next <ChevronRight size={20} />
      </button>
    </div>
  );
}
