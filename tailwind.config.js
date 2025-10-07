/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lttechno: ['"LT Techno"', 'sans-serif'],
        overfield: ['"Overfield"', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
        textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        lg: '2px 2px 4px rgba(0, 0, 0, 0.4)',
        xl: '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      colors: {
      neon: '#39FF14',
    },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}

