'use client';

import { useEffect } from 'react';
import { initializeAppSettings } from '@/lib/theme-language';

/**
 * مكون لتهيئة الإعدادات العامة للتطبيق عند البدء
 */
export default function AppInitializer() {
  useEffect(() => {
    initializeAppSettings();
    
    // تطبيق إضافي للتأكد من تطبيق الثيم
    setTimeout(() => {
      initializeAppSettings();
      
      // إضافة class للتطبيق على document
      const root = document.documentElement;
      root.classList.add('theme-applied');
      
      // تطبيق الثيم فوراً
      const themeSettings = {
        theme: localStorage.getItem('app-theme-current') || 'dark',
        fontSize: 'medium'
      };
      
      if (typeof window !== 'undefined') {
        import('@/lib/theme-language').then(({ applyTheme }) => {
          applyTheme(themeSettings);
        });
      }
    }, 100);
  }, []);

  return null; // لا يظهر أي شيء في الواجهة
}
