'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ClickOutsideProps {
  children: ReactNode;
  onClickOutside: () => void;
  className?: string;
}

export default function ClickOutside({ children, onClickOutside, className = '' }: ClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClickOutside]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
