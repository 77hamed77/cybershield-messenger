'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center px-8 py-16 ${className}`}>
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm mb-6 max-w-sm">{description}</p>
      {action && action}
    </div>
  );
}
