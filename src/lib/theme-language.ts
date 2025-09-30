/**
 * إدارة المظهر واللغة العامة للتطبيق
 */

import { THEMES } from './constants';
// <<< بداية الإضافة: استيراد النوع الموحد من المصدر الرئيسي
import { ThemeSettings } from '@/types';
// <<< نهاية الإضافة

// <<< تم حذف التعريف المكرر لـ ThemeSettings من هنا

// إعدادات اللغة
export interface LanguageSettings {
  language: 'ar' | 'en';
}

/**
 * تطبيق المظهر على التطبيق
 */
export function applyTheme(settings: ThemeSettings) {
  const root = document.documentElement;
  const body = document.body;
  
  // تحديد الثيم المناسب
  let selectedTheme = settings.theme;
  if (settings.theme === 'system') {
    selectedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  const theme = THEMES[selectedTheme as keyof typeof THEMES];
  
  // تطبيق السمة
  root.classList.remove('dark', 'light');
  root.classList.add(selectedTheme);
  
  // تطبيق متغيرات CSS المخصصة
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // تطبيق الألوان الأساسية للتطبيق
  root.style.setProperty('--bg-primary', theme.colors.background);
  root.style.setProperty('--bg-secondary', theme.colors.surface);
  root.style.setProperty('--text-primary', theme.colors.onBackground);
  root.style.setProperty('--text-secondary', theme.colors.onSurfaceVariant);
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--border', theme.colors.border);
  root.style.setProperty('--input', theme.colors.input);
  root.style.setProperty('--card', theme.colors.card);
  root.style.setProperty('--app-bar', theme.colors.appBar);
  root.style.setProperty('--shadow', theme.colors.shadow);
  root.style.setProperty('--overlay', theme.colors.overlay);
  
  // تطبيق حجم الخط
  if (settings.fontSize === 'small') {
    root.style.fontSize = '14px';
  } else if (settings.fontSize === 'medium') {
    root.style.fontSize = '16px';
  } else if (settings.fontSize === 'large') {
    root.style.fontSize = '18px';
  }
  
  // حفظ الثيم المحدد
  localStorage.setItem('app-theme-current', selectedTheme);
}

/**
 * تطبيق اللغة على التطبيق
 */
export function applyLanguage(settings: LanguageSettings) {
  const root = document.documentElement;
  
  if (settings.language === 'ar') {
    root.dir = 'rtl';
    root.lang = 'ar';
    root.style.fontFamily = 'Cairo, sans-serif';
  } else {
    root.dir = 'ltr';
    root.lang = 'en';
    root.style.fontFamily = 'Inter, sans-serif';
  }
}

/**
 * تحميل إعدادات المظهر من localStorage
 */
export function loadThemeSettings(): ThemeSettings {
  if (typeof window === 'undefined') return { theme: 'dark', fontSize: 'medium' };
  
  const saved = localStorage.getItem('app-theme');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // تأكد من أن البيانات المحفوظة متوافقة
      if (['light', 'dark', 'system'].includes(parsed.theme) && ['small', 'medium', 'large'].includes(parsed.fontSize)) {
        return parsed;
      }
    } catch {
      return { theme: 'dark', fontSize: 'medium' };
    }
  }
  
  return { theme: 'dark', fontSize: 'medium' };
}

/**
 * حفظ إعدادات المظهر في localStorage
 */
export function saveThemeSettings(settings: ThemeSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('app-theme', JSON.stringify(settings));
}

/**
 * تحميل إعدادات اللغة من localStorage
 */
export function loadLanguageSettings(): LanguageSettings {
  if (typeof window === 'undefined') return { language: 'ar' };
  
  const saved = localStorage.getItem('app-language');
  return saved ? { language: saved as 'ar' | 'en' } : { language: 'ar' };
}

/**
 * حفظ إعدادات اللغة في localStorage
 */
export function saveLanguageSettings(settings: LanguageSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('app-language', JSON.stringify(settings));
}

/**
 * تطبيق جميع الإعدادات عند تحميل التطبيق
 */
export function initializeAppSettings() {
  const themeSettings = loadThemeSettings();
  const languageSettings = loadLanguageSettings();
  
  applyTheme(themeSettings);
  applyLanguage(languageSettings);
}