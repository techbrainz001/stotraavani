import FlexSearch from 'flexsearch';
import stotrasData from '../data/stotras.json';
import { StotraRegistryItem } from '../types';

// In some environments, FlexSearch might be an object containing Document
// In others, it might be the default export.
const Document = (FlexSearch as any).Document || (FlexSearch as any).default?.Document || FlexSearch;

// Initialize the FlexSearch Document index
// We index both English and Telugu titles
const index = new Document({
  document: {
    id: 'id',
    index: ['titleEn', 'titleTe'],
    store: true
  },
  tokenize: 'forward',
  resolution: 9,
  cache: true
});

// Build the index
const typedStotrasData = stotrasData as StotraRegistryItem[];
typedStotrasData.forEach((item: StotraRegistryItem) => {
  index.add(item);
});

/**
 * Searches across all stotras using FlexSearch
 * returns up to 50 high-quality matches
 */
export const searchStotras = (query: string): StotraRegistryItem[] => {
  if (!query.trim()) return [];

  try {
    // Search across multiple fields
    const results = index.search(query, {
      limit: 50,
      enrich: true,
      suggest: true
    });

    const flatResults: StotraRegistryItem[] = [];
    const seenIds = new Set<string>();

    // results is an array of objects: { field: string, result: (id[] | Enriched[]) }
    results.forEach((fieldResult: { field: string; result: Array<string | { id: string; doc: StotraRegistryItem }> }) => {
      const fieldItems = fieldResult.result || [];
      
      fieldItems.forEach((item) => {
        // Enriched results are { id, doc }, but sometimes it returns just IDs
        const docId = typeof item === 'object' ? item.id : item as string;
        
        if (!seenIds.has(docId)) {
          seenIds.add(docId);
          
          // Get original doc from result or from index storage
          const doc = (typeof item === 'object' && item.doc) ? item.doc : index.get(docId);
          
          if (doc) {
            flatResults.push(doc as StotraRegistryItem);
          }
        }
      });
    });

    return flatResults;
  } catch (error) {
    console.error('FlexSearch error:', error);
    
    // Fallback to simple filtering if FlexSearch fails
    const q = query.toLowerCase();
    return typedStotrasData.filter((s: StotraRegistryItem) => 
      s.titleEn.toLowerCase().includes(q) || 
      s.titleTe.includes(q)
    ).slice(0, 50);
  }
};
