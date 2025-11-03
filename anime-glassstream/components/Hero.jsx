"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero({ slides=[] }) {
  const [i,setI] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=>setI(v => (v+1) % slides.length), 4500);
    return ()=>clearInterval(id);
  }, [slides.length]);
  const s = slides[i] || {};
  return (
    <div className="relative h-[52vh] sm:h-[60vh] md:h-[68vh] rounded-3xl overflow-hidden mb-10 glass-soft">
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{opacity:0, scale:1.02}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.98}} transition={{duration:.6}} className="absolute inset-0">
          {s?.images?.jpg?.large_image_url && (
            <Image src={s.images.jpg.large_image_url} alt={s.title} fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 p-8 md:p-12 flex items-end">
        <div className="max-w-2xl glass rounded-2xl p-6">
          <div className="text-sm opacity-80">Featured <span className="badge ml-2">Season 1</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{s.title || "Anime"}</h1>
          <p className="mt-3 text-white/80 line-clamp-3">{s?.synopsis || "Discover your next favorite anime."}</p>
          <div className="mt-5 flex gap-3">
            <a href={`/anime/${s.mal_id}`} className="glass px-4 py-2 rounded-xl hover:bg-primary/30">Watch Now</a>
            <button className="glass px-4 py-2 rounded-xl hover:bg-white/20">+ My List</button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_,idx)=>(
          <span key={idx} className={`h-1.5 w-8 rounded-full ${idx===i?'bg-white':'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}
