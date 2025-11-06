import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto mt-10 px-4">
      <div className="glass rounded-2xl p-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold"
        >
          Yeni rutinini keşfet <span className="text-glassPink">Anime</span>
        </motion.h1>
        <p className="text-white/70 mt-3">
          Temiz, düzenli ve anlaşılabilir.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button className="bg-glassPink text-white px-6 py-2 rounded-xl shadow-glow hover:scale-[1.02] transition">
            Şimdi izle
          </button>
          <button className="bg-white/10 text-white px-6 py-2 rounded-xl hover:bg-white/20">
            Keşfet
          </button>
        </div>
      </div>
    </section>
  );
}
