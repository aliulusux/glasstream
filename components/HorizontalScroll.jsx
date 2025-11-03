"use client";
import { useRef } from "react";

export default function HorizontalScroll({ children }) {
  const ref = useRef();
  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth pb-2"
      >
        {children}
      </div>
    </div>
  );
}
