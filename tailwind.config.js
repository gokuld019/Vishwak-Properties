/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      tab: '1000px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FDB913',
          600: '#E5A60F',
          700: '#CC920D',
          800: '#B27E0B',
          900: '#996A09',
        },
        secondary: {
          50: '#F5F5F5',
          100: '#E9E9E9',
          200: '#D3D3D3',
          300: '#BDBDBD',
          400: '#A7A7A7',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
      },
      translate: {
        'z-[-500px]': '-500px',
        'z-[-200px]': '-200px',
        'z-0': '0',
      },
      scale: {
        '150': '1.5',
        '125': '1.25',
        '100': '1',
      },
      animation: {
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },

  plugins: [],
};


