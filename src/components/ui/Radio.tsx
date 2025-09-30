'use client';

import { motion } from 'framer-motion';

interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function Radio({ 
  checked, 
  onChange, 
  label, 
  disabled = false, 
  className = '' 
}: RadioProps) {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="radio"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <motion.div
          className={`
            w-5 h-5 border-2 rounded-full transition-colors
            ${checked ? 'border-primary' : 'border-border bg-input'}
          `}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 bg-primary rounded-full mx-auto mt-1"
            />
          )}
        </motion.div>
      </div>
      {label && (
        <span className="text-on-surface text-sm">{label}</span>
      )}
    </label>
  );
}
