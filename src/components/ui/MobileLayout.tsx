'use client';

import { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MobileLayout({ children, className = '' }: MobileLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="max-w-md mx-auto bg-background min-h-screen">
        {children}
      </div>
    </div>
  );
}
