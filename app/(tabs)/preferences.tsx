import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { Colors } from '../../constants/colors';
import { FontSize, FontWeight, LetterSpacing } from '../../constants/typography';
import { Card } from '../../components/ui';
import {
  usePreferencesStore,
  ContentCategory,
  RefreshInterval,
  DisplayLayout,
} from '../../store/usePreferencesStore';

// ──────────────────────────────────────────────────────────────────────────────
// Interest data
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
// Refresh interval data
// ──────────────────────────────────────────────────────────────────────────────

interface IntervalOption {
  value: RefreshInterval;
  label: string;
}

const INTERVALS: IntervalOption[] = [
  { value: '15min', label: '15 min' },
  { value: '30min', label: '30 min' },
  { value: '1hour', label: '1 hr' },
  { value: '6hour', label: '6 hr' },
  { value: 'manual', label: 'Manual' },
];

// ──────────────────────────────────────────────────────────────────────────────
// Layout data
// ──────────────────────────────────────────────────────────────────────────────

interface LayoutOption {
  value: DisplayLayout;
  label: string;
  icon: string;
}

const LAYOUTS: LayoutOption[] = [
  { value: 'card', label: 'Card', icon: '🃏' },
  { value: 'compact', label: 'Compact', icon: '📋' },
  { value: 'magazine', label: 'Magazine', icon: '📰' },
];

// ──────────────────────────────────────────────────────────────────────────────
// InterestChip (reusable, animated)
// ──────────────────────────────────────────────────────────────────────────────

function InterestChip({
  item,
  selected,
  onToggle,
}: {
  item: InterestItem;
  selected: boolean;
  onToggle: (id: ContentCategory) => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.88, { damping: 12 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    onToggle(item.id);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
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
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PillSelector (for intervals)
// ──────────────────────────────────────────────────────────────────────────────

function PillSelector<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <View style={styles.pillSelectorRow}>
      {options.map((opt) => {
        const isActive = opt.value === selected;
        return (
          <TouchableOpacity
            key={opt.value}
            activeOpacity={0.7}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onSelect(opt.value);
            }}
            style={[styles.pillOption, isActive && styles.pillOptionActive]}
          >
            {isActive ? (
              <LinearGradient
                colors={Colors.gradient.purpleToBlue}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.pillGradient}
              >
                <Text style={[styles.pillText, styles.pillTextActive]}>
                  {opt.label}
                </Text>
              </LinearGradient>
            ) : (
              <Text style={styles.pillText}>{opt.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SegmentedControl (for layouts)
// ──────────────────────────────────────────────────────────────────────────────

function SegmentedControl({
  options,
  selected,
  onSelect,
}: {
  options: LayoutOption[];
  selected: DisplayLayout;
  onSelect: (value: DisplayLayout) => void;
}) {
  return (
    <View style={styles.segmentedContainer}>
      {options.map((opt) => {
        const isActive = opt.value === selected;
        return (
          <TouchableOpacity
            key={opt.value}
            activeOpacity={0.7}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onSelect(opt.value);
            }}
            style={[styles.segment, isActive && styles.segmentActive]}
          >
            <Text style={styles.segmentIcon}>{opt.icon}</Text>
            <Text
              style={[styles.segmentLabel, isActive && styles.segmentLabelActive]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ToggleRow
// ──────────────────────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleTextCol}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Text style={styles.toggleDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(val) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onValueChange(val);
        }}
        trackColor={{
          false: Colors.border.strong,
          true: `${Colors.accent.purple}88`,
        }}
        thumbColor={value ? Colors.accent.purple : Colors.text.tertiary}
        ios_backgroundColor={Colors.border.strong}
      />
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Section Header
// ──────────────────────────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Preferences Screen
// ──────────────────────────────────────────────────────────────────────────────

export default function PreferencesScreen() {
  const selectedCategories = usePreferencesStore((s) => s.selectedCategories);
  const toggleCategory = usePreferencesStore((s) => s.toggleCategory);
  const refreshInterval = usePreferencesStore((s) => s.refreshInterval);
  const setRefreshInterval = usePreferencesStore((s) => s.setRefreshInterval);
  const displayLayout = usePreferencesStore((s) => s.displayLayout);
  const setDisplayLayout = usePreferencesStore((s) => s.setDisplayLayout);
  const showImages = usePreferencesStore((s) => s.showImages);
  const setShowImages = usePreferencesStore((s) => s.setShowImages);
  const showSummaries = usePreferencesStore((s) => s.showSummaries);
  const setShowSummaries = usePreferencesStore((s) => s.setShowSummaries);
  const autoMarkRead = usePreferencesStore((s) => s.autoMarkRead);
  const setAutoMarkRead = usePreferencesStore((s) => s.setAutoMarkRead);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Screen header */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Text style={styles.screenTitle}>Preferences</Text>
        <Text style={styles.screenSubtitle}>
          Customize your FeedFlow experience
        </Text>
      </MotiView>

      {/* ── Section 1: Your Interests ─────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: 28 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
      >
        <SectionHeader
          title="Your Interests"
          subtitle={`${selectedCategories.length} selected`}
        />
        <Card padding="md" bordered elevated={false}>
          <View style={styles.interestsGrid}>
            {INTERESTS.map((item) => (
              <InterestChip
                key={item.id}
                item={item}
                selected={selectedCategories.includes(item.id)}
                onToggle={toggleCategory}
              />
            ))}
          </View>
        </Card>
      </MotiView>

      {/* ── Section 2: Feed Settings ──────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: 28 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
      >
        <SectionHeader title="Feed Settings" />
        <Card padding="md" bordered elevated={false} style={styles.settingsCard}>
          {/* Refresh Interval */}
          <View style={styles.settingBlock}>
            <Text style={styles.settingLabel}>Refresh Interval</Text>
            <Text style={styles.settingDesc}>
              How often FeedFlow checks for new content
            </Text>
            <PillSelector
              options={INTERVALS}
              selected={refreshInterval}
              onSelect={setRefreshInterval}
            />
          </View>

          <View style={styles.settingDivider} />

          {/* Display Layout */}
          <View style={styles.settingBlock}>
            <Text style={styles.settingLabel}>Display Layout</Text>
            <Text style={styles.settingDesc}>
              Choose how articles appear in your feed
            </Text>
            <SegmentedControl
              options={LAYOUTS}
              selected={displayLayout}
              onSelect={setDisplayLayout}
            />
          </View>
        </Card>
      </MotiView>

      {/* ── Section 3: Content Filters ────────────────────────────────────── */}
      <MotiView
        from={{ opacity: 0, translateY: 28 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
      >
        <SectionHeader title="Content Filters" />
        <Card padding="none" bordered elevated={false}>
          <ToggleRow
            label="Show Images"
            description="Display article thumbnails and cover images"
            value={showImages}
            onValueChange={setShowImages}
          />
          <View style={styles.toggleDivider} />
          <ToggleRow
            label="Show Summaries"
            description="Display AI-generated article summaries"
            value={showSummaries}
            onValueChange={setShowSummaries}
          />
          <View style={styles.toggleDivider} />
          <ToggleRow
            label="Auto-mark Read"
            description="Automatically mark articles as read after viewing"
            value={autoMarkRead}
            onValueChange={setAutoMarkRead}
          />
        </Card>
      </MotiView>
    </ScrollView>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Styles
// ──────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 48,
    gap: 28,
  },

  // Screen header
  screenTitle: {
    color: Colors.text.primary,
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  screenSubtitle: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.5,
  },

  // Section header
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.text.primary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    color: Colors.text.tertiary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },

  // Interests grid
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  // Chip styles
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
  },
  chipUnselected: {
    borderWidth: 1.5,
    borderColor: Colors.border.strong,
    backgroundColor: Colors.background.elevated,
  },
  chipSelected: {
    borderWidth: 0,
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  chipEmoji: {
    fontSize: 16,
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

  // Feed Settings card
  settingsCard: {
    gap: 0,
  },
  settingBlock: {
    gap: 10,
  },
  settingLabel: {
    color: Colors.text.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  },
  settingDesc: {
    color: Colors.text.tertiary,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * 1.5,
  },
  settingDivider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginVertical: 18,
  },

  // Pill selector
  pillSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  pillOption: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.border.strong,
    backgroundColor: Colors.background.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  pillOptionActive: {
    borderWidth: 0,
  },
  pillGradient: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
  },
  pillText: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  pillTextActive: {
    color: Colors.text.primary,
    fontWeight: FontWeight.semibold,
  },

  // Segmented control
  segmentedContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border.strong,
    backgroundColor: Colors.background.elevated,
  },
  segmentActive: {
    borderColor: Colors.accent.purple,
    backgroundColor: Colors.overlay.purple,
  },
  segmentIcon: {
    fontSize: 22,
  },
  segmentLabel: {
    color: Colors.text.secondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  segmentLabelActive: {
    color: Colors.accent.purpleLight,
    fontWeight: FontWeight.semibold,
  },

  // Toggle row
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  toggleTextCol: {
    flex: 1,
    gap: 3,
  },
  toggleLabel: {
    color: Colors.text.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
  },
  toggleDesc: {
    color: Colors.text.tertiary,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * 1.5,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginHorizontal: 16,
  },
});
