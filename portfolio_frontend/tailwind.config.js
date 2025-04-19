/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Targets all JS/JSX/TS/TSX files in src/
    "./public/index.html"          // Optional: Include HTML file if needed
  ],
  theme: {
    extend: {}, // Extend default Tailwind styles here
  },
  plugins: [], // Add Tailwind plugins if needed (e.g., forms, typography)
}
