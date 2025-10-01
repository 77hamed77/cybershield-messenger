'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
  category: 'navigation' | 'actions' | 'general';
}

interface KeyboardShortcutsProps {
  onClose?: () => void;
  className?: string;
}

export default function KeyboardShortcuts({ onClose, className = "" }: KeyboardShortcutsProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const shortcuts: Shortcut[] = [
    // Navigation
    {
      key: 'Ctrl + 1',
      description: t('shortcuts.navigateChats'),
      action: () => router.push('/main'),
      category: 'navigation'
    },
    {
      key: 'Ctrl + 2',
      description: t('shortcuts.navigateCalls'),
      action: () => router.push('/main/calls'),
      category: 'navigation'
    },
    {
      key: 'Ctrl + 3',
      description: t('shortcuts.navigateContacts'),
      action: () => router.push('/main/contacts'),
      category: 'navigation'
    },
    {
      key: 'Ctrl + 4',
      description: t('shortcuts.navigateSettings'),
      action: () => router.push('/main/settings'),
      category: 'navigation'
    },
    // Actions
    {
      key: 'Ctrl + N',
      description: t('shortcuts.newChat'),
      action: () => {
        // Add new chat logic
        console.log('New chat');
      },
      category: 'actions'
    },
    {
      key: 'Ctrl + F',
      description: t('shortcuts.search'),
      action: () => {
        // Focus search input
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      },
      category: 'actions'
    },
    {
      key: 'Ctrl + K',
      description: t('shortcuts.quickActions'),
      action: () => {
        // Show quick actions menu
        console.log('Quick actions');
      },
      category: 'actions'
    },
    // General
    {
      key: 'Ctrl + /',
      description: t('shortcuts.showShortcuts'),
      action: () => setShowModal(true),
      category: 'general'
    },
    {
      key: 'Escape',
      description: t('shortcuts.closeModal'),
      action: () => {
        setShowModal(false);
        onClose?.();
      },
      category: 'general'
    },
    {
      key: 'Ctrl + D',
      description: t('shortcuts.toggleTheme'),
      action: () => {
        // Toggle theme logic
        console.log('Toggle theme');
      },
      category: 'general'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + / to show shortcuts
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        setShowModal(true);
      }

      // Escape to close modal
      if (event.key === 'Escape' && showModal) {
        setShowModal(false);
        onClose?.();
      }

      // Navigation shortcuts
      if (event.ctrlKey && !event.shiftKey && !event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            router.push('/main');
            break;
          case '2':
            event.preventDefault();
            router.push('/main/calls');
            break;
          case '3':
            event.preventDefault();
            router.push('/main/contacts');
            break;
          case '4':
            event.preventDefault();
            router.push('/main/settings');
            break;
          case 'n':
            event.preventDefault();
            // New chat logic
            console.log('New chat');
            break;
          case 'f':
            event.preventDefault();
            // Focus search input
            const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
            searchInput?.focus();
            break;
          case 'k':
            event.preventDefault();
            // Quick actions
            console.log('Quick actions');
            break;
          case 'd':
            event.preventDefault();
            // Toggle theme
            console.log('Toggle theme');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router, showModal, onClose]);

  const getCategoryIcon = (category: Shortcut['category']) => {
    switch (category) {
      case 'navigation':
        return '🧭';
      case 'actions':
        return '⚡';
      case 'general':
        return '⚙️';
      default:
        return '🔧';
    }
  };

  const getCategoryTitle = (category: Shortcut['category']) => {
    switch (category) {
      case 'navigation':
        return t('shortcuts.navigation');
      case 'actions':
        return t('shortcuts.actions');
      case 'general':
        return t('shortcuts.general');
      default:
        return t('shortcuts.other');
    }
  };

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<Shortcut['category'], Shortcut[]>);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowModal(false);
              onClose?.();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-professional-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">
                  {t('shortcuts.title')}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    onClose?.();
                  }}
                  className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors"
                >
                  <span className="text-on-surface-variant">✕</span>
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
                  <div key={category}>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg">{getCategoryIcon(category as Shortcut['category'])}</span>
                      <h3 className="text-lg font-medium text-on-surface">
                        {getCategoryTitle(category as Shortcut['category'])}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {categoryShortcuts.map((shortcut, index) => (
                        <motion.div
                          key={shortcut.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 hover:bg-surface-variant/50 rounded-lg transition-colors"
                        >
                          <span className="text-on-surface">
                            {shortcut.description}
                          </span>
                          <kbd className="px-2 py-1 bg-surface-variant text-on-surface-variant text-sm rounded border">
                            {shortcut.key}
                          </kbd>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-on-surface-variant text-center">
                  {t('shortcuts.tip')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook to use keyboard shortcuts
export function useKeyboardShortcuts() {
  const [showShortcuts, setShowShortcuts] = useState(false);

  const toggleShortcuts = () => setShowShortcuts(!showShortcuts);

  return {
    showShortcuts,
    toggleShortcuts,
    KeyboardShortcuts: () => (
      <KeyboardShortcuts
        onClose={() => setShowShortcuts(false)}
      />
    )
  };
}
