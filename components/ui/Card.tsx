import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  style,
  elevated = false,
  bordered = true,
  padding = 'md',
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        bordered && styles.bordered,
        elevated && styles.elevated,
        styles[`padding_${padding}`],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.border.default,
  },
  elevated: {
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  padding_none: { padding: 0 },
  padding_sm: { padding: 12 },
  padding_md: { padding: 16 },
  padding_lg: { padding: 24 },
});
