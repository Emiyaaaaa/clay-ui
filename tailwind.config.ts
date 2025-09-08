import type { Config } from 'tailwindcss'

export default {
  content: [
    './packages/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f2f3f7',
          dark: '#e6e8ef',
        },
        primary: {
          50: '#eef5ff',
          100: '#d9e8ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      boxShadow: {
        neu: '10px 10px 20px #d1d5e0, -10px -10px 20px #ffffff',
        neuInset: 'inset 8px 8px 16px #d1d5e0, inset -8px -8px 16px #ffffff',
      },
      borderRadius: {
        xl: '0.9rem',
      },
    },
  },
  darkMode: 'class',
} satisfies Config


