import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserSettings, Language } from '@/types';
import { idbStorage } from './storage';

export interface SettingsState {
  settings: UserSettings;
  setDarkMode: (darkMode: boolean) => void;
  setFontSize: (fontSize: number | ((prev: number) => number)) => void;
  setLanguage: (lang: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        darkMode: false,
        fontSize: 20,
        language: 'te' as Language,
      },
      setDarkMode: (darkMode) => set((state) => ({ settings: { ...state.settings, darkMode } })),
      setFontSize: (fontSize) => set((state) => ({ 
        settings: {
          ...state.settings,
          fontSize: typeof fontSize === 'function' ? fontSize(state.settings.fontSize) : fontSize 
        }
      })),
      setLanguage: (language) => set((state) => ({ settings: { ...state.settings, language } })),
    }),
    {
      name: 'user_settings',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
