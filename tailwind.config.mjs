/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode palette
        cream: {
          50: '#FFFDFB',
          100: '#FFFBF5',
          200: '#FFF7ED',
          300: '#FFF0DE',
          400: '#FFE8CC',
          500: '#FFDDB3',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1A1A1A',
          950: '#0d0d0d',
        },
        terracotta: {
          50: '#fdf6f3',
          100: '#fbeae4',
          200: '#f8d9cd',
          300: '#f2bfaa',
          400: '#e99a79',
          500: '#C45D3A',
          600: '#b84d2d',
          700: '#9a3d23',
          800: '#7f3521',
          900: '#6a2f20',
        },
        forest: {
          50: '#f4f7f4',
          100: '#e4ebe4',
          200: '#c9d7c9',
          300: '#a3b899',
          400: '#8B9D83',
          500: '#5c7a52',
          600: '#476240',
          700: '#3a4e35',
          800: '#31412e',
          900: '#0F1A14',
          950: '#0a100c',
        },
        amber: {
          50: '#fdfbf3',
          100: '#faf5e1',
          200: '#f4e9c3',
          300: '#ebd69c',
          400: '#D4A857',
          500: '#c9923a',
          600: '#b37830',
          700: '#955c2a',
          800: '#7a4b28',
          900: '#653f25',
        },
      },
      fontFamily: {
        display: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['12rem', { lineHeight: '0.85' }],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'blur-in': 'blurIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
      },
    },
  },
  plugins: [],
};
