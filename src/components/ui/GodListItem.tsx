import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import styles from './GodListItem.module.css';

interface GodListItemProps {
  id: string;
  nameTe: string;
  nameEn: string;
  icon: string;
  onClick: () => void;
  className?: string;
}

const GodListItem: React.FC<GodListItemProps> = ({
  id,
  nameTe,
  nameEn,
  icon,
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      layoutId={`god-container-${id}`}
      className={`god-item-premium ${styles.container} ${className}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`View categories for ${nameEn}`}
    >
      {/* Subtle background decoration */}
      <div className={styles.backgroundDecoration}>
        {!icon.startsWith('/') && icon}
      </div>

      <motion.div
        layoutId={`god-icon-${id}`}
        className={`god-medallion-premium ${styles.medallion} ${icon.startsWith('/') ? styles.medallionImage : styles.medallionIcon}`}
        aria-hidden="true"
      >
        {icon.startsWith('/') ? (
          <img src={icon} alt="" className={styles.medallionImgTag} />
        ) : (
          <span className={styles.medallionSpanTag}>{icon}</span>
        )}
      </motion.div>

      <div className={styles.textContainer}>
        <span className={styles.nameTe}>
          {nameTe}
        </span>
        <span className={styles.nameEn}>
          {nameEn}
        </span>
      </div>

      <div
        className={`nav-arrow-divine ${styles.navArrow}`}
        aria-hidden="true"
      >
        <ChevronRight size={20} />
      </div>
    </motion.div>
  );
};

export default GodListItem;
