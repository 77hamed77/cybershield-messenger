'use client';

import { ReactNode } from 'react';

interface ArabicTextProps {
  children: ReactNode;
  className?: string;
}

export default function ArabicText({ children, className = '' }: ArabicTextProps) {
  return (
    <span className={`arabic-text ${className}`}>
      {children}
    </span>
  );
}
