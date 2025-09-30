'use client';

import { useEffect } from 'react';
import { initializeAppSettings } from '@/lib/theme-language';
import { ThemeSettings } from '@/types'; // سنحتاج هذا النوع غالباً

// تعريف الأنواع المسموح بها للثيم
type Theme = 'light' | 'dark' | 'system';

/**
 * مكون لتهيئة الإعدادات العامة للتطبيق عند البدء
 */
export default function AppInitializer() {
  useEffect(() => {
    initializeAppSettings();
    
    // تطبيق إضافي للتأكد من تطبيق الثيم
    const timer = setTimeout(() => {
      initializeAppSettings();
      
      // إضافة class للتطبيق على document
      const root = document.documentElement;
      root.classList.add('theme-applied');
      
      // <<< بداية الإصلاح
      // 1. نحصل على الثيم المحفوظ من الذاكرة أو نستخدم القيمة الافتراضية
      const savedTheme = localStorage.getItem('app-theme-current') || 'dark';

      // 2. نتأكد من أن القيمة المحفوظة هي واحدة من القيم المسموح بها
      const validThemes: Theme[] = ['light', 'dark', 'system'];
      const finalTheme: Theme = validThemes.includes(savedTheme as Theme) ? (savedTheme as Theme) : 'dark';

      // 3. ننشئ كائن الإعدادات بالنوع الصحيح
      const themeSettings: ThemeSettings = {
        theme: finalTheme,
        fontSize: 'medium' // تأكد من أن 'medium' قيمة مقبولة في تعريف النوع
      };
      // <<< نهاية الإصلاح
      
      if (typeof window !== 'undefined') {
        import('@/lib/theme-language').then(({ applyTheme }) => {
          // الآن نرسل الكائن الصحيح
          applyTheme(themeSettings);
        });
      }
    }, 100);

    // مهم: تنظيف الـ timer عند الخروج من المكون لمنع تسرب الذاكرة
    return () => clearTimeout(timer);
  }, []);

  return null; // لا يظهر أي شيء في الواجهة
}