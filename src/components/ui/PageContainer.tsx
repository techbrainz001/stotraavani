import React from 'react';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../store/settingsStore';
import BottomNav from '../BottomNav';

interface PageContainerProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  showBottomNav = true,
  className = '' 
}) => {
  const { settings } = useSettingsStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`screen-container pb-110 ${settings.darkMode ? 'dark' : ''} ${className}`}
    >
      {children}
      {showBottomNav && <BottomNav />}
    </motion.div>
  );
};

export default PageContainer;
