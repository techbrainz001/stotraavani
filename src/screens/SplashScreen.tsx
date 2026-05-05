import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-screen mandala-bg">
      <div className="logo-outer divine-glow">
        <div className="logo-inner">
          <img src={`${import.meta.env.BASE_URL}icn.png`} alt="Stotraavani Logo" className="om-logo-img" />
        </div>
      </div>
      <h1 className="app-title-premium">Stotraavani</h1>
      <h2 className="app-title-te-premium">స్తోత్రావణి</h2>
      <p className="tagline-premium">Voice of Divine Hymns</p>
      <div className="splash-footer">
        <button
          className="premium-start-btn"
          onClick={() => navigate('/home')}
        >
          ENTER SHRINE
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
