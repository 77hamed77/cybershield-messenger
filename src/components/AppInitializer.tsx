'use client';

import { useEffect } from 'react';
import { ClientOnly } from '@/components/ui/NoSSR';

/**
 * مكون لتهيئة الإعدادات العامة للتطبيق عند البدء
 */
function AppInitializerContent() {
  useEffect(() => {
    // تطبيق إعدادات الثيم بعد hydration
    if (typeof window !== 'undefined') {
      // تأخير قصير لضمان اكتمال hydration
      const timer = setTimeout(() => {
        const savedTheme = localStorage.getItem('app-theme') || 'dark';
        const html = document.documentElement;
        
        // التحقق من الثيم الحالي قبل التعديل
        const currentTheme = html.classList.contains('light') ? 'light' : 'dark';
        
        // تطبيق الثيم فقط إذا كان مختلفاً
        if (currentTheme !== savedTheme) {
          html.classList.remove('dark', 'light');
          html.classList.add(savedTheme as 'dark' | 'light');
        }
        
        // تطبيق إعدادات الثيم
        import('@/lib/languages').then(({ applyTheme }) => {
          applyTheme(savedTheme as 'dark' | 'light');
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}

export default function AppInitializer() {
  return (
    <ClientOnly>
      <AppInitializerContent />
    </ClientOnly>
  );
}
