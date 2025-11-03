"use client";
import { motion, AnimatePresence } from "framer-motion";
export default function PlayerModal({ open, onClose, src }){
  return (<AnimatePresence>{open&&(
    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}} className="glass rounded-2xl overflow-hidden w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1">✕</button>
        <video src={src} controls autoPlay className="w-full h-[60vh] bg-black"></video>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>);
}
