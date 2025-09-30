'use client';

import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Switch({ 
  checked, 
  onChange, 
  label, 
  disabled = false, 
  size = 'md', 
  className = '' 
}: SwitchProps) {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-12 h-6',
    lg: 'w-16 h-8'
  };
  
  const thumbSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <motion.div
          className={`
            relative inline-flex items-center rounded-full transition-colors
            ${sizeClasses[size]}
            ${checked ? 'bg-primary' : 'bg-input'}
          `}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
          <motion.div
            className={`
              ${thumbSizeClasses[size]} bg-white rounded-full shadow-sm
            `}
            animate={{ x: checked ? (size === 'sm' ? 16 : size === 'md' ? 24 : 32) : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>
      {label && (
        <span className="text-on-surface text-sm">{label}</span>
      )}
    </label>
  );
}
