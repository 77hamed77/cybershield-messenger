'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';
import { ClientOnly } from './NoSSR';

export default function ThemeDebug() {
  const [theme, setTheme] = useState('dark');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const updateThemeInfo = () => {
      if (typeof window === 'undefined') return;
      
      const root = document.documentElement;
      const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
      const bgColor = getComputedStyle(root).getPropertyValue('--bg-primary');
      const textColor = getComputedStyle(root).getPropertyValue('--text-primary');
      
      setTheme(currentTheme);
      setBgColor(bgColor);
      setTextColor(textColor);
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      updateThemeInfo();
      
      // Update every 2 seconds to see changes
      const interval = setInterval(updateThemeInfo, 2000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Show debug panel after 3 seconds in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <ClientOnly>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
        {isMinimized ? (
          <motion.button
            onClick={() => setIsMinimized(false)}
            className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg p-2 shadow-professional hover:bg-surface transition-colors"
            title="Show Theme Debug"
          >
            <Eye size={16} className="text-on-surface-variant" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-professional-lg min-w-64"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-primary">Theme Debug</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-surface-variant/50 rounded transition-colors"
                  title="Minimize"
                >
                  <EyeOff size={14} className="text-on-surface-variant" />
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-surface-variant/50 rounded transition-colors"
                  title="Close"
                >
                  <X size={14} className="text-on-surface-variant" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Theme:</span>
                <span className="text-on-surface font-mono">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">BG:</span>
                <span className="text-on-surface font-mono">{bgColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Text:</span>
                <span className="text-on-surface font-mono">{textColor}</span>
              </div>
              
              <div className="border-t border-border pt-2 mt-2">
                <div className="text-on-surface-variant mb-1">CSS Variables:</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Primary:</span>
                    <span className="text-on-surface font-mono">
                      {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary') : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Accent:</span>
                    <span className="text-on-surface font-mono">
                      {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--accent') : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Border:</span>
                    <span className="text-on-surface font-mono">
                      {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--border') : '--'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        </motion.div>
      </AnimatePresence>
    </ClientOnly>
  );
}
