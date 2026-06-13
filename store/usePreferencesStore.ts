import { create } from 'zustand';

export type ContentCategory =
  | 'technology'
  | 'science'
  | 'business'
  | 'design'
  | 'ai'
  | 'startups'
  | 'health'
  | 'sports'
  | 'entertainment'
  | 'politics';

export type RefreshInterval = '15min' | '30min' | '1hour' | '6hour' | 'manual';

export type DisplayLayout = 'card' | 'compact' | 'magazine';

interface PreferencesState {
  // Content
  selectedCategories: ContentCategory[];
  blockedDomains: string[];
  keywords: string[];
  blockedKeywords: string[];

  // Feed
  refreshInterval: RefreshInterval;
  articlesPerPage: number;
  displayLayout: DisplayLayout;

  // Appearance
  showImages: boolean;
  showSummaries: boolean;
  autoMarkRead: boolean;

  // Actions
  toggleCategory: (category: ContentCategory) => void;
  setRefreshInterval: (interval: RefreshInterval) => void;
  setDisplayLayout: (layout: DisplayLayout) => void;
  addBlockedDomain: (domain: string) => void;
  removeBlockedDomain: (domain: string) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  addBlockedKeyword: (keyword: string) => void;
  removeBlockedKeyword: (keyword: string) => void;
  setShowImages: (show: boolean) => void;
  setShowSummaries: (show: boolean) => void;
  setAutoMarkRead: (auto: boolean) => void;
  resetPreferences: () => void;
}

const defaultPreferences: Omit<
  PreferencesState,
  | 'toggleCategory'
  | 'setRefreshInterval'
  | 'setDisplayLayout'
  | 'addBlockedDomain'
  | 'removeBlockedDomain'
  | 'addKeyword'
  | 'removeKeyword'
  | 'addBlockedKeyword'
  | 'removeBlockedKeyword'
  | 'setShowImages'
  | 'setShowSummaries'
  | 'setAutoMarkRead'
  | 'resetPreferences'
> = {
  selectedCategories: ['technology', 'ai', 'science'],
  blockedDomains: [],
  keywords: [],
  blockedKeywords: [],
  refreshInterval: '30min',
  articlesPerPage: 20,
  displayLayout: 'card',
  showImages: true,
  showSummaries: true,
  autoMarkRead: true,
};

export const usePreferencesStore = create<PreferencesState>((set) => ({
  ...defaultPreferences,

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  setRefreshInterval: (refreshInterval) => set({ refreshInterval }),

  setDisplayLayout: (displayLayout) => set({ displayLayout }),

  addBlockedDomain: (domain) =>
    set((state) => ({
      blockedDomains: state.blockedDomains.includes(domain)
        ? state.blockedDomains
        : [...state.blockedDomains, domain],
    })),

  removeBlockedDomain: (domain) =>
    set((state) => ({
      blockedDomains: state.blockedDomains.filter((d) => d !== domain),
    })),

  addKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.includes(keyword)
        ? state.keywords
        : [...state.keywords, keyword],
    })),

  removeKeyword: (keyword) =>
    set((state) => ({ keywords: state.keywords.filter((k) => k !== keyword) })),

  addBlockedKeyword: (keyword) =>
    set((state) => ({
      blockedKeywords: state.blockedKeywords.includes(keyword)
        ? state.blockedKeywords
        : [...state.blockedKeywords, keyword],
    })),

  removeBlockedKeyword: (keyword) =>
    set((state) => ({
      blockedKeywords: state.blockedKeywords.filter((k) => k !== keyword),
    })),

  setShowImages: (showImages) => set({ showImages }),
  setShowSummaries: (showSummaries) => set({ showSummaries }),
  setAutoMarkRead: (autoMarkRead) => set({ autoMarkRead }),

  resetPreferences: () => set(defaultPreferences),
}));
