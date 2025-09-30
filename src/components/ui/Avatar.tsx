'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: ReactNode;
  className?: string;
  online?: boolean;
}

export default function Avatar({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  fallback, 
  className = '',
  online
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className={`w-full h-full rounded-full bg-input flex items-center justify-center ${textSizeClasses[size]}`}>
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
      
      {online !== undefined && (
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
          online ? 'bg-green-500' : 'bg-gray-400'
        }`} />
      )}
    </div>
  );
}
