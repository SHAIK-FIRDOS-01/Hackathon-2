import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { MotiView } from 'moti';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight } from '../../constants/typography';

const SETTINGS = [
  { section: 'Account', items: ['Edit Profile', 'Change Password', 'Linked Accounts'] },
  { section: 'Notifications', items: ['Push Notifications', 'Email Digest', 'Breaking News'] },
  { section: 'App', items: ['Appearance', 'Language', 'Clear Cache'] },
  { section: 'About', items: ['Privacy Policy', 'Terms of Service', 'Version 1.0.0'] },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile header */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', delay: 100 }}
        style={styles.profileHeader}
      >
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>FF</Text>
          </View>
        </View>
        <Text style={styles.profileName}>FeedFlow User</Text>
        <Text style={styles.profileEmail}>user@feedflow.app</Text>
        <View style={styles.memberBadge}>
          <Text style={styles.memberText}>✦ Pro Member</Text>
        </View>
      </MotiView>

      {/* Settings groups */}
      {SETTINGS.map((group, gi) => (
        <MotiView
          key={group.section}
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 450, delay: 200 + gi * 80 }}
          style={styles.settingsGroup}
        >
          <Text style={styles.groupTitle}>{group.section}</Text>
          <View style={styles.groupCard}>
            {group.items.map((item, idx) => (
              <View
                key={item}
                style={[
                  styles.settingsRow,
                  idx < group.items.length - 1 && styles.settingsRowBorder,
                ]}
              >
                <Text style={styles.settingsLabel}>{item}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            ))}
          </View>
        </MotiView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  content: { padding: 24, gap: 24, paddingBottom: 48 },

  // Profile header
  profileHeader: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  avatarRing: {
    padding: 3,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: Colors.accent.purple,
    marginBottom: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.accent.purple,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  profileName: {
    color: Colors.text.primary,
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
  },
  profileEmail: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
  },
  memberBadge: {
    backgroundColor: Colors.overlay.purple,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${Colors.accent.purple}55`,
    marginTop: 4,
  },
  memberText: {
    color: Colors.accent.purpleLight,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },

  // Settings
  settingsGroup: { gap: 10 },
  groupTitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  groupCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.default,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  settingsRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  settingsLabel: {
    color: Colors.text.primary,
    fontSize: FontSize.base,
  },
  chevron: {
    color: Colors.text.tertiary,
    fontSize: FontSize.xl,
  },
});
