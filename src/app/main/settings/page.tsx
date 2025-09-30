'use client'; // مهم: اجعل الصفحة نفسها "عميل" لتسهيل التحميل الديناميكي

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// استيراد ديناميكي لمكون الإعدادات مع إيقاف العرض على الخادم (ssr: false)
const SettingsScreen = dynamic(() => import('@/components/settings/SettingsScreen'), {
  ssr: false,
});

// مكون بسيط لعرض شاشة تحميل مؤقتة
function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Loading Settings...</p>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SettingsScreen />
    </Suspense>
  );
}