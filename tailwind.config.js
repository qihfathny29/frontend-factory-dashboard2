// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        "colors-accents-red": "var(--colors-accents-red)",
        "greysblue-grey100": "var(--greysblue-grey100)",
        "greysblue-grey700": "var(--greysblue-grey700)",
      },
    },
  },
  plugins: [],
};
