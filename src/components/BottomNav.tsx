import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bookmark, Share2, Check } from 'lucide-react';

interface BottomNavProps {
  isReaderMode?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

const BottomNav = ({ isReaderMode, isSaved, onToggleSave, onShare }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const activeTab = location.pathname.startsWith('/home') || location.pathname.startsWith('/god') ? 'home' :
                   location.pathname.startsWith('/bookmarks') ? 'bookmarks' :
                   location.pathname.startsWith('/search') ? 'search' : '';

  const handleAppShare = async () => {
    const text = `Stotraavani - Divine Wisdom at Your Fingertips. \n\nExplore a premium collection of stotras, pujas, and mantras.`;
    const url = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Stotraavani', text, url });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text + '\n' + url);
        // Brief visual feedback on the button without blocking alert
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        console.warn('Clipboard copy failed');
      }
    }
  };

  return (
    <nav className="premium-bottom-nav">
      <button 
        className={`premium-nav-item ${!isReaderMode && activeTab === 'home' ? 'active' : ''}`}
        onClick={() => navigate('/home')}
        aria-label="Home"
        aria-current={!isReaderMode && activeTab === 'home' ? 'page' : undefined}
      >
        <span className="premium-nav-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Home size={22} /></span>
        <span className="premium-nav-label">Home</span>
      </button>

      {isReaderMode ? (
        <button 
          className={`premium-nav-item ${isSaved ? 'active' : ''}`}
          onClick={onToggleSave}
          aria-label={isSaved ? "Saved" : "Save"}
        >
          <span className="premium-nav-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={22} fill={isSaved ? 'currentColor' : 'none'} />
          </span>
          <span className="premium-nav-label">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      ) : (
        <button 
          className={`premium-nav-item ${activeTab === 'bookmarks' ? 'active' : ''}`}
          onClick={() => navigate('/bookmarks')}
          aria-label="Saved Stotras"
          aria-current={activeTab === 'bookmarks' ? 'page' : undefined}
        >
          <span className="premium-nav-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={22} fill={activeTab === 'bookmarks' ? 'currentColor' : 'none'} />
          </span>
          <span className="premium-nav-label">Saved</span>
        </button>
      )}

      <button
        className="premium-nav-item"
        onClick={isReaderMode ? onShare : handleAppShare}
        aria-label={copied ? 'Link copied!' : 'Share'}
      >
        <span className="premium-nav-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {copied ? <Check size={22} /> : <Share2 size={22} />}
        </span>
        <span className="premium-nav-label">{copied ? 'Copied!' : 'Share'}</span>
      </button>
    </nav>
  );
};


export default BottomNav;
