/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Grounds and lines
        sand: {
          50: '#FBF7F0', // page ground
          100: '#F6EFE4', // light text on dark, light cards on dark
          200: '#F2EADD', // alternate section ground
          300: '#E3D9CA', // hairlines
          400: '#CFC6B6',
          500: '#BFB6A6',
        },
        // Text
        ink: {
          DEFAULT: '#1C1A17',
          700: '#4A443D',
          600: '#5B544C',
          400: '#8F8676',
        },
        // Accent (terracotta, tuned for 4.5:1 on both grounds)
        clay: {
          DEFAULT: '#A64A29',
          dark: '#8E3F22',
          light: '#E99A79',
        },
        // Dark bands
        pine: {
          DEFAULT: '#15231B',
          deep: '#0E1712',
          muted: '#C9C0B0',
        },
        // Accent on dark
        gold: {
          DEFAULT: '#D9B26A',
          soft: '#F3D9A8',
        },
      },
      fontFamily: {
        display: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1360px',
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      borderRadius: {
        card: '4px',
      },
    },
  },
  plugins: [],
};
