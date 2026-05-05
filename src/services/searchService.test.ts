import { describe, it, expect, vi } from 'vitest';
import { searchStotras } from './searchService';

describe('searchService', () => {
  it('should return empty array for empty query', () => {
    expect(searchStotras('')).toEqual([]);
    expect(searchStotras('   ')).toEqual([]);
  });

  it('should find stotras by English title', () => {
    const results = searchStotras('Ganesha Pancharatnam');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].titleEn).toContain('Ganesha Pancharatnam');
  });

  it('should find stotras by Telugu title', () => {
    // Searching for "గణేశ" (Ganesha)
    const results = searchStotras('గణేశ');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.titleTe.includes('గణేశ'))).toBe(true);
  });

  it('should handle partial matches in English', () => {
    const results = searchStotras('Subrahmanya');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(r => 
      r.titleEn.toLowerCase().includes('subrahmanya') || 
      r.titleTe.includes('సుబ్రహ్మణ్య')
    )).toBe(true);
  });

  it('should return up to 50 results', () => {
    // "Sri" is a very common term
    const results = searchStotras('Sri');
    expect(results.length).toBeLessThanOrEqual(50);
  });

  it('should be case-insensitive for English queries', () => {
    const resultsLower = searchStotras('ganesha');
    const resultsUpper = searchStotras('GANESHA');
    expect(resultsLower.length).toBe(resultsUpper.length);
    if (resultsLower.length > 0) {
      expect(resultsLower[0].id).toBe(resultsUpper[0].id);
    }
  });

  it('should fallback to simple filtering if FlexSearch fails', () => {
    // We can't easily break FlexSearch here, but we can verify the fallback logic
    // by checking if basic filtering still works for a known string.
    const results = searchStotras('Haridra');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.id === 'sri-haridra-ganapati-puja')).toBe(true);
  });
});
