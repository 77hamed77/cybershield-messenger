/**
 * Language Management System - CyberShield Messenger
 * نظام إدارة اللغة - CyberShield Messenger
 */

import ar from './ar';
import en from './en';

// أنواع اللغات المدعومة
export type SupportedLanguage = 'ar' | 'en';

// واجهة النصوص
export interface LanguageTexts {
  [key: string]: any;
}

// إعدادات اللغة
export interface LanguageSettings {
  language: SupportedLanguage;
  direction: 'rtl' | 'ltr';
  fontFamily: string;
}

// قائمة اللغات المدعومة مع خطوط رسمية حكومية
export const supportedLanguages: Record<SupportedLanguage, LanguageSettings> = {
  ar: {
    language: 'ar',
    direction: 'rtl',
    fontFamily: 'var(--font-noto-arabic), "Noto Sans Arabic", "Cairo", "Tahoma", "Arial Unicode MS", system-ui, sans-serif'
  },
  en: {
    language: 'en',
    direction: 'ltr',
    fontFamily: 'var(--font-roboto), "Roboto", "Inter", "Arial", "Helvetica", system-ui, sans-serif'
  }
};

// قائمة النصوص
export const languageTexts: Record<SupportedLanguage, LanguageTexts> = {
  ar,
  en
};

// الحصول على النص المترجم
export function getText(key: string, language: SupportedLanguage = 'ar'): string {
  const keys = key.split('.');
  let value: any = languageTexts[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // إذا لم يتم العثور على النص، استخدم العربية كبديل
      if (language !== 'ar') {
        return getText(key, 'ar');
      }
      return key; // إرجاع المفتاح نفسه إذا لم يتم العثور على النص
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// الحصول على النص مع استبدال المتغيرات
export function getTextWithVariables(
  key: string, 
  variables: Record<string, string | number> = {}, 
  language: SupportedLanguage = 'ar'
): string {
  let text = getText(key, language);
  
  // استبدال المتغيرات
  Object.entries(variables).forEach(([varKey, varValue]) => {
    text = text.replace(new RegExp(`{${varKey}}`, 'g'), String(varValue));
  });
  
  return text;
}

// الحصول على إعدادات اللغة
export function getLanguageSettings(language: SupportedLanguage): LanguageSettings {
  return supportedLanguages[language];
}

// تطبيق اللغة على المستند
export function applyLanguage(language: SupportedLanguage): void {
  if (typeof window === 'undefined') return;
  
  const settings = getLanguageSettings(language);
  const html = document.documentElement;
  
  // تطبيق اللغة والاتجاه
  html.lang = settings.language;
  html.dir = settings.direction;
  
  // تطبيق خط الكتابة
  html.style.fontFamily = settings.fontFamily;
  
  // حفظ اللغة المختارة
  localStorage.setItem('app-language', language);
  
  console.log(`🌐 Language applied: ${language} (${settings.direction})`);
}

// تطبيق الثيم على المستند
export function applyTheme(theme: 'dark' | 'light'): void {
  if (typeof window === 'undefined') return;
  
  const html = document.documentElement;
  
  // إزالة الثيمات السابقة
  html.classList.remove('dark', 'light');
  
  // تطبيق الثيم الجديد
  html.classList.add(theme);
  
  // حفظ الثيم المختار
  localStorage.setItem('app-theme', theme);
  
  console.log(`🎨 Theme applied: ${theme}`);
}

// تحميل اللغة المحفوظة
export function loadSavedLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'ar';
  
  const saved = localStorage.getItem('app-language') as SupportedLanguage;
  return saved && supportedLanguages[saved] ? saved : 'ar';
}

// تحميل الثيم المحفوظ
export function loadSavedTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  
  const saved = localStorage.getItem('app-theme') as 'dark' | 'light';
  return saved === 'light' ? 'light' : 'dark';
}

// تهيئة اللغة عند تحميل التطبيق
export function initializeLanguage(): SupportedLanguage {
  const language = loadSavedLanguage();
  applyLanguage(language);
  return language;
}

// تهيئة الثيم عند تحميل التطبيق
export function initializeTheme(): 'dark' | 'light' {
  const theme = loadSavedTheme();
  applyTheme(theme);
  return theme;
}

// تبديل اللغة
export function switchLanguage(language: SupportedLanguage): void {
  applyLanguage(language);
  
  // إعادة تحميل الصفحة لتطبيق التغييرات
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

// الحصول على قائمة اللغات للعرض
export function getLanguageList(): Array<{
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'rtl' | 'ltr';
}> {
  return [
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr'
    }
  ];
}

// التحقق من دعم اللغة
export function isLanguageSupported(language: string): language is SupportedLanguage {
  return language in supportedLanguages;
}

// الحصول على اللغة الافتراضية للنظام
export function getSystemLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'ar';
  
  const systemLang = navigator.language.split('-')[0];
  return isLanguageSupported(systemLang) ? systemLang : 'ar';
}

// تصدير النصوص للاستخدام المباشر
export { ar, en };
