import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bookmark } from '../types';

interface BookmarkContextType {
  bookmarks: Bookmark[];
  toggleBookmark: (bookmark: Bookmark) => void;
  isBookmarked: (stotraId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (bookmark: Bookmark) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.stotraId === bookmark.stotraId);
      if (exists) {
        return prev.filter(b => b.stotraId !== bookmark.stotraId);
      }
      return [...prev, bookmark];
    });
  };

  const isBookmarked = (stotraId: string) => {
    return bookmarks.some(b => b.stotraId === stotraId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
};
