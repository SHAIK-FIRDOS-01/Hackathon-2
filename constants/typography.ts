/**
 * FeedFlow Typography System
 */

export const FontFamily = {
  // System fonts — swap for custom fonts (e.g. Inter) via expo-font when ready
  sans: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  mono: {
    regular: 'Courier',
  },
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

export const LineHeight = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

// Pre-composed text style presets
export const TextPresets = {
  displayLarge: {
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['5xl'] * LineHeight.tight,
  },
  displayMedium: {
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['4xl'] * LineHeight.tight,
  },
  h1: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['3xl'] * LineHeight.snug,
  },
  h2: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize['2xl'] * LineHeight.snug,
  },
  h3: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.xl * LineHeight.normal,
  },
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  bodySmall: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
  },
  caption: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.xs * LineHeight.normal,
    letterSpacing: LetterSpacing.wide,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
  },
} as const;
