import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageContainer from '@/components/ui/PageContainer';
import PremiumHeader from '@/components/ui/PremiumHeader';

const AboutScreen = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <SEO
        title="About | Stotraavani"
        description="Learn about Stotraavani — a premium Progressive Web App for Hindu stotras and mantras."
      />
      <PremiumHeader
        showBack
        onBack={() => navigate(-1)}
        titleEn="ABOUT"
        titleTe="పరిచయం"
      />

      <div className="reading-scroll-area">
        <div
          className="reading-container-premium parchment-texture"
          style={{ padding: '2rem', textAlign: 'left', minHeight: '80vh', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
            <img
              src="/icn.png"
              alt="Stotraavani Logo"
              style={{ width: '120px', height: '120px', borderRadius: '24px', objectFit: 'cover', marginBottom: '1rem', border: '3px solid var(--accent)' }}
            />
            <h1 style={{ color: 'var(--primary)', marginBottom: '0.2rem', fontSize: '2rem', fontWeight: 800 }}>స్తోత్రావణి</h1>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--dark)', fontWeight: 700, marginBottom: '0.5rem' }}>Stotraavani</h2>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.1rem' }}>Voice of Divine Hymns</p>
          </div>

          <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-main)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Stotraavani is a premium collection of Hindu stotras, mantras, and religious texts meticulously
              curated to provide devotees with an ad-free, immersive, and spiritually enriching experience.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Our mission is to preserve and share the ancient wisdom of Sanatana Dharma through a beautifully
              designed, modern Progressive Web Application that works offline, ensuring your prayers are never interrupted.
            </p>

            <h3 style={{ color: 'var(--primary)', marginTop: '2.5rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--accent-light)', paddingBottom: '0.5rem', fontSize: '1.3rem' }}>
              Features
            </h3>
            <ul style={{ paddingLeft: '1.2rem', marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.8rem' }}><strong>Rich Collection:</strong> Hundreds of authentic stotras across multiple deities.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Multi-Language:</strong> Read in Telugu, English (IAST), Hindi, and Tamil.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Offline Support:</strong> Keep reading without an active internet connection.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Dark Mode:</strong> Comfortable reading at any time of the day or night.</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Bookmarks:</strong> Save your favourite stotras for quick access.</li>
            </ul>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--accent-light)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Version 1.0.0</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Developed with ❤️ for Sanatana Dharma</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AboutScreen;
