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
        primary: {
          1: '#94b9e5',
          2: '#5b95d5',
          3: '#3576c0',
          4: '#255da4',
          5: '#1f4a85',
          t10: '#3576c01a',
          t20: '#3576c033',
          t30: '#3576c04d',
        },
        background: {
          1: '#020306',
          2: '#04060a',
          3: '#060a0f',
          4: '#0a0e14',
          5: '#0f141c',
          t80: '#060a0fcc',
        },
        foreground: {
          main: '#ffffff',
          secondary: '#b1becb',
          terciary: '#738292',
          negatif: '#0f141c',
        },
        'text-icon': {
          negatif: '#ffffff',
        },
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        // Title styles (Geist)
        'title-1': ['82px', { lineHeight: '86px', fontWeight: '700' }],
        'title-2': ['48px', { lineHeight: '48px', fontWeight: '700' }],
        'title-3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        // Text styles (Geist)
        'text-l': ['18px', { lineHeight: '100%' }],
        'text-m': ['16px', { lineHeight: '100%' }],
        'text-s': ['14px', { lineHeight: '100%' }],
        'text-xs': ['12px', { lineHeight: '100%' }],
        // Body styles (Inter)
        'body-regular': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        // Legend styles (Inter)
        'legend-m': ['11px', { lineHeight: '100%', fontWeight: '600' }],
        'legend-s': ['10px', { lineHeight: '100%', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};
export default config;
