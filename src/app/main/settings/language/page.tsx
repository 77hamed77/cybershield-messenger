'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { applyLanguage, loadLanguageSettings, saveLanguageSettings, LanguageSettings } from '@/lib/theme-language';

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('ar');

  // تحميل الإعدادات المحفوظة
  useEffect(() => {
    const savedSettings = loadLanguageSettings();
    setSelectedLanguage(savedSettings.language);
  }, []);

  // تطبيق التغييرات على التطبيق
  useEffect(() => {
    const settings: LanguageSettings = {
      language: selectedLanguage as 'ar' | 'en'
    };
    
    applyLanguage(settings);
    saveLanguageSettings(settings);
    
    console.log(`🌐 تم تغيير اللغة إلى: ${selectedLanguage === 'ar' ? 'العربية' : 'English'}`);
  }, [selectedLanguage]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    alert(`تم تطبيق اللغة: ${lang === 'ar' ? 'العربية' : 'English'}`);
  };
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-app-bar backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface/50 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-primary">Language</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-on-surface mb-4">Select Language</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleLanguageChange('ar')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface">العربية</span>
                  <span className="text-primary">{selectedLanguage === 'ar' ? '✓' : ''}</span>
                </div>
              </button>
              <button 
                onClick={() => handleLanguageChange('en')}
                className="w-full p-3 text-left hover:bg-surface/50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-on-surface">English</span>
                  <span className="text-primary">{selectedLanguage === 'en' ? '✓' : ''}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
