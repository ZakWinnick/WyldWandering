/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens: values live in global.css as CSS variables and flip
        // with the visitor's system color scheme (prefers-color-scheme).
        sand: {
          50: 'rgb(var(--c-sand-50) / <alpha-value>)', // page ground
          100: 'rgb(var(--c-sand-100) / <alpha-value>)', // raised cards
          200: 'rgb(var(--c-sand-200) / <alpha-value>)', // alternate section ground
          300: 'rgb(var(--c-sand-300) / <alpha-value>)', // hairlines
          400: 'rgb(var(--c-sand-400) / <alpha-value>)', // input borders
          500: 'rgb(var(--c-sand-500) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
          600: 'rgb(var(--c-ink-600) / <alpha-value>)',
          400: 'rgb(var(--c-ink-400) / <alpha-value>)',
        },
        clay: {
          DEFAULT: 'rgb(var(--c-clay) / <alpha-value>)',
          dark: 'rgb(var(--c-clay-dark) / <alpha-value>)',
          light: '#E99A79',
        },
        // Fixed tokens: same in both schemes. Used on photos and dark bands.
        cream: {
          50: '#FBF7F0',
          100: '#F6EFE4',
          500: '#BFB6A6',
        },
        night: '#1C1A17', // dark text on light fills that must not flip
        pine: {
          DEFAULT: '#15231B',
          deep: '#0E1712',
          muted: '#C9C0B0',
        },
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
