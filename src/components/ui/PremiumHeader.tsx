import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PremiumHeaderProps {
  titleTe?: string;
  titleEn?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({
  titleTe,
  titleEn,
  showBack = false,
  onBack,
  actions,
  children,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const hasTitle = titleTe || titleEn;

  return (
    <header className={`premium-app-bar fixed shadow glass ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
      <div className="header-left-group" style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
        gap: '0.8rem'
      }}>
        {showBack && (
          <button
            className="icon-btn-premium"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        <div className="header-title-content" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          flex: 1,
          overflow: 'hidden'
        }}>
          {hasTitle && (
            <div className="bar-title-premium" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', minWidth: 0 }}>
              {titleTe && <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{titleTe}</span>}
              {titleEn && <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{titleEn}</span>}
            </div>
          )}

          {/* If children exist (like on HomeScreen), they go here */}
          {!hasTitle && children}
        </div>
      </div>

      {(actions || (hasTitle && children)) && (
        <div className="header-right-actions" style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          {actions}
          {hasTitle && children}
        </div>
      )}
    </header>
  );
};

export default PremiumHeader;
