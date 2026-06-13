import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  interpolate,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import { Colors } from '../../constants/colors';
import { FontSize, FontWeight, LetterSpacing } from '../../constants/typography';
import { Button } from '../../components/ui';
import {
  usePreferencesStore,
  ContentCategory,
} from '../../store/usePreferencesStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ──────────────────────────────────────────────────────────────────────────────
// Interests data
// ──────────────────────────────────────────────────────────────────────────────

interface InterestItem {
  id: ContentCategory;
  label: string;
  emoji: string;
}

const INTERESTS: InterestItem[] = [
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'ai', label: 'AI & ML', emoji: '🤖' },
  { id: 'startups', label: 'Startups', emoji: '🚀' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'finance', label: 'Finance', emoji: '📈' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'health', label: 'Health', emoji: '🍎' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'design', label: 'Design', emoji: '🎨' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'education', label: 'Education', emoji: '📚' },
];

// ──────────────────────────────────────────────────────────────────────────────
// Interest Chip (animated)
// ──────────────────────────────────────────────────────────────────────────────

function InterestChip({
  item,
  selected,
  onToggle,
  index,
}: {
  item: InterestItem;
  selected: boolean;
  onToggle: (id: ContentCategory) => void;
  index: number;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.9, { damping: 12 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    onToggle(item.id);
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 14, delay: 60 + index * 50 }}
    >
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.8}
          style={styles.chipTouchable}
        >
          {selected ? (
            <LinearGradient
              colors={Colors.gradient.purpleToBlue}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.chip, styles.chipSelected]}
            >
              <Text style={styles.chipEmoji}>{item.emoji}</Text>
              <Text style={[styles.chipLabel, styles.chipLabelSelected]}>
                {item.label}
              </Text>
            </LinearGradient>
          ) : (
            <View style={[styles.chip, styles.chipUnselected]}>
              <Text style={styles.chipEmoji}>{item.emoji}</Text>
              <Text style={styles.chipLabel}>{item.label}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </MotiView>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Page Dots
// ──────────────────────────────────────────────────────────────────────────────

function PageDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: total }).map((_, i) => (
        <MotiView
          key={i}
          animate={{
            width: i === current ? 28 : 8,
            backgroundColor:
              i === current ? Colors.accent.purple : Colors.border.strong,
          }}
          transition={{ type: 'spring', damping: 16 }}
          style={styles.dot}
        />
      ))}
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 1 — Welcome
// ──────────────────────────────────────────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  const orbScale = useSharedValue(1);
  const orbRotation = useSharedValue(0);

  React.useEffect(() => {
    orbScale.value = withRepeat(
      withSequence(
        withTiming(1.25, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );
    orbRotation.value = withRepeat(
      withTiming(360, { duration: 14000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
    opacity: interpolate(orbScale.value, [1, 1.25], [0.5, 0.85]),
  }));

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${orbRotation.value}deg` }],
  }));

  const FEATURE_PILLS = [
    { emoji: '🤖', label: 'AI Curation' },
    { emoji: '⚡', label: 'Real-time' },
    { emoji: '🔒', label: 'Private' },
  ];

  return (
    <View style={styles.stepContainer}>
      {/* Background orb system */}
      <Animated.View style={[styles.welcomeOrb, orbStyle]} />
      <Animated.View style={[styles.welcomeHalo, haloStyle]} />
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ type: 'timing', duration: 1200, delay: 300 }}
        style={styles.welcomeOrbBlue}
      />

      {/* Content */}
      <View style={styles.welcomeContent}>
        {/* Logo mark */}
        <MotiView
          from={{ scale: 0, rotate: '-15deg' }}
          animate={{ scale: 1, rotate: '0deg' }}
          transition={{ type: 'spring', damping: 12, delay: 200 }}
          style={styles.logoMark}
        >
          <Text style={styles.logoMarkText}>FF</Text>
        </MotiView>

        {/* Title */}
        <Animated.View
          entering={FadeInDown.delay(350).duration(600)}
          style={styles.titleRow}
        >
          <Text style={styles.welcomeTitleWhite}>Feed</Text>
          <LinearGradient
            colors={Colors.gradient.purpleToBlue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradientBg}
          >
            <Text style={styles.welcomeTitleGradient}>Flow</Text>
          </LinearGradient>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.welcomeSubtitle}
        >
          Your AI-powered Instagram feed,{'\n'}curated just for you.
        </Animated.Text>

        {/* Feature pills */}
        <Animated.View
          entering={FadeInDown.delay(650).duration(600)}
          style={styles.pillsRow}
        >
          {FEATURE_PILLS.map((pill, i) => (
            <MotiView
              key={pill.label}
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'spring', damping: 14, delay: 750 + i * 100 }}
              style={styles.featurePill}
            >
              <Text style={styles.pillEmoji}>{pill.emoji}</Text>
              <Text style={styles.pillLabel}>{pill.label}</Text>
            </MotiView>
          ))}
        </Animated.View>

        {/* CTA */}
        <Animated.View
          entering={FadeInDown.delay(950).duration(600)}
          style={styles.ctaArea}
        >
          <Button
            label="Get Started"
            variant="primary"
            fullWidth
            size="lg"
            onPress={onNext}
          />
        </Animated.View>
      </View>

      <PageDots current={0} total={3} />
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 2 — Choose Interests
// ──────────────────────────────────────────────────────────────────────────────

function StepInterests({ onNext }: { onNext: () => void }) {
  const selectedCategories = usePreferencesStore((s) => s.selectedCategories);
  const toggleCategory = usePreferencesStore((s) => s.toggleCategory);
  const count = selectedCategories.length;

  return (
    <View style={styles.stepContainer}>
      {/* Header */}
      <View style={styles.interestsHeader}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Text style={styles.stepTitle}>What do you love?</Text>
          <Text style={styles.stepSubtitle}>
            Select topics to personalize your feed
          </Text>
        </MotiView>
      </View>

      {/* Interest grid */}
      <ScrollView
        style={styles.interestsScroll}
        contentContainerStyle={styles.interestsGrid}
        showsVerticalScrollIndicator={false}
      >
        {INTERESTS.map((item, index) => (
          <InterestChip
            key={item.id}
            item={item}
            selected={selectedCategories.includes(item.id)}
            onToggle={toggleCategory}
            index={index}
          />
        ))}
      </ScrollView>

      {/* Footer CTA */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 800 }}
        style={styles.footerCta}
      >
        <Button
          label={count > 0 ? `Continue (${count})` : 'Continue'}
          variant="primary"
          fullWidth
          size="lg"
          disabled={count === 0}
          onPress={onNext}
        />
        {count === 0 && (
          <Text style={styles.helperText}>
            Select at least 1 topic to continue
          </Text>
        )}
      </MotiView>

      <PageDots current={1} total={3} />
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Step 3 — All Set
// ──────────────────────────────────────────────────────────────────────────────

function StepComplete() {
  const selectedCategories = usePreferencesStore((s) => s.selectedCategories);

  const handleStart = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace('/(tabs)');
  }, []);

  return (
    <View style={styles.stepContainer}>
      {/* Decorative glow */}
      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ type: 'spring', damping: 12, delay: 200 }}
        style={styles.completeGlow}
      />

      <View style={styles.completeContent}>
        {/* Celebration emoji */}
        <MotiView
          from={{ scale: 0, rotate: '-30deg' }}
          animate={{ scale: 1, rotate: '0deg' }}
          transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 100 }}
        >
          <Text style={styles.celebrationEmoji}>✨</Text>
        </MotiView>

        {/* Summary badge */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 350 }}
          style={styles.summaryBadge}
        >
          <Text style={styles.summaryBadgeText}>
            {selectedCategories.length} interests selected
          </Text>
        </MotiView>

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 450 }}
        >
          <Text style={styles.completeTitle}>Your feed is ready</Text>
        </MotiView>

        {/* Subtitle */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 550 }}
        >
          <Text style={styles.completeSubtitle}>
            FeedFlow will learn your preferences over time
          </Text>
        </MotiView>

        {/* Selected chips preview */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 650 }}
          style={styles.selectedPreview}
        >
          {selectedCategories.slice(0, 6).map((cat, i) => {
            const interest = INTERESTS.find((it) => it.id === cat);
            if (!interest) return null;
            return (
              <MotiView
                key={cat}
                from={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 700 + i * 60 }}
                style={styles.previewChip}
              >
                <Text style={styles.previewChipEmoji}>{interest.emoji}</Text>
                <Text style={styles.previewChipLabel}>{interest.label}</Text>
              </MotiView>
            );
          })}
          {selectedCategories.length > 6 && (
            <View style={styles.previewChip}>
              <Text style={styles.previewChipLabel}>
                +{selectedCategories.length - 6}
              </Text>
            </View>
          )}
        </MotiView>

        {/* CTA */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 800 }}
          style={styles.ctaArea}
        >
          <Button
            label="Start Exploring"
            variant="primary"
            fullWidth
            size="lg"
            onPress={handleStart}
          />
        </MotiView>
      </View>

      <PageDots current={2} total={3} />
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Onboarding Screen
// ──────────────────────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const goNext = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setStep((prev) => Math.min(prev + 1, 2));
  }, []);

  return (
    <View style={styles.root}>
      {step === 0 && (
        <Animated.View
          key="step-0"
          entering={FadeIn.duration(400)}
          exiting={SlideOutLeft.duration(350)}
          style={StyleSheet.absoluteFill}
        >
          <StepWelcome onNext={goNext} />
        </Animated.View>
      )}

      {step === 1 && (
        <Animated.View
          key="step-1"
          entering={SlideInRight.duration(400)}
          exiting={SlideOutLeft.duration(350)}
          style={StyleSheet.absoluteFill}
        >
          <StepInterests onNext={goNext} />
        </Animated.View>
      )}

      {step === 2 && (
        <Animated.View
          key="step-2"
          entering={SlideInRight.duration(400)}
          style={StyleSheet.absoluteFill}
        >
          <StepComplete />
        </Animated.View>
      )}
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Styles
// ──────────────────────────────────────────────────────────────────────────────

const ORB_SIZE = 280;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  // ── Shared step layout ───────────────────────────────────────────────────
  stepContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    overflow: 'hidden',
  },

  // ── Page dots ────────────────────────────────────────────────────────────
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 36,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },

  // ── Step 1: Welcome ──────────────────────────────────────────────────────
  welcomeOrb: {
    position: 'absolute',
    top: -ORB_SIZE * 0.35,
    alignSelf: 'center',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: Colors.accent.purple,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
    elevation: 16,
  },
  welcomeHalo: {
    position: 'absolute',
    top: -ORB_SIZE * 0.55,
    alignSelf: 'center',
    width: ORB_SIZE * 1.5,
    height: ORB_SIZE * 1.5,
    borderRadius: (ORB_SIZE * 1.5) / 2,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}44`,
    borderStyle: 'dashed',
  },
  welcomeOrbBlue: {
    position: 'absolute',
    top: -60,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.accent.blue,
    shadowColor: Colors.accent.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  welcomeContent: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 4,
  },
  logoMarkText: {
    color: Colors.text.primary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  welcomeTitleWhite: {
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: -2,
    lineHeight: FontSize['6xl'] * 1.1,
  },
  titleGradientBg: {
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  welcomeTitleGradient: {
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: -2,
    lineHeight: FontSize['6xl'] * 1.1,
  },
  welcomeSubtitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.lg,
    textAlign: 'center',
    lineHeight: FontSize.lg * 1.6,
    maxWidth: 300,
  },

  // Feature pills
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.overlay.purple,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}33`,
  },
  pillEmoji: {
    fontSize: 14,
  },
  pillLabel: {
    color: Colors.accent.purpleLight,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },

  // CTA
  ctaArea: {
    width: '100%',
    marginTop: 16,
    gap: 10,
  },

  // ── Step 2: Interests ────────────────────────────────────────────────────
  interestsHeader: {
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 16,
  },
  stepTitle: {
    color: Colors.text.primary,
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  stepSubtitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.5,
  },

  // Interest grid
  interestsScroll: {
    flex: 1,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 10,
    paddingBottom: 16,
  },

  // Chip
  chipTouchable: {
    marginBottom: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 100,
  },
  chipUnselected: {
    borderWidth: 1.5,
    borderColor: Colors.border.strong,
    backgroundColor: Colors.background.card,
  },
  chipSelected: {
    borderWidth: 0,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  chipEmoji: {
    fontSize: 18,
  },
  chipLabel: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  chipLabelSelected: {
    color: Colors.text.primary,
    fontWeight: FontWeight.semibold,
  },

  // Footer
  footerCta: {
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
  },
  helperText: {
    color: Colors.text.tertiary,
    fontSize: FontSize.xs,
    textAlign: 'center',
  },

  // ── Step 3: Complete ─────────────────────────────────────────────────────
  completeGlow: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accent.purple,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
  },
  completeContent: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  celebrationEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.overlay.purple,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}44`,
  },
  summaryBadgeText: {
    color: Colors.accent.purpleLight,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  completeTitle: {
    color: Colors.text.primary,
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: -1,
    textAlign: 'center',
  },
  completeSubtitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.6,
    maxWidth: 280,
  },

  // Selected preview
  selectedPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  previewChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.background.card,
    borderWidth: 1,
    borderColor: Colors.border.default,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
  },
  previewChipEmoji: {
    fontSize: 14,
  },
  previewChipLabel: {
    color: Colors.text.secondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
});
