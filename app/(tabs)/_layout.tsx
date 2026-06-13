import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { FontSize } from '../../constants/typography';
import { Platform } from 'react-native';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: IoniconsName;
  iconFocused: IoniconsName;
}

const TABS: TabConfig[] = [
  { name: 'index', title: 'Feed', icon: 'home-outline', iconFocused: 'home' },
  {
    name: 'preferences',
    title: 'Explore',
    icon: 'compass-outline',
    iconFocused: 'compass',
  },
  {
    name: 'analytics',
    title: 'Analytics',
    icon: 'bar-chart-outline',
    iconFocused: 'bar-chart',
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    iconFocused: 'person',
  },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background.secondary,
          borderTopWidth: 1,
          borderTopColor: Colors.border.default,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: Colors.accent.purple,
        tabBarInactiveTintColor: Colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          marginTop: 2,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
