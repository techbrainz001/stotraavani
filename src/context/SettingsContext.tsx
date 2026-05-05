import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings } from '../types';

type LanguageCode = 'te' | 'en' | 'hi' | 'ta';

interface SettingsContextType {
  settings: UserSettings;
  setDarkMode: (darkMode: boolean) => void;
  setFontSize: (fontSize: number | ((prev: number) => number)) => void;
  setLanguage: (lang: LanguageCode) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: UserSettings = {
  darkMode: false,
  fontSize: 20,
  language: 'te',
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('user_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('user_settings', JSON.stringify(settings));
  }, [settings]);

  const setDarkMode = (darkMode: boolean) => {
    setSettings(prev => ({ ...prev, darkMode }));
  };

  const setFontSize = (fontSize: number | ((prev: number) => number)) => {
    setSettings(prev => ({
      ...prev,
      fontSize: typeof fontSize === 'function' ? fontSize(prev.fontSize) : fontSize,
    }));
  };

  const setLanguage = (language: LanguageCode) => {
    setSettings(prev => ({ ...prev, language }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setDarkMode, setFontSize, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
