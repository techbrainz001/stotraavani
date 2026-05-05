import React from 'react';
import styles from './SkeletonLoader.module.css';

export type SkeletonType = 'splash' | 'home' | 'list' | 'grid' | 'content';

interface SkeletonLoaderProps {
  type: SkeletonType;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  if (type === 'splash') {
    return (
      <div className={`${styles.container} ${styles.splash}`}>
        <div className={`${styles.pulseLogo} ${styles.shimmer}`} />
      </div>
    );
  }

  if (type === 'home') {
    return (
      <div className={`${styles.container} ${styles.padded}`}>
        <div className={`${styles.header} ${styles.shimmer}`} style={{ marginTop: '20px' }} />
        <div className={styles.horizontalScroll}>
          <div className={`${styles.card} ${styles.shimmer}`} />
          <div className={`${styles.card} ${styles.shimmer}`} />
          <div className={`${styles.card} ${styles.shimmer}`} />
        </div>
        <div className={`${styles.header} ${styles.shimmer}`} style={{ marginTop: '20px' }} />
        <div className={styles.grid}>
          <div className={`${styles.gridItem} ${styles.shimmer}`} />
          <div className={`${styles.gridItem} ${styles.shimmer}`} />
          <div className={`${styles.gridItem} ${styles.shimmer}`} />
          <div className={`${styles.gridItem} ${styles.shimmer}`} />
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className={`${styles.container} ${styles.padded}`}>
        <div className={`${styles.header} ${styles.shimmer}`} style={{ alignSelf: 'center', height: '100px', width: '100px', borderRadius: '50%', margin: '20px 0' }} />
        <div className={styles.grid}>
          <div className={`${styles.gridItem} ${styles.shimmer}`} style={{ height: '60px' }} />
          <div className={`${styles.gridItem} ${styles.shimmer}`} style={{ height: '60px' }} />
          <div className={`${styles.gridItem} ${styles.shimmer}`} style={{ height: '60px' }} />
          <div className={`${styles.gridItem} ${styles.shimmer}`} style={{ height: '60px' }} />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`${styles.container} ${styles.padded}`}>
        <div className={`${styles.header} ${styles.shimmer}`} style={{ marginTop: '20px' }} />
        <div className={`${styles.listItem} ${styles.shimmer}`} />
        <div className={`${styles.listItem} ${styles.shimmer}`} />
        <div className={`${styles.listItem} ${styles.shimmer}`} />
        <div className={`${styles.listItem} ${styles.shimmer}`} />
        <div className={`${styles.listItem} ${styles.shimmer}`} />
      </div>
    );
  }

  if (type === 'content') {
    return (
      <div className={`${styles.container} ${styles.contentContainer}`}>
        <div className={`${styles.header} ${styles.shimmer}`} style={{ alignSelf: 'center', width: '60%', height: '40px', marginBottom: '2rem' }} />
        
        <div className={`${styles.textLine} ${styles.shimmer}`} />
        <div className={`${styles.textLine} ${styles.shimmer} ${styles.textLineMedium}`} />
        <br />
        <div className={`${styles.textLine} ${styles.shimmer}`} />
        <div className={`${styles.textLine} ${styles.shimmer} ${styles.textLineShort}`} />
        
        <div className={`${styles.divider} ${styles.shimmer}`} />
        
        <div className={`${styles.textLine} ${styles.shimmer}`} />
        <div className={`${styles.textLine} ${styles.shimmer} ${styles.textLineMedium}`} />
        <br />
        <div className={`${styles.textLine} ${styles.shimmer}`} />
        <div className={`${styles.textLine} ${styles.shimmer} ${styles.textLineShort}`} />
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
