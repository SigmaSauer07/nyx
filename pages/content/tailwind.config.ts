import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true, // Use !important for all utilities to ensure they override Shadow DOM styles
  corePlugins: {
    preflight: true, // Enable Tailwind's base styles reset
  },
  theme: {
    extend: {
      colors: {
        'alsania-primary': '#39FF14',
        'alsania-secondary': '#0A2472',
        'alsania-black': '#0A0A0A',
        'alsania-charcoal': '#1A1A1A',
        'alsania-silver': '#B3B3B3',
        'alsania-cyan': '#00F6FF',
        'alsania-violet': '#2A004F',
        'alsania-magenta': '#FF2E92',
        'alsania-orange': '#FF5A36',
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  // plugins: [
  //   // Custom plugin to add Shadow DOM specific utilities
  //   function({ addBase, theme }) {
  //     addBase({
  //       // Target the shadow host and its contents
  //       ':host': {
  //         all: 'initial', // Reset all inherited styles
  //         display: 'block', // Make the shadow host a block element
  //       },
  //       // Add base styling for common elements within the Shadow DOM
  //       'h1, h2, h3, h4, h5, h6, p, span, div, button, input, select, textarea': {
  //         fontFamily: 'inherit',
  //         fontSize: 'inherit',
  //         color: 'inherit',
  //       },
  //     });
  //   },
  // ],
} satisfies Config;
