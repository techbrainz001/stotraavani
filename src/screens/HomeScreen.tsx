import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import godsData from '@/data/gods.json';
import { GodCard } from '@/types';
import SEO from '@/components/SEO';
import { useHistoryStore } from '@/store/historyStore';
import styles from './HomeScreen.module.css';
import { Info, Smartphone, BookOpen, Search, X, Clock } from 'lucide-react';
import PageContainer from '@/components/ui/PageContainer';
import PremiumHeader from '@/components/ui/PremiumHeader';
import GodListItem from '@/components/ui/GodListItem';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { history } = useHistoryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const gods: GodCard[] = godsData;

  const filteredGods = useMemo(() => {
    return gods.filter(god =>
      god.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      god.nameTe.includes(searchQuery)
    );
  }, [searchQuery, gods]);

  return (
    <PageContainer>
      <SEO title="Home | Stotraavani" />
      <PremiumHeader
        className={isSearching ? styles.headerSearchActive : ''}
        actions={
          !isSearching ? (
            <button
              className="icon-btn-premium"
              onClick={() => setIsSearching(true)}
              aria-label="Toggle search"
            >
              <Search size={22} color="var(--primary)" strokeWidth={2} />
            </button>
          ) : searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="icon-btn-premium"
              style={{ width: '32px', height: '32px' }}
              aria-label="Clear search"
            >
              <X size={18} color="var(--primary)" />
            </button>
          ) : null
        }
      >
        {!isSearching ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div className={styles.brandLogo} aria-hidden="true">
              <img src="icn.png" alt="Stotraavani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className={styles.barTitle}>Stotraavani - స్తోత్రావణి</div>
          </div>
        ) : (
          <div className="search-bar-container" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <button
              className="icon-btn-premium"
              onClick={() => { setIsSearching(false); setSearchQuery(''); }}
              aria-label="Close search"
              style={{ marginRight: '0.5rem' }}
            >
              ←
            </button>
            <input
              autoFocus
              className="search-input"
              placeholder="Search Deity / దైవం..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search deities"
              style={{ flex: 1 }}
            />
          </div>
        )}
      </PremiumHeader>

      <div className={styles.mainContent}>
        {!isSearching && (
          <div className={styles.horizontalLinks}>
            {[
              { label: 'About', icon: <img src="about.png" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />, path: '/about' },
              { label: 'Apps', icon: <img src="apps.png" alt="Apps" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />, url: 'https://play.google.com/store/apps/dev?id=5892278135973009320&hl=en_IN' },
              { label: 'Books', icon: <img src="books.png" alt="Books" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />, url: 'https://www.amazon.in/s?i=digital-text&rh=p_27%3ASuguna%2BChakravarthy&s=relevancerank&text=Suguna+Chakravarthy&ref=dp_byline_sr_ebooks_1' },
              { label: 'YouTube', icon: <img src="youtube.png" alt="YouTube" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />, url: 'https://www.youtube.com/@stotraavani' },
              { label: 'FaceBook', icon: <img src="facebook.png" alt="Facebook" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />, url: 'https://www.facebook.com/stotraavani' }
            ].map((item) => (
              <div
                key={item.label}
                className={styles.linkCard}
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.label}`}
                onClick={() => {
                  if (item.path) navigate(item.path);
                  else if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
                }}
              >
                <div className={styles.linkIconBg} aria-hidden="true">{item.icon}</div>
                <span className={styles.linkLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {!isSearching && history.length > 0 && (
          <div className="recent-section-premium">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.2rem', fontWeight: 800 }}>Recently Viewed</h2>
            </div>
            <div className="recent-scroll-premium">
              {history.map((item) => (
                <div
                  key={item.stotraId}
                  className="recent-card-premium"
                  onClick={() => navigate(`/god/${item.godId}/${item.category}/${item.stotraId}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/god/${item.godId}/${item.category}/${item.stotraId}`)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Continue reading ${item.titleEn}`}
                >
                  <div className="recent-icon" aria-hidden="true">
                    <Clock size={16} color="var(--primary)" />
                  </div>
                  <div className="recent-info">
                    <span className="recent-te">{item.titleTe}</span>
                    <span className="recent-en">{item.titleEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Select Deity</h2>
          <span className={styles.countPill} aria-label={`${filteredGods.length} deities found`}>{filteredGods.length}</span>
        </div>

        <div className={styles.godList}>
          {filteredGods.map((god) => (
            <GodListItem
              key={god.id}
              id={god.id}
              nameTe={god.nameTe}
              nameEn={god.nameEn}
              icon={god.icon}
              onClick={() => navigate(`/god/${god.id}`)}
            />
          ))}
          {filteredGods.length === 0 && (
            <div className="no-results" role="status">No Deities found matching your search.</div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default HomeScreen;
