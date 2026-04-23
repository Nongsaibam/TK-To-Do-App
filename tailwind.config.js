/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#ff6b6b',
        coralDark: '#f4511e',
        panel: '#eef1f7',
        textMain: '#22252b',
        muted: '#8b8d97',
        slateInk: '#1f2937',
        sand: '#f8f4ec',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '20px',
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, rgba(244,81,30,0.12), rgba(255,255,255,0.95))',
      },
    },
  },
  plugins: [],
};
