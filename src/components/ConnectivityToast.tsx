import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

const ConnectivityToast = () => {
  const isOnline = useOnlineStatus();
  const [show, setShow] = useState(false);
  const [lastStatus, setLastStatus] = useState(isOnline);

  useEffect(() => {
    if (isOnline !== lastStatus) {
      setShow(true);
      setLastStatus(isOnline);
      
      const timer = setTimeout(() => {
        if (isOnline) setShow(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, lastStatus]);

  return (
    <AnimatePresence>
      {(show || !isOnline) && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            translateX: '-50%',
            zIndex: 9999,
            padding: '0.8rem 1.5rem',
            borderRadius: '30px',
            background: isOnline ? '#27ae60' : '#e74c3c',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            fontWeight: 600,
            fontSize: '0.9rem',
            pointerEvents: 'none',
          }}
        >
          {isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
          {isOnline ? 'Online - Divine connection restored' : 'Offline - Using cached wisdom'}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectivityToast;
