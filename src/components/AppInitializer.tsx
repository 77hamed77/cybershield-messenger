'use client';

import { useEffect } from 'react';
import { initializeAppSettings, applyTheme } from '@/lib/theme-language';
import { ThemeSettings } from '@/types';

// تعريف الأنواع المسموح بها للتأكيد
type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';

/**
 * مكون لتهيئة الإعدادات العامة للتطبيق عند البدء
 */
export default function AppInitializer() {
  useEffect(() => {
    // يمكن الإبقاء على هذا السطر إذا كان يقوم بمهام أخرى
    initializeAppSettings();
    
    const timer = setTimeout(() => {
      // 1. التعامل مع الثيم
      const savedTheme = localStorage.getItem('app-theme-current') || 'dark';
      const validThemes: Theme[] = ['light', 'dark', 'system'];
      const finalTheme: Theme = validThemes.includes(savedTheme as Theme) 
        ? (savedTheme as Theme) 
        : 'dark';

      // <<< بداية التعديل: التعامل الصحيح مع حجم الخط
      // 2. التعامل مع حجم الخط
      const savedFontSize = localStorage.getItem('app-font-size');
      const validFontSizes: FontSize[] = ['small', 'medium', 'large'];
      const finalFontSize: FontSize = validFontSizes.includes(savedFontSize as FontSize) 
        ? (savedFontSize as FontSize) 
        : 'medium'; // القيمة الافتراضية هي 'medium'
      // <<< نهاية التعديل

      // 3. إنشاء كائن الإعدادات الصحيح بالكامل
      const themeSettings: ThemeSettings = {
        theme: finalTheme,
        fontSize: finalFontSize, // استخدام القيمة الصحيحة والمتحقق منها
      };
      
      // 4. الآن نقوم بتطبيق الثيم، ولن يكون هناك أي خطأ
      applyTheme(themeSettings);
      
      // إضافة class للتطبيق على document
      document.documentElement.classList.add('theme-applied');

    }, 100);

    // تنظيف الـ timer عند الخروج من المكون
    return () => clearTimeout(timer);
  }, []);

  return null; // لا يظهر أي شيء في الواجهة
}