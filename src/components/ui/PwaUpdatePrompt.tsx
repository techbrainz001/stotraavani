import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import styles from './PwaUpdatePrompt.module.css';

const PwaUpdatePrompt: React.FC = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={styles.toast}
        >
          <div className={styles.content}>
            <h4 className={styles.title}>Update Available</h4>
            <p className={styles.message}>A new version of Stotraavani is ready.</p>
          </div>

          <button
            className={styles.updateBtn}
            onClick={() => updateServiceWorker(true)}
            aria-label="Reload and update"
          >
            <RefreshCw size={20} />
          </button>

          <button
            className={styles.dismissBtn}
            onClick={() => setNeedRefresh(false)}
            aria-label="Dismiss update"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PwaUpdatePrompt;
