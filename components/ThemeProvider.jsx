'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeCtx = createContext({ theme:'dark', setTheme:()=>{}, preset:'amethyst', setPreset:()=>{} });

const PRESETS = {
  sunset: { from:'#381a25', via:'#3d1835', to:'#191125' },
  amethyst: { from:'#120022', via:'#180033', to:'#100022' },
  iced: { from:'#0d2233', via:'#133a4e', to:'#0b2333' },
  neon: { from:'#041d14', via:'#0a2b1e', to:'#041d14' }
};

export function useThemeX(){ return useContext(ThemeCtx); }

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [preset, setPreset] = useState('amethyst');

  useEffect(()=>{
    const t = localStorage.getItem('theme') || 'dark';
    const p = localStorage.getItem('preset') || 'amethyst';
    setTheme(t); setPreset(p);
    document.documentElement.classList.toggle('dark', t==='dark');
  }, []);
  useEffect(()=>{
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme==='dark');
  }, [theme]);
  useEffect(()=>localStorage.setItem('preset', preset), [preset]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, preset, setPreset, PRESETS }}>
      {children}
    </ThemeCtx.Provider>
  );
}
