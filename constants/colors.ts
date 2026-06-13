/**
 * FeedFlow Design System — Color Tokens
 * Dark-first theme with purple/blue accent palette
 */

export const Colors = {
  // Backgrounds
  background: {
    primary: '#0A0A0F',
    secondary: '#12121A',
    card: '#1A1A28',
    elevated: '#202030',
  },

  // Borders
  border: {
    default: '#2A2A3E',
    subtle: '#1E1E30',
    strong: '#3A3A56',
  },

  // Accents
  accent: {
    purple: '#7C3AED',
    purpleLight: '#9D5FF5',
    purpleDark: '#5B21B6',
    blue: '#3B82F6',
    blueLight: '#60A5FA',
    blueDark: '#2563EB',
  },

  // Semantic
  success: '#10B981',
  successLight: '#34D399',
  error: '#EF4444',
  errorLight: '#F87171',
  warning: '#F59E0B',
  warningLight: '#FCD34D',
  info: '#06B6D4',

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
    disabled: '#4B5563',
    inverse: '#0A0A0F',
  },

  // Gradient stops
  gradient: {
    purple: '#7C3AED',
    blue: '#3B82F6',
    purpleToBlue: ['#7C3AED', '#3B82F6'] as const,
    purpleToPink: ['#7C3AED', '#EC4899'] as const,
    darkSurface: ['#1A1A28', '#0A0A0F'] as const,
  },

  // Overlay / Glassmorphism
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    dark: 'rgba(0, 0, 0, 0.4)',
    purple: 'rgba(124, 58, 237, 0.15)',
    blue: 'rgba(59, 130, 246, 0.15)',
  },

  // Transparent
  transparent: 'transparent',
} as const;

export type ColorToken = typeof Colors;
