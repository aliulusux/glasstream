'use client';
import { useThemeX } from './ThemeProvider';

export default function ThemeMenu(){
  const { theme, setTheme, preset, setPreset, PRESETS } = useThemeX();
  return (
    <div className="flex gap-2 items-center">
      <button onClick={()=>setTheme(theme==='dark'?'light':'dark')}
        className="px-3 py-1 rounded-xl bg-white/10 text-white border border-white/15">
        {theme==='dark'?'🌞 Light':'🌙 Dark'}
      </button>
      <select
        value={preset}
        onChange={(e)=>setPreset(e.target.value)}
        className="rounded-xl bg-white/10 text-white border border-white/15 px-2 py-1"
      >
        {Object.keys(PRESETS).map(k=><option key={k} value={k}>{k}</option>)}
      </select>
    </div>
  );
}
