'use client';

import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index === 0 && (
            <Home size={16} className="text-on-surface-variant" />
          )}
          
          {item.href ? (
            <a
              href={item.href}
              className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ) : (
            <span className="text-on-surface-variant flex items-center space-x-1">
              {item.icon}
              <span>{item.label}</span>
            </span>
          )}
          
          {index < items.length - 1 && (
            <ChevronRight size={16} className="text-on-surface-variant" />
          )}
        </div>
      ))}
    </nav>
  );
}
