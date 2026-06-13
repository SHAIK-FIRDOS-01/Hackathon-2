import { create } from 'zustand';

export type AutomationTrigger =
  | 'keyword_match'
  | 'source_filter'
  | 'sentiment'
  | 'trending'
  | 'scheduled';

export type AutomationAction =
  | 'bookmark'
  | 'share'
  | 'notify'
  | 'hide'
  | 'summarize'
  | 'tag';

export interface AutomationRule {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  triggerValue: string;
  action: AutomationAction;
  actionValue?: string;
  isActive: boolean;
  runCount: number;
  lastRunAt?: string;
  createdAt: string;
}

interface AutomationState {
  rules: AutomationRule[];
  isProcessing: boolean;

  // Actions
  addRule: (rule: Omit<AutomationRule, 'id' | 'runCount' | 'createdAt'>) => void;
  updateRule: (id: string, updates: Partial<AutomationRule>) => void;
  deleteRule: (id: string) => void;
  toggleRule: (id: string) => void;
  incrementRunCount: (id: string) => void;
  setProcessing: (processing: boolean) => void;
  reorderRules: (fromIndex: number, toIndex: number) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useAutomationStore = create<AutomationState>((set) => ({
  rules: [
    // Seed with an example rule
    {
      id: generateId(),
      name: 'Bookmark AI Articles',
      trigger: 'keyword_match',
      triggerValue: 'artificial intelligence',
      action: 'bookmark',
      isActive: true,
      runCount: 0,
      createdAt: new Date().toISOString(),
    },
  ],
  isProcessing: false,

  addRule: (rule) =>
    set((state) => ({
      rules: [
        ...state.rules,
        {
          ...rule,
          id: generateId(),
          runCount: 0,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  updateRule: (id, updates) =>
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === id ? { ...rule, ...updates } : rule
      ),
    })),

  deleteRule: (id) =>
    set((state) => ({
      rules: state.rules.filter((rule) => rule.id !== id),
    })),

  toggleRule: (id) =>
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      ),
    })),

  incrementRunCount: (id) =>
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === id
          ? { ...rule, runCount: rule.runCount + 1, lastRunAt: new Date().toISOString() }
          : rule
      ),
    })),

  setProcessing: (isProcessing) => set({ isProcessing }),

  reorderRules: (fromIndex, toIndex) =>
    set((state) => {
      const newRules = [...state.rules];
      const [removed] = newRules.splice(fromIndex, 1);
      newRules.splice(toIndex, 0, removed);
      return { rules: newRules };
    }),
}));
