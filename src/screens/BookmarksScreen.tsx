import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarkStore } from '../store/bookmarkStore';
import PremiumHeader from '../components/ui/PremiumHeader';
import StotraListItem from '../components/ui/StotraListItem';
import PageContainer from '../components/ui/PageContainer';
import PremiumButton from '../components/ui/PremiumButton';

const BookmarksScreen = () => {
  const navigate = useNavigate();
  const { bookmarks } = useBookmarkStore();

  return (
    <PageContainer>
      <PremiumHeader 
        showBack 
        titleEn="SAVED STOTRAS" 
        titleTe="దాచుకున్న స్తోత్రాలు" 
      />
      
      <div className="premium-list-content">
        {bookmarks.length > 0 ? (
          <div className="bookmarks-list">
            {bookmarks.map((bookmark) => (
              <StotraListItem
                key={bookmark.stotraId}
                id={bookmark.stotraId}
                titleTe={bookmark.titleTe}
                titleEn={bookmark.titleEn}
                icon="🔖"
                onClick={() => navigate(`/god/${bookmark.godId}/${bookmark.category}/${bookmark.stotraId}`)}
              />
            ))}
          </div>
        ) : (
          <div className="premium-empty-state">
            <div className="premium-empty-icon" aria-hidden="true">🔖</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Saved Stotras</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your bookmarked stotras will appear here for quick access.</p>
            <PremiumButton onClick={() => navigate('/home')}>Start Exploring</PremiumButton>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default BookmarksScreen;
