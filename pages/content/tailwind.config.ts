import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true, // Use !important for all utilities to ensure they override Shadow DOM styles
  corePlugins: {
    preflight: true, // Enable Tailwind's base styles reset
  },
  theme: {
    extend: {
      // Alsania Brand Colors
      colors: {
        'alsania': {
          primary: '#39FF14', // Neon Green
          secondary: '#0A2472', // Midnight Navy
          'navy-dark': '#061747', // Darker Navy
          'navy-light': '#1E3A8A', // Lighter Navy
          'green-dark': '#2EBF0F', // Darker Green
          'green-light': '#72FF5D', // Lighter Green
          cyan: '#00F6FF', // Electric Cyan
          violet: '#2A004F', // Deep Violet
          magenta: '#FF2E92', // Magenta Burst
          orange: '#FF5A36', // Sunset Orange
          black: '#0A0A0A', // Jet Black
          'charcoal': '#1A1A1A', // Charcoal Gray
          'silver': '#B3B3B3', // Silver Mist
          white: '#FFFFFF', // Pure White
        },
      },
      // Alsania Typography
      fontFamily: {
        'alsania-heading': ['Orbitron', 'Courier New', 'monospace'],
        'alsania-accent': ['Rajdhani', 'Arial', 'sans-serif'],
        'alsania-body': ['Open Sans', 'Arial', 'sans-serif'],
        'alsania-mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      // Custom animations for Alsania brand
      animation: {
        'alsania-glow': 'alsania-glow 2s ease-in-out infinite',
        'alsania-pulse': 'alsania-pulse 1.5s ease-in-out infinite',
        'alsania-bounce': 'alsania-bounce 0.6s ease-out',
      },
      keyframes: {
        'alsania-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14',
            textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14'
          },
          '50%': { 
            boxShadow: '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14',
            textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14'
          },
        },
        'alsania-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'alsania-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
} satisfies Config;
