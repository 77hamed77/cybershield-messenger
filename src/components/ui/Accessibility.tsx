'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
    keyboardNavigation: true
  });

  const { t } = useLanguage();

  useEffect(() => {
    // Load accessibility settings from localStorage
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply accessibility settings
    const html = document.documentElement;
    
    // Font size
    html.classList.remove('font-small', 'font-medium', 'font-large');
    html.classList.add(`font-${settings.fontSize}`);
    
    // High contrast
    if (settings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    // Reduce motion
    if (settings.reduceMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

// Accessibility Context
import { createContext, useContext } from 'react';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// Accessibility Settings Modal
interface AccessibilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilitySettingsModal({ isOpen, onClose }: AccessibilitySettingsModalProps) {
  const { settings, updateSettings } = useAccessibility();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-surface rounded-xl p-6 max-w-md w-full shadow-professional-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">
                {t('accessibility.title')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
                aria-label={t('app.close')}
              >
                <span className="text-on-surface-variant">✕</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-on-surface mb-3">
                  {t('accessibility.fontSize')}
                </label>
                <div className="flex space-x-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateSettings({ fontSize: size })}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                        settings.fontSize === size
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface border-border text-on-surface hover:bg-surface-variant/50'
                      }`}
                    >
                      {t(`accessibility.fontSize${size.charAt(0).toUpperCase() + size.slice(1)}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-on-surface">
                    {t('accessibility.highContrast')}
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    {t('accessibility.highContrastDescription')}
                  </p>
                </div>
                <button
                  onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.highContrast ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-on-surface">
                    {t('accessibility.reduceMotion')}
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    {t('accessibility.reduceMotionDescription')}
                  </p>
                </div>
                <button
                  onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.reduceMotion ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reduceMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-on-surface">
                    {t('accessibility.keyboardNavigation')}
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    {t('accessibility.keyboardNavigationDescription')}
                  </p>
                </div>
                <button
                  onClick={() => updateSettings({ keyboardNavigation: !settings.keyboardNavigation })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.keyboardNavigation ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-on-surface-variant text-center">
                {t('accessibility.tip')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Focus Trap Hook
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
}

// Skip Link Component
export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50"
    >
      {children}
    </a>
  );
}

// Screen Reader Only Text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
