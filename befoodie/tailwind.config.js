/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#c92a2a",
        primaryBG: "#faeaea",
        secondary: "#444",
      },
      fontFamily: {
        heroHeading: ["Playfair Display", "sans-serif"],
        primary: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
