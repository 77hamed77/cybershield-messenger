'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  SupportedLanguage, 
  getLanguageSettings, 
  applyLanguage, 
  loadSavedLanguage, 
  initializeLanguage,
  getText,
  getTextWithVariables,
  applyTheme,
  loadSavedTheme,
  initializeTheme
} from '@/lib/languages';
import { ClientOnly } from '@/components/ui/NoSSR';

// واجهة سياق اللغة
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  isRTL: boolean;
  fontFamily: string;
  isLoading: boolean;
}

// إنشاء السياق
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props للمكون
interface LanguageProviderProps {
  children: React.ReactNode;
}

// مكون موفر اللغة
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>('ar');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // تهيئة اللغة عند تحميل المكون
  useEffect(() => {
    setIsClient(true);
    
    // تحميل اللغة المحفوظة وتطبيقها
    const savedLanguage = loadSavedLanguage();
    setLanguageState(savedLanguage);
    applyLanguage(savedLanguage);
    
    // تحميل الثيم المحفوظ وتطبيقه
    const savedTheme = loadSavedTheme();
    applyTheme(savedTheme);
    
    setIsLoading(false);
  }, []);

  // تطبيق الثيم واللغة على document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      const settings = getLanguageSettings(language);
      
      // تطبيق اللغة
      html.lang = settings.language;
      html.dir = settings.direction;
      html.style.fontFamily = settings.fontFamily;
      
      // تطبيق الثيم الافتراضي إذا لم يكن موجود
      if (!html.classList.contains('dark') && !html.classList.contains('light')) {
        html.classList.add('dark');
      }
    }
  }, [language]);

  // دالة تغيير اللغة
  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    applyLanguage(newLanguage);
  };

  // دالة الترجمة
  const t = (key: string, variables?: Record<string, string | number>): string => {
    if (variables) {
      return getTextWithVariables(key, variables, language);
    }
    return getText(key, language);
  };

  // الحصول على إعدادات اللغة الحالية
  const settings = getLanguageSettings(language);
  const isRTL = settings.direction === 'rtl';
  const fontFamily = settings.fontFamily;

  // عدم العرض حتى يتم تحميل اللغة
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Loading language...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        isRTL, 
        fontFamily, 
        isLoading 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Hook لاستخدام السياق
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook مبسط للترجمة
export function useTranslation() {
  const { t, language, isRTL } = useLanguage();
  return { t, language, isRTL };
}

// مكون لاختبار الترجمة
export function TranslationTest() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div className="p-4 bg-surface rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Translation Test</h3>
      <p className="mb-2">Current Language: {language}</p>
      <p className="mb-4">App Name: {t('app.name')}</p>
      
      <div className="space-x-2">
        <button 
          onClick={() => setLanguage('ar')}
          className="px-3 py-1 bg-primary text-white rounded"
        >
          العربية
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className="px-3 py-1 bg-primary text-white rounded"
        >
          English
        </button>
      </div>
    </div>
  );
}

export default LanguageProvider;
