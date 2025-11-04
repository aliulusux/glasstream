/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0F0A1F",
        panel: "#19122B",
        accent: "#FF4FB0",
        glow: "#9b59ff"
      },
      boxShadow: {
        glass: "0 8px 40px rgba(255, 79, 176, 0.15)"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
