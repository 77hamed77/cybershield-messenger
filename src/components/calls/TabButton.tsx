'use client';

import { motion } from 'framer-motion';

interface TabButtonProps {
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}

export default function TabButton({ label, active, badge, onClick }: TabButtonProps) {
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
        <span>{label}</span>
        {badge && badge > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
          >
            {badge}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
