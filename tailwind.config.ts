import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#988561',
          50: '#f7f6f3',
          100: '#ede9e0',
          200: '#d9d1c1',
          300: '#c2b59d',
          400: '#a8997a',
          500: '#988561',
          600: '#8a744f',
          700: '#735f42',
          800: '#5f4e38',
          900: '#4f4130',
          950: '#2c2318',
        },
        background: '#000000',
        surface: '#1C1C1E',
        'surface-variant': '#2C1C1E',
        'on-surface': '#FFFFFF',
        'on-surface-variant': '#B3B3B3',
        error: '#D50000',
        success: '#2E8B57',
        warning: '#FFA500',
        info: '#2196F3',
        muted: '#6E6E6E',
        border: '#3E3E3E',
        input: '#4C4848',
        card: '#1C1C1E',
        'app-bar': 'rgba(129, 118, 85, 0.17)',
        'bottom-nav': 'rgba(154, 141, 102, 0.17)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};

export default config;
