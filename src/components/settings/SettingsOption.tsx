'use client';

import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Bookmark, 
  Phone, 
  Globe, 
  Bell, 
  Lock, 
  HardDrive, 
  Palette 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SETTINGS_OPTIONS } from '@/lib/constants';

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

type SettingsOptionType = typeof SETTINGS_OPTIONS[number];

interface SettingsOptionProps {
  option: SettingsOptionType;
}

export default function SettingsOption({ option }: SettingsOptionProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the corresponding settings page
    router.push(`/main/settings${option.route}`);
  };

  // Function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    const iconProps = { size: 20 };
    
    switch (iconName) {
      case 'Bookmark':
        return <Bookmark {...iconProps} />;
      case 'Phone':
        return <Phone {...iconProps} />;
      case 'Globe':
        return <Globe {...iconProps} />;
      case 'Bell':
        return <Bell {...iconProps} />;
      case 'Lock':
        return <Lock {...iconProps} />;
      case 'HardDrive':
        return <HardDrive {...iconProps} />;
      case 'Palette':
        return <Palette {...iconProps} />;
      default:
        return <Bookmark {...iconProps} />;
    }
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
            <span className="text-on-surface font-medium">{option.label}</span>
            <span className="text-on-surface-variant text-sm">{option.description}</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-on-surface-variant" />
      </div>
    </motion.button>
  );
}
