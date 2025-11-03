"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import AuthButtons from "./AuthButtons";
const nav=[{href:"/",label:"Home"},{href:"/browse",label:"Browse"},{href:"/popular",label:"Popular"},{href:"/new",label:"New"}];
export default function Header(){
  const [open,setOpen]=useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
        <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tight"><span className="text-primary">Anime</span>Stream</Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map(n=>(<Link key={n.href} className="hover:text-primary transition-colors" href={n.href}>{n.label}</Link>))}
          </nav>
          <div className="hidden md:block"><AuthButtons /></div>
          <button className="md:hidden" onClick={()=>setOpen(v=>!v)} aria-label="menu">☰</button>
        </div>
      </div>
      {open&&(
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="glass rounded-2xl mt-2 p-4 flex flex-col gap-3">
            {nav.map(n=>(<Link key={n.href} className="p-2 rounded-lg hover:bg-white/10" href={n.href}>{n.label}</Link>))}
            <AuthButtons />
          </div>
        </motion.div>
      )}
    </header>
  );
}
