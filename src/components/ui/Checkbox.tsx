'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({ 
  checked, 
  onChange, 
  label, 
  disabled = false, 
  className = '' 
}: CheckboxProps) {
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
            w-5 h-5 border-2 rounded transition-colors
            ${checked ? 'bg-primary border-primary' : 'border-border bg-input'}
          `}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
            >
              <Check size={12} className="text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && (
        <span className="text-on-surface text-sm">{label}</span>
      )}
    </label>
  );
}
