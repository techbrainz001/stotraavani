import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PremiumButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClass = 'premium-action-btn';
  const variantClass = variant === 'primary' ? 'active' : '';
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PremiumButton;
