'use client';

import MainLayout from '@/components/layout/MainLayout';

/**
 * Main Layout for all main app pages
 * 
 * This layout applies the sidebar navigation to all pages under /main
 * while keeping login and root pages unaffected.
 */

interface MainPageLayoutProps {
  children: React.ReactNode;
}

export default function MainPageLayout({ children }: MainPageLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
