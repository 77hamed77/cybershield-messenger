'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ClientOnly } from '@/components/ui/NoSSR';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState('dark');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Load theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app-theme') || 'dark';
      setThemeState(savedTheme);
      
      // Apply theme immediately
      const html = document.documentElement;
      html.classList.remove('dark', 'light');
      html.classList.add(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', newTheme);
      
      // Apply theme to document
      const html = document.documentElement;
      html.classList.remove('dark', 'light');
      html.classList.add(newTheme);
    }
  };

  return (
    <ClientOnly fallback={<div style={{ visibility: 'hidden' }}>{children}</div>}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </ClientOnly>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
