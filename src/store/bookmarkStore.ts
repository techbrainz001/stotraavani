import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Bookmark } from '@/types';
import { idbStorage } from './storage';

export interface BookmarkState {
  bookmarks: Bookmark[];
  toggleBookmark: (bookmark: Bookmark) => void;
  isBookmarked: (stotraId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (bookmark) => set((state) => {
        const exists = state.bookmarks.some(b => b.stotraId === bookmark.stotraId);
        if (exists) {
          return { bookmarks: state.bookmarks.filter(b => b.stotraId !== bookmark.stotraId) };
        }
        return { bookmarks: [...state.bookmarks, bookmark] };
      }),
      isBookmarked: (stotraId) => get().bookmarks.some(b => b.stotraId === stotraId),
    }),
    {
      name: 'bookmarks',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
