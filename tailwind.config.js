/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4 content patterns
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          card: '#1A1A28',
          elevated: '#202030',
        },
        // Borders
        border: {
          DEFAULT: '#2A2A3E',
          subtle: '#1E1E30',
          strong: '#3A3A56',
        },
        // Accents
        purple: {
          DEFAULT: '#7C3AED',
          light: '#9D5FF5',
          dark: '#5B21B6',
        },
        blue: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
        // Semantic
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        // Text
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          tertiary: '#6B7280',
          disabled: '#4B5563',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
};
