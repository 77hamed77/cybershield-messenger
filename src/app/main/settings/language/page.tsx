'use client';

import { useRouter } from 'next/navigation';
import LanguageSettingsScreen from '@/components/settings/LanguageSettingsScreen';

export default function LanguageSettingsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return <LanguageSettingsScreen onBack={handleBack} />;
}