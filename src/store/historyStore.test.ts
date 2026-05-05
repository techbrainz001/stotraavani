import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useHistoryStore } from './historyStore';

// Mock idb-keyval
vi.mock('idb-keyval', () => ({
  get: vi.fn(),
  set: vi.fn(),
  del: vi.fn(),
}));

describe('historyStore', () => {
  beforeEach(() => {
    useHistoryStore.setState({ history: [] });
  });

  const mockItem = {
    godId: 'ganesha',
    category: 'stotras',
    stotraId: 'ganesha-pancharatnam',
    titleEn: 'Ganesha Pancharatnam',
    titleTe: 'శ్రీ గణేశ పంచరత్నం'
  };

  it('should start with an empty history array', () => {
    expect(useHistoryStore.getState().history).toEqual([]);
  });

  it('should add an item to history', () => {
    useHistoryStore.getState().addToHistory(mockItem);
    const history = useHistoryStore.getState().history;
    expect(history).toHaveLength(1);
    expect(history[0].stotraId).toBe(mockItem.stotraId);
    expect(history[0].timestamp).toBeDefined();
  });

  it('should move existing item to the top when added again', () => {
    const item2 = { ...mockItem, stotraId: 'item-2' };
    
    useHistoryStore.getState().addToHistory(mockItem);
    useHistoryStore.getState().addToHistory(item2);
    
    // History should be [item2, mockItem]
    let history = useHistoryStore.getState().history;
    expect(history[0].stotraId).toBe('item-2');
    
    // Add mockItem again
    useHistoryStore.getState().addToHistory(mockItem);
    
    // History should be [mockItem, item2]
    history = useHistoryStore.getState().history;
    expect(history).toHaveLength(2);
    expect(history[0].stotraId).toBe(mockItem.stotraId);
  });

  it('should limit history to 10 items', () => {
    for (let i = 1; i <= 15; i++) {
      useHistoryStore.getState().addToHistory({
        ...mockItem,
        stotraId: `item-${i}`
      });
    }
    
    const history = useHistoryStore.getState().history;
    expect(history).toHaveLength(10);
    expect(history[0].stotraId).toBe('item-15');
    expect(history[9].stotraId).toBe('item-6');
  });

  it('should clear history', () => {
    useHistoryStore.getState().addToHistory(mockItem);
    expect(useHistoryStore.getState().history).toHaveLength(1);
    
    useHistoryStore.getState().clearHistory();
    expect(useHistoryStore.getState().history).toHaveLength(0);
  });
});
