import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Languages,
  Minus,
  Plus
} from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { useHistoryStore } from '@/store/historyStore';
import { StotraContent, Language, GodCard } from '@/types';
import BottomNav from '@/components/BottomNav';
import SEO from '@/components/SEO';
import godsData from '@/data/gods.json';
import PageContainer from '@/components/ui/PageContainer';
import PremiumHeader from '@/components/ui/PremiumHeader';
import PremiumButton from '@/components/ui/PremiumButton';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const DivineDivider = () => (
  <div className="divine-divider-svg">
    <svg width="100%" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20C40 20 60 5 100 20C140 35 160 20 200 20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="100" cy="20" r="5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      <path d="M88 20L100 8L112 20L100 32L88 20Z" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

const ContentScreen = () => {
  const navigate = useNavigate();
  const { godId, category, stotraId } = useParams();
  const { settings, setDarkMode, setFontSize, setLanguage } = useSettingsStore();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const { addToHistory } = useHistoryStore();

  const [stotraContent, setStotraContent] = useState<StotraContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLElement>(null);

  const god = (godsData as GodCard[]).find(g => g.id === godId);
  const currentCategory = god?.categories?.find(c => c.id === category);

  const isSaved = stotraId ? isBookmarked(stotraId) : false;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      if (!container) return;
      const totalHeight = container.scrollHeight - container.clientHeight;
      const progress = (container.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [loading]);

  const handleBack = () => {
    const backCategory = category || 'stotras';
    navigate(`/god/${godId}/${backCategory}`);
  };

  const fetchContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const module = await import(`../data/content/${godId}/${stotraId}.json`);
      const data = module.default;

      if (!data || !data.title || !data.verses) {
        console.error("Invalid stotra content format:", data);
        setError(true);
      } else {
        setStotraContent(data);
      }
    } catch (err) {
      console.error("Critical error fetching stotra content:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (godId && stotraId) {
      fetchContent();
    }
  }, [stotraId, godId]);

  useEffect(() => {
    if (stotraContent && stotraId && godId && category) {
      addToHistory({
        godId: godId || '',
        category: category || '',
        stotraId,
        titleEn: stotraContent.title.en,
        titleTe: stotraContent.title.te,
      });
    }
  }, [stotraContent, stotraId, godId, category, addToHistory]);

  const handleToggleBookmark = () => {
    if (stotraId && stotraContent) {
      toggleBookmark({
        godId: godId || '',
        category: category || '',
        stotraId,
        titleEn: stotraContent.title.en,
        titleTe: stotraContent.title.te,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share && stotraContent) {
      navigator.share({
        title: `${stotraContent.title[settings.language] || stotraContent.title.te} | Stotraavani`,
        url: window.location.href
      }).catch(err => console.error("Error sharing:", err));
    }
  };

  const languages: { code: Language; name: string; native: string }[] = [
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'en', name: 'English', native: 'IAST' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
  ];

  if (loading) return <SkeletonLoader type="content" />;

  if (error || !stotraContent) return (
    <PageContainer showBottomNav={false} className="content-screen-premium flex-center p-20">
      <div className="premium-empty-state" role="alert" style={{ textAlign: 'center' }}>
        <div className="premium-empty-icon" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🕉️</div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 800 }}>Divine Content Loading</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '300px' }}>
          This stotra is currently being prepared for our library. Please check back soon or try another one.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <PremiumButton onClick={handleBack}>Explore Others</PremiumButton>
        </div>
      </div>
    </PageContainer>
  );

  const currentLangName = languages.find(l => l.code === settings.language)?.name || 'Telugu';

  return (
    <PageContainer showBottomNav={false} className="content-screen-premium">
      <SEO 
        title={stotraContent ? `${stotraContent.title.en} | Stotraavani` : 'Stotraavani'} 
        description={stotraContent ? `Read ${stotraContent.title.en} in ${currentLangName} and explore a premium collection of divine stotras on Stotraavani.` : undefined}
      />
      <PremiumHeader 
        showBack 
        onBack={handleBack}
        className="reader-header"
        actions={
          <div className="premium-reader-controls" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10001 }}>
            <div className="lang-toggle-container">
              <button
                className="ctrl-btn lang-btn"
                onClick={() => setShowLangMenu(!showLangMenu)}
                aria-label="Change language"
                aria-expanded={showLangMenu}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Languages size={20} />
                {languages.find(l => l.code === settings.language)?.native[0]}
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="lang-dropdown shadow-divine"
                    role="menu"
                    style={{ zIndex: 10002 }}
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        className={`lang-option ${settings.language === lang.code ? 'active' : ''}`}
                        onClick={() => { setLanguage(lang.code as Language); setShowLangMenu(false); }}
                        role="menuitem"
                      >
                        <span className="lang-native">{lang.native}</span>
                        <span className="lang-name">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="ctrl-btn"
              onClick={() => setDarkMode(!settings.darkMode)}
              aria-label="Toggle dark mode"
            >
              {settings.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="font-controls">
              <button className="font-btn" onClick={() => setFontSize(Math.max(14, settings.fontSize - 2))} aria-label="Decrease font size">
                <Minus size={18} />
              </button>
              <span className="font-indicator" aria-hidden="true">A</span>
              <button className="font-btn" onClick={() => setFontSize(Math.min(32, settings.fontSize + 2))} aria-label="Increase font size">
                <Plus size={18} />
              </button>
            </div>
          </div>
        }
      >
        <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
        
        <div
          className="bar-title-premium mini clickable"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            cursor: 'pointer', 
            minWidth: 0, 
            padding: '0 0.5rem',
            flex: 1,
            marginLeft: '0.5rem'
          }}
          onClick={() => navigate(`/god/${godId}`)}
        >
          <span style={{ fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{god?.nameEn}</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{currentCategory?.nameEn || category}</span>
        </div>
      </PremiumHeader>

      <main className="reading-scroll-area" ref={scrollContainerRef}>
        <article className="reading-container-premium parchment-texture pb-110" style={{ fontSize: `${settings.fontSize}px` }}>
          <DivineDivider />
          <h2 className="stotra-content-title" style={{ color: 'var(--primary)' }}>{stotraContent.title[settings.language]}</h2>

          <div className="verses-container">
            {(stotraContent.verses[settings.language] || []).map((verse, i) => (
              <p key={i} className="stotra-verse" style={{ marginBottom: '2.5rem' }}>{verse}</p>
            ))}
          </div>

          {stotraContent.mangalam && (
            <div className="mangalam-section" style={{ textAlign: 'center', marginTop: '4rem' }}>
              <DivineDivider />
              <div
                className="mangalam"
                style={{
                  fontWeight: 800,
                  color: 'var(--primary)',
                  marginTop: '1.5rem',
                  fontSize: '1.25em'
                }}
              >
                {stotraContent.mangalam[settings.language] || stotraContent.mangalam['te']}
              </div>
            </div>
          )}
        </article>
      </main>

      <BottomNav
        isReaderMode
        isSaved={isSaved}
        onToggleSave={handleToggleBookmark}
        onShare={handleShare}
      />
    </PageContainer>
  );
};

export default ContentScreen;
