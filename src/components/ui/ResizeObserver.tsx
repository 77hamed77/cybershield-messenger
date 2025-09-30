'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ResizeObserverProps {
  children: ReactNode;
  onResize: (size: { width: number; height: number }) => void;
  className?: string;
}

export default function ResizeObserver({ children, onResize, className = '' }: ResizeObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        onResize({ width, height });
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onResize]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
