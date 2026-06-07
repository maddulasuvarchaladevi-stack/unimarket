/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Elegant Indigo
          hover: '#4338CA',
          light: '#EEF2FF',
        },
        secondary: {
          DEFAULT: '#60A5FA', // Soft Blue
          hover: '#3B82F6',
          light: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#14B8A6', // Teal
          hover: '#0D9488',
          light: '#F0FDFA',
        },
        background: '#F8FAFC', // Sleek background color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 10px 30px -10px rgba(79, 70, 229, 0.1)',
        card: '0 4px 20px -2px rgba(148, 163, 184, 0.12), 0 2px 8px -1px rgba(148, 163, 184, 0.08)',
        hover: '0 20px 40px -15px rgba(79, 70, 229, 0.18)',
      },
    },
  },
  plugins: [],
}
