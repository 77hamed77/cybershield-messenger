'use client';

import { motion } from 'framer-motion';

interface TabButtonProps {
  label: string;
  active: boolean;
  badge?: number;
  icon?: string;
  color?: string;
  onClick: () => void;
}

export default function TabButton({ label, active, badge, icon, color, onClick }: TabButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-surface text-primary'
          : 'text-on-surface-variant hover:text-on-surface'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-2">
        {icon && (
          <span className="text-base">{icon}</span>
        )}
        <span>{label}</span>
        {badge !== undefined && badge > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs rounded-full px-1.5 py-0.5 min-w-[16px] text-center font-medium"
            style={{
              backgroundColor: color ? `${color}20` : 'var(--primary)',
              color: color || 'white'
            }}
          >
            {badge}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
