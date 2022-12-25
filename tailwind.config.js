/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        full: "0 0 500px 2000px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
