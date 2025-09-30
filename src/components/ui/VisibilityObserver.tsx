'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface VisibilityObserverProps {
  children: ReactNode;
  onVisible: () => void;
  onHidden?: () => void;
  threshold?: number;
  className?: string;
}

export default function VisibilityObserver({ 
  children, 
  onVisible, 
  onHidden,
  threshold = 0.1, 
  className = ''
}: VisibilityObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        } else if (onHidden) {
          onHidden();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible, onHidden, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
