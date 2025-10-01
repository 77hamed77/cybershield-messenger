'use client';

import { motion } from 'framer-motion';
import { 
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * SettingsOption Component
 * 
 * A clickable option component for settings menu items.
 * Handles navigation to corresponding settings pages.
 * 
 * Features:
 * - Clickable settings option with hover animations
 * - Automatic navigation to corresponding route
 * - Color-coded icons and labels
 */

interface SettingsOption {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  description: string;
  color: string;
  route: string;
}

interface SettingsOptionProps {
  option: SettingsOption;
}

export default function SettingsOption({ option }: SettingsOptionProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the corresponding settings page
    router.push(`/main/settings${option.route}`);
  };

  // Function to get the appropriate icon component
  const getIconComponent = (IconComponent: React.ComponentType<{ size?: number }>) => {
    return <IconComponent size={20} />;
  };

  return (
    <motion.button
      onClick={handleClick}
      className="w-full p-4 text-left hover:bg-surface/30 transition-colors rounded-lg border border-border/50 hover:border-border"
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: `${option.color}20`, border: `2px solid ${option.color}40` }}
          >
            <div style={{ color: option.color }}>
              {getIconComponent(option.icon)}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-on-surface font-medium professional-body">{option.label}</span>
            <span className="text-on-surface-variant text-sm professional-body">{option.description}</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-on-surface-variant" />
      </div>
    </motion.button>
  );
}
