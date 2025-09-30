'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface IntersectionObserverProps {
  children: ReactNode;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export default function IntersectionObserver({ 
  children, 
  onIntersect, 
  threshold = 0.1, 
  rootMargin = '0px',
  className = ''
}: IntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
