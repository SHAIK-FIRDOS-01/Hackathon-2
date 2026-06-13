import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  onPress,
  disabled,
  ...rest
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15 });
    opacity.value = withTiming(0.85, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 100 });
  };

  const handlePress = (event: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(event);
  };

  const isDisabled = disabled || isLoading;

  if (variant === 'primary') {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={1}
        style={[animatedStyle, fullWidth && styles.fullWidth]}
        {...rest}
      >
        <LinearGradient
          colors={Colors.gradient.purpleToBlue}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, styles[size], isDisabled && styles.disabled, style]}
        >
          {leftIcon && !isLoading && leftIcon}
          {isLoading ? (
            <ActivityIndicator color={Colors.text.primary} size="small" />
          ) : (
            <Text style={[styles.text, styles[`text_${size}`], textStyle]}>{label}</Text>
          )}
          {rightIcon && !isLoading && rightIcon}
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  const variantStyle = variantStyles[variant];

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      activeOpacity={1}
      style={[animatedStyle, fullWidth && styles.fullWidth]}
      {...rest}
    >
      <Animated.View
        style={[styles.base, styles[size], variantStyle, isDisabled && styles.disabled, style]}
      >
        {leftIcon && !isLoading && leftIcon}
        {isLoading ? (
          <ActivityIndicator color={Colors.text.primary} size="small" />
        ) : (
          <Text
            style={[
              styles.text,
              styles[`text_${size}`],
              variant === 'ghost' && styles.ghostText,
              variant === 'danger' && styles.dangerText,
              textStyle,
            ]}
          >
            {label}
          </Text>
        )}
        {rightIcon && !isLoading && rightIcon}
      </Animated.View>
    </AnimatedTouchable>
  );
}

const variantStyles: Record<Exclude<ButtonVariant, 'primary'>, ViewStyle> = {
  secondary: {
    backgroundColor: Colors.background.card,
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  ghost: {
    backgroundColor: Colors.overlay.light,
  },
  danger: {
    backgroundColor: `${Colors.error}22`,
    borderWidth: 1,
    borderColor: Colors.error,
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  md: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  lg: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    color: Colors.text.primary,
    fontWeight: FontWeight.semibold,
  },
  text_sm: { fontSize: FontSize.sm },
  text_md: { fontSize: FontSize.base },
  text_lg: { fontSize: FontSize.md },
  ghostText: { color: Colors.text.secondary },
  dangerText: { color: Colors.error },
});
