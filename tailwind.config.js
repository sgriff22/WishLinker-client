/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: "#c15b75",
        pink: "#e2a5b2",
        lightRose: "#e19fae",
      },
    },
  },
  plugins: [],
};
