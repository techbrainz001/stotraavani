import React, { createContext, useContext, useState, useEffect } from 'react';

export interface HistoryItem {
  godId: string;
  category: string;
  stotraId: string;
  titleEn: string;
  titleTe: string;
  timestamp: number;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('view_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('view_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, 'timestamp'>) => {
    setHistory(prev => {
      // Remove existing entry for the same stotra if it exists
      const filtered = prev.filter(h => h.stotraId !== item.stotraId);
      // Add new entry at the beginning
      const newHistory = [{ ...item, timestamp: Date.now() }, ...filtered];
      // Keep only top 10
      return newHistory.slice(0, 10);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
};
