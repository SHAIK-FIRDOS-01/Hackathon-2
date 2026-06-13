import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';
import { Button } from '../../components/ui';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Curation',
    desc: 'Smart articles matched to your interests',
  },
  {
    icon: '⚡',
    title: 'Real-time',
    desc: 'Breaking news delivered instantly',
  },
  {
    icon: '🔧',
    title: 'Automation',
    desc: 'Rules-based feed management',
  },
];

export default function OnboardingScreen() {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const rotStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      {/* Background orb */}
      <Animated.View style={[styles.orb, rotStyle]} />
      <View style={styles.orbCore} />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo mark */}
        <MotiView
          from={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 200 }}
          style={styles.logoMark}
        >
          <Text style={styles.logoMarkText}>FF</Text>
        </MotiView>

        <Animated.Text entering={FadeIn.delay(400).duration(600)} style={styles.welcome}>
          Welcome to
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(500).duration(600)}>
          <LinearGradient
            colors={Colors.gradient.purpleToBlue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradient}
          >
            <Text style={styles.title}>FeedFlow</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(650).duration(600)}
          style={styles.description}
        >
          Your AI-powered content hub. Discover, organize,
          and automate your information flow.
        </Animated.Text>

        {/* Features */}
        <View style={styles.featuresGrid}>
          {FEATURES.map((feature, i) => (
            <MotiView
              key={feature.title}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 450, delay: 800 + i * 120 }}
              style={styles.featureCard}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </MotiView>
          ))}
        </View>

        {/* CTA buttons */}
        <Animated.View
          entering={FadeInDown.delay(1100).duration(600)}
          style={styles.ctaStack}
        >
          <Button label="Create Account" variant="primary" fullWidth size="lg" />
          <Button label="Sign In" variant="secondary" fullWidth size="lg" />
        </Animated.View>
      </View>
    </View>
  );
}

const ORB_SIZE = 350;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    top: -ORB_SIZE * 0.5,
    left: -ORB_SIZE * 0.15,
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}33`,
    borderStyle: 'dashed',
  },
  orbCore: {
    position: 'absolute',
    top: -200,
    left: width / 2 - 150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accent.purple,
    opacity: 0.2,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 100,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 16,
  },
  logoMark: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: Colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 8,
  },
  logoMarkText: {
    color: Colors.text.primary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  welcome: {
    color: Colors.text.secondary,
    fontSize: FontSize.lg,
  },
  titleGradient: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  title: {
    color: Colors.text.primary,
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: -2,
  },
  description: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.7,
    maxWidth: 300,
  },
  featuresGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    width: '100%',
  },
  featureCard: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border.default,
    padding: 14,
    gap: 6,
    alignItems: 'center',
  },
  featureIcon: { fontSize: 24 },
  featureTitle: {
    color: Colors.text.primary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },
  featureDesc: {
    color: Colors.text.tertiary,
    fontSize: FontSize.xs,
    textAlign: 'center',
    lineHeight: FontSize.xs * 1.5,
  },
  ctaStack: {
    width: '100%',
    gap: 12,
    marginTop: 16,
  },
});
