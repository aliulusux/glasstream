/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#a855f7",
          100: "#f3e8ff"
        },
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,.25)",
      },
      backdropBlur: {
        xs: "2px"
      }
    },
  },
  plugins: [],
}
