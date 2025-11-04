/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        glassDark: "#0b0b15",
        glassPink: "#ff4dd8",
      },
      boxShadow: {
        glow: "0 0 18px rgba(255,77,216,0.45)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
