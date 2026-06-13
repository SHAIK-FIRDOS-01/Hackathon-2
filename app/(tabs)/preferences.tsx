import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

export default function PreferencesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Text style={styles.heading}>Content Preferences</Text>
        <Text style={styles.subheading}>Customize your FeedFlow experience</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 150 }}
        style={styles.placeholder}
      >
        <Text style={styles.placeholderIcon}>⚙️</Text>
        <Text style={styles.placeholderText}>Preferences setup coming soon</Text>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  content: { padding: 24, gap: 24 },
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
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    backgroundColor: Colors.background.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border.default,
    gap: 12,
    marginTop: 16,
  },
  placeholderIcon: { fontSize: 48 },
  placeholderText: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
  },
});
