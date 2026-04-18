/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#7c9362",
        accentDeep: "#687b52",
        gold: "#d6b483",
        sand: "#f5efe8",
        clay: "#dbc7b4",
        ink: "#0f0f11",
        smoke: "#f4f4f5",
        slate: "#5f5b57",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      boxShadow: {
        soft: "0 30px 80px -35px rgba(15, 15, 17, 0.28)",
        card: "0 25px 60px -35px rgba(15, 15, 17, 0.22)",
        line: "0 0 0 1px rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
