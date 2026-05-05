import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBookmarkStore } from './bookmarkStore';

// Mock idb-keyval since it won't work in jsdom/node
vi.mock('idb-keyval', () => ({
  get: vi.fn(),
  set: vi.fn(),
  del: vi.fn(),
}));

describe('bookmarkStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    // Note: Zustand persist might make this tricky, but for unit tests
    // we can manually reset the state.
    useBookmarkStore.setState({ bookmarks: [] });
  });

  const mockBookmark = {
    godId: 'ganesha',
    category: 'stotras',
    stotraId: 'ganesha-pancharatnam',
    titleEn: 'Ganesha Pancharatnam',
    titleTe: 'శ్రీ గణేశ పంచరత్నం'
  };

  it('should start with an empty bookmarks array', () => {
    const state = useBookmarkStore.getState();
    expect(state.bookmarks).toEqual([]);
  });

  it('should add a bookmark when toggleBookmark is called on a new item', () => {
    useBookmarkStore.getState().toggleBookmark(mockBookmark);
    const state = useBookmarkStore.getState();
    expect(state.bookmarks).toHaveLength(1);
    expect(state.bookmarks[0].stotraId).toBe(mockBookmark.stotraId);
  });

  it('should remove a bookmark when toggleBookmark is called on an existing item', () => {
    // Add it first
    useBookmarkStore.getState().toggleBookmark(mockBookmark);
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(1);

    // Toggle again to remove
    useBookmarkStore.getState().toggleBookmark(mockBookmark);
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(0);
  });

  it('should correctly report isBookmarked status', () => {
    expect(useBookmarkStore.getState().isBookmarked(mockBookmark.stotraId)).toBe(false);
    
    useBookmarkStore.getState().toggleBookmark(mockBookmark);
    expect(useBookmarkStore.getState().isBookmarked(mockBookmark.stotraId)).toBe(true);
  });

  it('should handle multiple unique bookmarks', () => {
    const bookmark2 = { ...mockBookmark, stotraId: 'other-id' };
    
    useBookmarkStore.getState().toggleBookmark(mockBookmark);
    useBookmarkStore.getState().toggleBookmark(bookmark2);
    
    const state = useBookmarkStore.getState();
    expect(state.bookmarks).toHaveLength(2);
    expect(state.bookmarks.some(b => b.stotraId === mockBookmark.stotraId)).toBe(true);
    expect(state.bookmarks.some(b => b.stotraId === bookmark2.stotraId)).toBe(true);
  });
});
