import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchStotras } from '../services/searchService';
import { StotraRegistryItem } from '../types';
import PremiumHeader from '../components/ui/PremiumHeader';
import PageContainer from '../components/ui/PageContainer';

const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  try {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="search-highlight">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
};

const SearchScreen = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results: StotraRegistryItem[] = useMemo(() => searchStotras(debouncedQuery), [debouncedQuery]);

  return (
    <PageContainer>
      <PremiumHeader showBack>
        <div className="search-bar-container">
          <Search size={18} className="search-icon-inside" />
          <input
            autoFocus
            className="search-input"
            placeholder="Search stotras, mantras..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search stotras"
          />
        </div>
      </PremiumHeader>

      <div className="premium-list-content">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.titleEn}`}
              className="premium-list-item"
              onClick={() => navigate(`/god/${item.godId}/${item.category}/${item.id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/god/${item.godId}/${item.category}/${item.id}`)}
            >
              <div className="premium-item-num" aria-hidden="true">{index + 1}</div>
              <div className="premium-item-text">
                <div className="item-te-title">
                  <Highlight text={item.titleTe} highlight={debouncedQuery} />
                </div>
                <div className="item-en-subtitle">
                  <Highlight text={item.titleEn} highlight={debouncedQuery} />
                </div>
              </div>
            </div>
          ))
        ) : query ? (
          <div className="no-results" role="status">No stotras found for "{query}"</div>
        ) : (
          <div className="premium-empty-state">
            <div className="premium-empty-icon" aria-hidden="true">🔍</div>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Explore Divine Wisdom</p>
            <p style={{ opacity: 0.6 }}>Search across all deities and categories</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default SearchScreen;

