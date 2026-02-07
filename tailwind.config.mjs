/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        calumet: {
          50: '#f1f7f5',
          100: '#dceae6',
          200: '#b7d5cc',
          300: '#84b8a9',
          400: '#5c9c8d',
          500: '#3e7f71',
          600: '#2d6458',
          700: '#245247',
          800: '#1d4239',
          900: '#16332d'
        },
        slatewood: {
          50: '#f7f7f7',
          100: '#e7e9ea',
          200: '#cdd1d4',
          300: '#a3abb0',
          400: '#747f86',
          500: '#5b646a',
          600: '#454d52',
          700: '#343b3f',
          800: '#232a2d',
          900: '#131719'
        }
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif']
      },
      boxShadow: {
        card: '0 24px 60px -40px rgba(14, 24, 22, 0.5)'
      }
    }
  },
  plugins: []
};
