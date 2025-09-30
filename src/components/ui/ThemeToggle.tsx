'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { applyTheme, loadThemeSettings, saveThemeSettings, ThemeSettings } from '@/lib/theme-language';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ThemeToggle({ 
  className = '', 
  size = 'md', 
  showLabel = true 
}: ThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تحميل الثيم المحفوظ
    const settings = loadThemeSettings();
    setCurrentTheme(settings.theme);
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    setIsLoading(true);
    
    // تبديل الثيم
    const themes: Array<'dark' | 'light' | 'system'> = ['dark', 'light', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setCurrentTheme(nextTheme);
    
    // تطبيق الثيم الجديد
    const newSettings: ThemeSettings = {
      theme: nextTheme,
      fontSize: 'medium'
    };
    
    applyTheme(newSettings);
    saveThemeSettings(newSettings);
    
    setTimeout(() => setIsLoading(false), 300);
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <Sun size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
      case 'dark':
        return <Moon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
      case 'system':
        return <Monitor size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
      default:
        return <Sun size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
    }
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return 'System';
      default:
        return 'Theme';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-10 h-10';
    }
  };

  if (isLoading) {
    return (
      <div className={`${getSizeClasses()} rounded-lg bg-surface border border-border flex items-center justify-center ${className}`}>
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        ${getSizeClasses()} 
        rounded-lg 
        bg-surface 
        border 
        border-border 
        flex 
        items-center 
        justify-center 
        relative 
        overflow-hidden
        hover:bg-surface-variant 
        transition-all 
        duration-300
        group
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${currentTheme === 'dark' ? 'Light' : currentTheme === 'light' ? 'System' : 'Dark'} Mode`}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon Container */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-primary"
          >
            {getThemeIcon()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Theme Label */}
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-xs text-on-surface-variant bg-surface border border-border px-2 py-1 rounded shadow-lg">
            {getThemeLabel()}
          </span>
        </motion.div>
      )}
      
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: 'currentColor' }}
      />
    </motion.button>
  );
}
