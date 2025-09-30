'use client';

import { ReactNode } from 'react';

interface DesktopLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function DesktopLayout({ children, className = '' }: DesktopLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="max-w-6xl mx-auto bg-background min-h-screen">
        {children}
      </div>
    </div>
  );
}
