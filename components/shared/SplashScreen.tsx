import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  FadeIn,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish?: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const rotation = useSharedValue(0);
  const orbScale = useSharedValue(1);

  useEffect(() => {
    // Slow ambient rotation for outer ring
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );

    // Pulse for the orb
    orbScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 2000, easing: Easing.inOut(Easing.sine) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );

    // Auto-advance after animation settles
    const timer = setTimeout(() => onFinish?.(), 2800);
    return () => clearTimeout(timer);
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
    opacity: interpolate(orbScale.value, [1, 1.15], [0.7, 1]),
  }));

  return (
    <View style={styles.container}>
      {/* Background glow */}
      <Animated.View style={[styles.backgroundGlow, orbStyle]} />

      {/* Rotating outer ring */}
      <Animated.View style={[styles.outerRing, ringStyle]} />

      {/* Inner dashed ring */}
      <MotiView
        from={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', delay: 200 }}
        style={styles.innerRing}
      />

      {/* Logo */}
      <Animated.View entering={FadeIn.delay(400).duration(600)} style={styles.logoContainer}>
        {/* F icon mark */}
        <MotiView
          from={{ scale: 0, rotate: '-20deg' }}
          animate={{ scale: 1, rotate: '0deg' }}
          transition={{ type: 'spring', damping: 14, delay: 300 }}
          style={styles.iconMark}
        >
          <Text style={styles.iconText}>FF</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
        >
          <Text style={styles.title}>FeedFlow</Text>
          <Text style={styles.subtitle}>Your intelligent feed, curated.</Text>
        </MotiView>
      </Animated.View>

      {/* Loading dots */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1000, duration: 400 }}
        style={styles.dotsRow}
      >
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ scale: 0.6, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'timing',
              duration: 500,
              delay: i * 180,
              loop: true,
              repeatReverse: true,
            }}
            style={styles.dot}
          />
        ))}
      </MotiView>
    </View>
  );
}

const ORB_SIZE = 220;
const RING_SIZE = 280;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: Colors.accent.purple,
    opacity: 0.25,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
    elevation: 20,
  },
  outerRing: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1,
    borderColor: Colors.accent.purple,
    borderStyle: 'dashed',
    opacity: 0.3,
  },
  innerRing: {
    position: 'absolute',
    width: RING_SIZE * 0.7,
    height: RING_SIZE * 0.7,
    borderRadius: (RING_SIZE * 0.7) / 2,
    borderWidth: 1,
    borderColor: Colors.accent.blue,
    opacity: 0.25,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 20,
  },
  iconMark: {
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
  },
  iconText: {
    color: Colors.text.primary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },
  title: {
    color: Colors.text.primary,
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 0.3,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent.purple,
  },
});
