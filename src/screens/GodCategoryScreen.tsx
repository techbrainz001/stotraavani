import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import godsData from '../data/gods.json';
import { GodCard } from '../types';
import PremiumHeader from '../components/ui/PremiumHeader';
import PageContainer from '../components/ui/PageContainer';
import SEO from '../components/SEO';

const GodCategoryScreen = () => {
  const navigate = useNavigate();
  const { godId } = useParams();
  const gods: GodCard[] = godsData;
  const selectedGod = gods.find(g => g.id === godId);

  if (!selectedGod) return <div>God not found</div>;

  return (
    <PageContainer>
      <SEO title={`${selectedGod.nameEn} | Stotraavani`} description={`Explore stotras, pujas, and mantras dedicated to ${selectedGod.nameEn} on Stotraavani.`} />
      <PremiumHeader
        showBack
        onBack={() => navigate('/home')}
        titleTe={selectedGod.nameTe}
        titleEn={selectedGod.nameEn}
      />

      <motion.div
        layoutId={`god-container-${selectedGod.id}`}
        className="god-banner-premium mandala-bg"
      >
        <motion.div
          layoutId={`god-icon-${selectedGod.id}`}
          className="banner-medallion-large"
          style={(selectedGod.icon.includes('.') || selectedGod.icon.startsWith('/')) ? {
            overflow: 'hidden',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: '0 auto 1.5rem',
            border: '3px solid rgba(184, 134, 11, 0.3)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          } : {}}
        >
          {(selectedGod.icon.includes('.') || selectedGod.icon.startsWith('/')) ? (
            <img 
              src={selectedGod.icon.startsWith('http') ? selectedGod.icon : `${import.meta.env.BASE_URL}${selectedGod.icon.startsWith('/') ? selectedGod.icon.slice(1) : selectedGod.icon}`} 
              alt={selectedGod.nameEn} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
            />
          ) : (
            selectedGod.icon
          )}
        </motion.div>
        <h2 className="banner-te-title">{selectedGod.nameTe}</h2>
      </motion.div>

      <div className="category-grid-premium">
        {(selectedGod.categories || []).map((cat, i) => (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={cat.id}
            className="category-button-premium"
            onClick={() => navigate(`/god/${godId}/${cat.id}`)}
            aria-label={`View ${cat.nameEn} category`}
          >
            <div className="cat-icon-dot" aria-hidden="true"></div>
            <div className="cat-text-container">
              <span className="cat-te">{cat.nameTe}</span>
              <span className="cat-en">{cat.nameEn}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </PageContainer>
  );
};

export default GodCategoryScreen;
