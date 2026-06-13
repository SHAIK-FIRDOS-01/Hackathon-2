<p align="center">
  <img src="https://img.shields.io/badge/Expo-SDK%2056-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Native-0.85-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/NativeWind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-State-FF6B35?style=for-the-badge" />
</p>

<h1 align="center">⚡ FeedFlow</h1>

<p align="center">
  <strong>Your AI-powered content stream, tailored to you.</strong><br/>
  A production-ready React Native Expo application with file-based routing,<br/>
  a premium dark design system, and intelligent feed automation.
</p>

---

## ✨ Overview

FeedFlow is a mobile news/content aggregator built for the hackathon, designed around three pillars:

| Pillar | What it means |
|--------|--------------|
| 🤖 **AI Curation** | Content ranked and filtered to match your interests |
| ⚡ **Real-time** | Breaking news and live feed updates |
| 🔧 **Automation** | Rules-based feed management (bookmark, hide, notify, tag) |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/) + React Native 0.85 |
| **Language** | TypeScript (strict mode) |
| **Routing** | [expo-router](https://docs.expo.dev/router/introduction/) — file-based, typed routes |
| **Styling** | [NativeWind v4](https://www.nativewind.dev/) + Tailwind CSS |
| **Animation** | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) + [Moti](https://moti.fyi/) |
| **Lists** | [@shopify/flash-list](https://shopify.github.io/flash-list/) — high-performance virtualization |
| **State** | [Zustand](https://zustand-demo.pmnd.rs/) — lightweight, zero-boilerplate |
| **Data Fetching** | [@tanstack/react-query](https://tanstack.com/query/latest) — caching, sync, background refetch |
| **Backend** | [Supabase](https://supabase.com/) — auth, database, realtime |
| **Gestures** | react-native-gesture-handler |
| **Haptics** | expo-haptics |
| **Gradients** | expo-linear-gradient |
| **Icons** | @expo/vector-icons (Ionicons) |

---

## 📁 Project Structure

```
feedflow/
├── app/                          # expo-router file-based routing
│   ├── (auth)/
│   │   └── index.tsx             # Onboarding / landing screen
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Bottom tab navigator
│   │   ├── index.tsx             # 🏠 Feed dashboard (animated hero)
│   │   ├── preferences.tsx       # 🧭 Content preferences
│   │   ├── analytics.tsx         # 📊 Reading analytics
│   │   └── profile.tsx           # 👤 Profile & settings
│   └── _layout.tsx               # Root layout (providers + splash gate)
│
├── components/
│   ├── ui/                       # Reusable design primitives
│   │   ├── Button.tsx            # Gradient/haptic animated button
│   │   ├── Card.tsx              # Bordered / elevated card
│   │   └── index.ts              # Barrel export
│   └── shared/
│       └── SplashScreen.tsx      # Animated splash (orb + rings + logo)
│
├── constants/
│   ├── colors.ts                 # Design token color palette
│   └── typography.ts             # Font scale, weights, presets
│
├── store/
│   ├── useAuthStore.ts           # Auth state (user, session, login/logout)
│   ├── usePreferencesStore.ts    # Content categories, feed layout, filters
│   └── useAutomationStore.ts     # Automation rules (triggers + actions)
│
├── lib/
│   └── supabase.ts               # Typed Supabase client + DB schema
│
├── assets/                       # App icons, splash, favicon
├── babel.config.js               # NativeWind + Reanimated (plugin last)
├── metro.config.js               # NativeWind metro integration
├── tailwind.config.js            # Custom design token colors
├── global.css                    # NativeWind CSS entry point
├── nativewind-env.d.ts           # className prop type declarations
├── tsconfig.json                 # Strict TS + path aliases
└── app.json                      # Expo config (dark theme, plugins)
```

---

## 🎨 Design System

FeedFlow uses a **dark-first** design system with a purple/blue accent palette:

```typescript
// constants/colors.ts
Background:  #0A0A0F  (primary)  ·  #12121A (secondary)  ·  #1A1A28 (card)
Border:      #2A2A3E  (default)
Accent:      #7C3AED  (purple)   ·  #3B82F6 (blue)
Success:     #10B981
Error:       #EF4444
Text:        #FFFFFF  (primary)  ·  #9CA3AF (secondary)
Gradient:    #7C3AED → #3B82F6   (purple to blue)
```

All tokens live in `constants/colors.ts` and `constants/typography.ts` and are mirrored into `tailwind.config.js` for NativeWind className support.

---

## 📱 Screens

### 🌟 Home / Feed Dashboard (`app/(tabs)/index.tsx`)
The centrepiece screen, showcasing the full design system in action:
- **Animated glowing orb** — pulsing scale + opacity using `withRepeat`/`withSequence`
- **Rotating dashed halo ring** — ambient 12s rotation via Reanimated
- **Secondary blue offset orb** — creates spatial depth
- **Gradient logo text** — "FeedFlow" rendered with `expo-linear-gradient` purple→blue
- **Status badge** — "AI-Powered Feed Curation" pill with purple tint
- **Stats row** — 10K+ Sources · 98% Accuracy · <1s Latency
- **Staggered entrance animations** — all elements use `FadeIn`/`FadeInDown` with progressive delays
- **Gradient CTA button** — with box shadow glow effect

### 🚪 Onboarding (`app/(auth)/index.tsx`)
- Rotating orbit ring background
- Animated logo mark with spring entrance
- Feature cards: AI Curation · Real-time · Automation
- Gradient "Create Account" and secondary "Sign In" buttons

### 📊 Analytics (`app/(tabs)/analytics.tsx`)
- Metric cards: Articles Read · Time Spent · Bookmarked · Automations
- Staggered spring-in animation for each card

### 👤 Profile (`app/(tabs)/profile.tsx`)
- Avatar with purple ring border
- "Pro Member" badge
- Grouped settings list (Account, Notifications, App, About)

---

## 🧠 State Management

Three Zustand stores, each independently subscribable:

```typescript
// Auth state
const { user, isAuthenticated, login, logout } = useAuthStore();

// Content preferences
const { selectedCategories, toggleCategory, displayLayout } = usePreferencesStore();

// Automation rules
const { rules, addRule, toggleRule, deleteRule } = useAutomationStore();
```

---

## ⚙️ Automation Engine

The `useAutomationStore` supports a full rules system:

| Trigger | Action |
|---|---|
| `keyword_match` | `bookmark` |
| `source_filter` | `share` |
| `sentiment` | `notify` |
| `trending` | `hide` |
| `scheduled` | `summarize` · `tag` |

Each rule tracks `runCount`, `lastRunAt`, and can be toggled on/off or reordered.

---

## 🔧 Configuration

### Babel (`babel.config.js`)
```js
presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]],
plugins: ['react-native-reanimated/plugin'], // MUST be last
```

### NativeWind Metro (`metro.config.js`)
```js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(config, { input: './global.css' });
```

### TypeScript Path Aliases (`tsconfig.json`)
```json
"@components/*": ["./components/*"],
"@constants/*": ["./constants/*"],
"@store/*":     ["./store/*"],
"@lib/*":       ["./lib/*"]
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone, **or** Android/iOS simulator

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your Supabase URL and anon key
```

### 3. Run
```bash
npx expo start
```

| Key | Action |
|---|---|
| `a` | Open on Android emulator |
| `i` | Open on iOS simulator (macOS only) |
| `w` | Open in browser (web) |
| Scan QR | Open in Expo Go on your phone |

---

## 🗺️ Roadmap

- [ ] Live RSS / API feed integration
- [ ] Supabase auth (email + OAuth)
- [ ] AI article summarization
- [ ] Push notifications via Expo
- [ ] Offline reading with AsyncStorage
- [ ] Article sharing sheet
- [ ] Full automation rule builder UI
- [ ] Dark / light theme toggle

---

## 📄 License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  Built with ❤️ for the Hackathon · Powered by Expo SDK 56
</p>
