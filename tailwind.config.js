/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { primary: { DEFAULT: "#a855f7", 100: "#f3e8ff" } },
      boxShadow: { glass: "0 10px 30px rgba(0,0,0,.25)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        glow: { "0%,100%": { boxShadow: "0 0 0px rgba(168,85,247,0.0)" }, "50%": { boxShadow: "0 0 28px rgba(168,85,247,0.55)" } }
      },
      animation: { marquee: "marquee 30s linear infinite", slowglow: "glow 4s ease-in-out infinite" }
    }
  },
  plugins: []
}
