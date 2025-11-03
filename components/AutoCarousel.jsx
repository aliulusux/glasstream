'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * AutoCarousel Component
 * - Automatically scrolls anime cards horizontally.
 * - Pauses on hover.
 */
export default function AutoCarousel({ title, animeList = [] }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollAmount = 0;
    const speed = 0.5; // adjust speed
    let paused = false;

    const scroll = () => {
      if (!paused) {
        scrollAmount += speed;
        if (scrollAmount >= el.scrollWidth / 2) scrollAmount = 0;
        el.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scroll);
    };
    scroll();

    el.addEventListener('mouseenter', () => (paused = true));
    el.addEventListener('mouseleave', () => (paused = false));
    return () => {
      el.removeEventListener('mouseenter', () => (paused = true));
      el.removeEventListener('mouseleave', () => (paused = false));
    };
  }, []);

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold text-white mb-3 ml-3">{title}</h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 px-3 py-2"
      >
        {animeList.map((anime) => {
          const cover =
            anime.images?.jpg?.large_image_url ||
            anime.images?.jpg?.image_url ||
            anime.image_url;
          return (
            <motion.div
              key={anime.mal_id || anime.id}
              whileHover={{ scale: 1.05 }}
              className="relative min-w-[180px] max-w-[180px] rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <Link href={`/anime/${anime.mal_id || anime.id}`}>
                <Image
                  src={cover}
                  alt={anime.title}
                  width={180}
                  height={260}
                  className="object-cover w-[180px] h-[260px]"
                />
              </Link>
              <p className="text-center text-sm text-white mt-1 truncate px-2">
                {anime.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
