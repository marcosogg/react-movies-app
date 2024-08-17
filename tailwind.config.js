module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#1E293B',
        accent: '#38BDF8',
        'accent-red': '#E50914',
        'dark-bg': '#141414',
        'text-white': '#FFFFFF',
        'light-gray': '#808080',
        'hover-gray': '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
