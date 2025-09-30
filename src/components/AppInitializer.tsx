'use client';

import { useEffect } from 'react';
import { initializeAppSettings, applyTheme } from '@/lib/theme-language';
import { ThemeSettings } from '@/types'; // الآن هذا الاستيراد يعمل بدون خطأ

// تعريف الأنواع المسموح بها للثيم مرة أخرى هنا للتأكيد
type Theme = 'light' | 'dark' | 'system';

/**
 * مكون لتهيئة الإعدادات العامة للتطبيق عند البدء
 */
export default function AppInitializer() {
  useEffect(() => {
    // يمكن الإبقاء على هذا السطر إذا كان يقوم بمهام أخرى
    initializeAppSettings();
    
    const timer = setTimeout(() => {
      // 1. نحصل على الثيم المحفوظ من الذاكرة أو نستخدم القيمة الافتراضية
      const savedTheme = localStorage.getItem('app-theme-current') || 'dark';

      // 2. نتأكد من أن القيمة المحفوظة هي واحدة من القيم المسموح بها
      const validThemes: Theme[] = ['light', 'dark', 'system'];
      const finalTheme: Theme = validThemes.includes(savedTheme as Theme) 
        ? (savedTheme as Theme) 
        : 'dark';

      // 3. ننشئ كائن الإعدادات بالنوع الصحيح والمطابق للقواعد
      const themeSettings: ThemeSettings = {
        theme: finalTheme,
        fontSize: localStorage.getItem('app-font-size') || '16px', // قمت بتحسين هذا أيضاً
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