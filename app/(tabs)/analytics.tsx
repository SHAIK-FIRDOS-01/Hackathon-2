import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Text style={styles.heading}>Analytics</Text>
        <Text style={styles.subheading}>Track your reading habits and insights</Text>
      </MotiView>

      <View style={styles.metricsRow}>
        {METRICS.map((m, i) => (
          <MotiView
            key={m.label}
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 100 + i * 80 }}
            style={styles.metricCard}
          >
            <Text style={styles.metricIcon}>{m.icon}</Text>
            <Text style={styles.metricValue}>{m.value}</Text>
            <Text style={styles.metricLabel}>{m.label}</Text>
          </MotiView>
        ))}
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
        style={styles.chartPlaceholder}
      >
        <Text style={styles.placeholderIcon}>📊</Text>
        <Text style={styles.placeholderText}>Detailed charts coming soon</Text>
      </MotiView>
    </ScrollView>
  );
}

const METRICS = [
  { icon: '📰', value: '247', label: 'Articles Read' },
  { icon: '⏱️', value: '4.2h', label: 'Time Spent' },
  { icon: '🔖', value: '31', label: 'Bookmarked' },
  { icon: '🤖', value: '8', label: 'Automations' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  content: { padding: 24, gap: 20 },
  heading: {
    color: Colors.text.primary,
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    marginBottom: 6,
  },
  subheading: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  metricCard: {
    width: '47%',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.default,
    padding: 20,
    gap: 6,
  },
  metricIcon: { fontSize: 28 },
  metricValue: {
    color: Colors.text.primary,
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
  },
  metricLabel: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    backgroundColor: Colors.background.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.default,
    gap: 12,
  },
  placeholderIcon: { fontSize: 48 },
  placeholderText: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
  },
});
