'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  className?: string;
  tooltip?: string;
}

export default function IconButton({ 
  icon, 
  onClick, 
  size = 'md', 
  variant = 'ghost', 
  disabled = false,
  className = '',
  tooltip
}: IconButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-surface text-on-surface hover:bg-surface/80 focus:ring-primary/50',
    ghost: 'text-on-surface-variant hover:text-on-surface hover:bg-surface/50 focus:ring-primary/50'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

  const button = (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {icon}
    </motion.button>
  );

  if (tooltip) {
    return (
      <div title={tooltip}>
        {button}
      </div>
    );
  }

  return button;
}
