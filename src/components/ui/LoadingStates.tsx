'use client';

import { motion } from 'framer-motion';
import { Loader2, MessageCircle, Phone, Users, Settings } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${className}`}
    >
      <Loader2 className="w-full h-full text-primary" />
    </motion.div>
  );
}

interface LoadingCardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function LoadingCard({ 
  title = "Loading...", 
  subtitle = "Please wait while we load your data",
  icon,
  className = "" 
}: LoadingCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`professional-card ${className}`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {icon || <LoadingSpinner size="lg" />}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary mb-1">
            {title}
          </h3>
          <p className="text-on-surface-variant">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface SkeletonLoaderProps {
  type?: 'text' | 'avatar' | 'card' | 'list';
  count?: number;
  className?: string;
}

export function SkeletonLoader({ 
  type = 'text', 
  count = 1, 
  className = '' 
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className="animate-pulse">
            <div className="h-4 bg-surface-variant rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-surface-variant rounded w-1/2"></div>
          </div>
        );
      case 'avatar':
        return (
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-surface-variant rounded-full"></div>
          </div>
        );
      case 'card':
        return (
          <div className="animate-pulse professional-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-surface-variant rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-surface-variant rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-surface-variant rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center space-x-3 p-3">
                  <div className="w-10 h-10 bg-surface-variant rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-surface-variant rounded w-2/3 mb-1"></div>
                    <div className="h-3 bg-surface-variant rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={count > 1 ? 'mb-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon,
  title = "No data found",
  description = "There's nothing to show here yet",
  action,
  className = "" 
}: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      <div className="w-16 h-16 bg-surface-variant/50 rounded-full flex items-center justify-center mb-4">
        {icon || <MessageCircle className="w-8 h-8 text-on-surface-variant" />}
      </div>
      <h3 className="text-lg font-semibold text-on-surface mb-2">
        {title}
      </h3>
      <p className="text-on-surface-variant text-sm max-w-md">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </motion.div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = "Something went wrong",
  description = "We encountered an error while loading your data",
  onRetry,
  className = "" 
}: ErrorStateProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
        <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">!</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-on-surface mb-2">
        {title}
      </h3>
      <p className="text-on-surface-variant text-sm max-w-md mb-6">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t('app.tryAgain')}
        </button>
      )}
    </motion.div>
  );
}

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ 
  progress, 
  className = "", 
  showPercentage = true 
}: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-on-surface-variant">Progress</span>
        {showPercentage && (
          <span className="text-sm text-on-surface-variant">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-surface-variant rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-2 bg-primary rounded-full"
        />
      </div>
    </div>
  );
}

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className = "" }: TypingIndicatorProps) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        ))}
      </div>
      <span className="text-xs text-on-surface-variant ml-2">
        {useLanguage().t('app.typing')}
      </span>
    </div>
  );
}
