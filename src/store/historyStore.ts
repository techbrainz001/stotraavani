import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { HistoryItem } from '@/types';
import { idbStorage } from './storage';

export type { HistoryItem };

export interface HistoryState {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (item) => set((state) => {
        const filtered = state.history.filter(h => h.stotraId !== item.stotraId);
        const newHistory = [{ ...item, timestamp: Date.now() }, ...filtered];
        return { history: newHistory.slice(0, 10) };
      }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'view_history',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
