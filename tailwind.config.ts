import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta pastel suave para perfil de actor
        cream: {
          50:  '#fdfcf9',
          100: '#faf7f0',
          200: '#f4ede0',
          300: '#ecddd0',
        },
        blush: {
          100: '#f7e8e4',
          200: '#f0d4cd',
          300: '#e5bbb3',
          400: '#d89d93',
        },
        sage: {
          100: '#e8efe8',
          200: '#d1e0d1',
          300: '#b3c9b3',
          400: '#8faa8f',
          500: '#6b8a6b',
        },
        stone: {
          600: '#736b62',
          700: '#5a5249',
          800: '#3d3831',
          900: '#201e1a',
        },
        gold: {
          300: '#e8d5a3',
          400: '#d9c07a',
          500: '#c4a84a',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Work Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fadeIn 0.5s ease both',
        'slide-left': 'slideLeft 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity:'0', transform:'translateY(24px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        fadeIn:    { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
        slideLeft: { '0%': { opacity:'0', transform:'translateX(24px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
};

export default config;
