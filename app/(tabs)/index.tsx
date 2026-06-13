import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  FadeIn,
  FadeInDown,
  interpolate,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight, LetterSpacing } from '../../constants/typography';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const orbScale = useSharedValue(1);
  const orbOpacity = useSharedValue(0.6);
  const orbRotation = useSharedValue(0);

  useEffect(() => {
    // Pulsing orb scale
    orbScale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );

    // Opacity breathe
    orbOpacity.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(0.5, { duration: 3000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );

    // Slow ambient rotation for the outer halo
    orbRotation.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const orbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
    opacity: orbOpacity.value,
  }));

  const haloAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${orbRotation.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(orbScale.value, [1, 1.3], [0.35, 0.55]),
    transform: [{ scale: interpolate(orbScale.value, [1, 1.3], [1, 1.15]) }],
  }));

  return (
    <View style={styles.container}>
      {/* ─── Background Orb System ─── */}
      {/* Outer ambient glow */}
      <Animated.View style={[styles.ambientGlow, glowStyle]} />

      {/* Rotating halo ring */}
      <Animated.View style={[styles.haloRing, haloAnimatedStyle]} />

      {/* Inner pulsing orb */}
      <Animated.View style={[styles.orb, orbAnimatedStyle]} />

      {/* Secondary blue orb (offset) */}
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ type: 'timing', duration: 1500, delay: 400 }}
        style={styles.secondaryOrb}
      />

      {/* ─── Content ─── */}
      <View style={styles.content}>
        {/* Badge */}
        <Animated.View entering={FadeIn.delay(200).duration(600)} style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>AI-Powered Feed Curation</Text>
        </Animated.View>

        {/* Logo / Title */}
        <Animated.View entering={FadeInDown.delay(350).duration(700)} style={styles.logoRow}>
          {/* Gradient text via LinearGradient mask approach */}
          <View style={styles.titleWrapper}>
            <Text style={styles.titleBase}>Feed</Text>
            <LinearGradient
              colors={Colors.gradient.purpleToBlue}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradientBlock}
            >
              <Text style={[styles.titleBase, styles.titleGradientText]}>Flow</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.subtitle}
        >
          Your intelligent content stream,{'\n'}tailored to you.
        </Animated.Text>

        {/* Stats row */}
        <Animated.View
          entering={FadeInDown.delay(650).duration(600)}
          style={styles.statsRow}
        >
          {STATS.map((stat, i) => (
            <MotiView
              key={stat.label}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 800 + i * 100 }}
              style={styles.statCard}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </MotiView>
          ))}
        </Animated.View>

        {/* CTA area */}
        <Animated.View
          entering={FadeInDown.delay(900).duration(600)}
          style={styles.ctaContainer}
        >
          <LinearGradient
            colors={Colors.gradient.purpleToBlue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>Get Started</Text>
          </LinearGradient>

          <View style={styles.ctaSecondary}>
            <Text style={styles.ctaSecondaryText}>Sign in with existing account</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom decorative line */}
      <Animated.View entering={FadeIn.delay(1200).duration(600)} style={styles.bottomDecor}>
        <LinearGradient
          colors={['transparent', Colors.accent.purple, Colors.accent.blue, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.decorLine}
        />
      </Animated.View>
    </View>
  );
}

const STATS = [
  { value: '10K+', label: 'Sources' },
  { value: '98%', label: 'Accuracy' },
  { value: '< 1s', label: 'Latency' },
];

const ORB_SIZE = 300;
const GLOW_SIZE = 500;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // ─── Orb System ───
  ambientGlow: {
    position: 'absolute',
    top: -GLOW_SIZE * 0.2,
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    backgroundColor: Colors.accent.purple,
    opacity: 0.18,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 0,
  },
  haloRing: {
    position: 'absolute',
    top: -ORB_SIZE * 0.25,
    width: ORB_SIZE * 1.4,
    height: ORB_SIZE * 1.4,
    borderRadius: (ORB_SIZE * 1.4) / 2,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}55`,
    borderStyle: 'dashed',
  },
  orb: {
    position: 'absolute',
    top: -ORB_SIZE * 0.4,
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: Colors.accent.purple,
    opacity: 0.6,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
    elevation: 16,
  },
  secondaryOrb: {
    position: 'absolute',
    top: -80,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.accent.blue,
    shadowColor: Colors.accent.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
  },

  // ─── Content ───
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 120,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    width: '100%',
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.overlay.purple,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}44`,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent.purple,
  },
  badgeText: {
    color: Colors.accent.purpleLight,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
  },

  // Title
  logoRow: {
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleBase: {
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: -2,
    lineHeight: FontSize['6xl'] * 1.1,
  },
  titleGradientBlock: {
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  titleGradientText: {
    color: Colors.text.primary,
  },

  // Subtitle
  subtitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.lg,
    textAlign: 'center',
    lineHeight: FontSize.lg * 1.6,
    letterSpacing: 0.2,
    maxWidth: 280,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border.default,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: Colors.text.primary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  },
  statLabel: {
    color: Colors.text.secondary,
    fontSize: FontSize.xs,
    letterSpacing: LetterSpacing.wide,
  },

  // CTA
  ctaContainer: {
    width: '100%',
    gap: 14,
    marginTop: 8,
  },
  ctaButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  ctaText: {
    color: Colors.text.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.3,
  },
  ctaSecondary: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  ctaSecondaryText: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
  },

  // Bottom decor
  bottomDecor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  decorLine: {
    height: 1,
    borderRadius: 1,
  },
});
