/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['Minecraft', 'VT323', 'monospace'],
      },
      colors: {
        'neon-blue': '#00f7ff',
        'neon-pink': '#ff00ea',
        'deep-blue': '#000428',
        'light-blue': '#004e92',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 10px #00f7ff, 0 0 20px #00f7ff, 0 0 30px #00f7ff',
          },
          'to': {
            textShadow: '0 0 20px #00f7ff, 0 0 30px #00f7ff, 0 0 40px #00f7ff',
          },
        },
      },
    },
  },
  plugins: [],
}
