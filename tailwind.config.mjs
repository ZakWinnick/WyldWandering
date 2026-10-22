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
        // Brand kit terracotta (#C45D3A) is 4.1:1 on ivory, short of AA for small
        // text, so text and button fills use a slightly deeper terracotta.
        clay: {
          DEFAULT: 'rgb(var(--c-clay) / <alpha-value>)',
          dark: 'rgb(var(--c-clay-dark) / <alpha-value>)',
        },
        // Brand kit v1 values, exact. For artwork, rules and large display only.
        brand: {
          forest: '#0F1A14',
          ivory: '#FFFBF5',
          terracotta: '#C45D3A',
          amber: '#D4A857',
        },
        // Fixed tokens: same in both schemes. Used on photos and dark bands.
        cream: {
          50: '#FFFBF5', // brand ivory
          100: '#F8F2E8',
          500: '#BFB6A6',
        },
        night: '#0F1A14', // brand forest; dark text on light fills that must not flip
        // Dark bands. Forest in light mode; lifts slightly in dark mode so bands
        // still stand off the forest page ground.
        pine: {
          DEFAULT: 'rgb(var(--c-pine) / <alpha-value>)',
          deep: '#0A120E',
          muted: '#C9C2B4',
        },
        gold: {
          DEFAULT: '#D4A857', // brand amber. Not for text on ivory.
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
