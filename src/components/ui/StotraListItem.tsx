import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import styles from './StotraListItem.module.css';

interface StotraListItemProps {
  id: string;
  titleTe: string | React.ReactNode;
  titleEn: string | React.ReactNode;
  index?: number | string;
  onClick: () => void;
  icon?: React.ReactNode;
  showArrow?: boolean;
  style?: React.CSSProperties;
  'data-index'?: number;
}

const StotraListItem = React.forwardRef<HTMLDivElement, StotraListItemProps>((
  { id: _id, titleTe, titleEn, index, onClick, icon, showArrow = true, style, 'data-index': dataIndex },
  ref
) => {
  return (
    <div
      ref={ref}
      data-index={dataIndex}
      style={style}
    >
      <div
        className={styles.item}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        role="button"
        tabIndex={0}
        aria-label={typeof titleEn === 'string' ? `Open ${titleEn}` : 'Open stotra'}
      >
        <div className={styles.number} aria-hidden="true">
          {icon || index || <Sparkles size={18} />}
        </div>
        <div className={styles.textContainer}>
          <div className={styles.titleTe}>{titleTe}</div>
          <div className={styles.titleEn}>{titleEn}</div>
        </div>
        {showArrow && (
          <div className={styles.arrow} aria-hidden="true">
            <ChevronRight size={20} />
          </div>
        )}
      </div>
    </div>
  );
});

StotraListItem.displayName = 'StotraListItem';

export default StotraListItem;
