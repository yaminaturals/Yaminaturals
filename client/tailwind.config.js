/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c2dfce',
          300: '#94c6a9',
          400: '#5fa77f',
          500: '#38885c',
          600: '#276c46',
          700: '#1d5537',
          800: '#15422b',
          900: '#072115',
          950: '#04130c',
        },
        ivory: {
          50: '#fffefc',
          100: '#fdfbf7',
          200: '#f8f4ec',
          300: '#f0eade',
          400: '#e5dcce',
          500: '#d1c4b0',
          600: '#b0a08a',
        },
        champagne: {
          50: '#faf7f0',
          100: '#f4ede0',
          200: '#e8dbbe',
          300: '#d9c497',
          400: '#c5a059',
          500: '#a6823c',
          600: '#85642b',
          700: '#674a1e',
        },
        charcoal: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0e14',
        }
      },
      fontSize: {
        'tiny': '0.6875rem',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'tracked': '0.18em',
      },
      borderWidth: {
        '1': '1px',
      }
    },
  },
  plugins: [],
}
