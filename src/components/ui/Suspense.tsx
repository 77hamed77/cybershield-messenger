'use client';

import { Suspense as ReactSuspense, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function Suspense({ children, fallback, className = '' }: SuspenseProps) {
  const defaultFallback = (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <ReactSuspense fallback={fallback || defaultFallback}>
      {children}
    </ReactSuspense>
  );
}
