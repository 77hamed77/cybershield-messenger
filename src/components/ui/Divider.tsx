'use client';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  const baseClasses = 'border-border';
  
  const orientationClasses = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l'
  };

  return (
    <div className={`${baseClasses} ${orientationClasses[orientation]} ${className}`} />
  );
}
