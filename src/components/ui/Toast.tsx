'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose: (id: string) => void;
  duration?: number;
}

export default function Toast({ 
  id, 
  type, 
  title, 
  message, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const colors = {
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info'
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="bg-surface border border-border rounded-lg p-4 shadow-lg min-w-80 max-w-96"
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 mt-0.5 ${colors[type]}`} />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-on-surface">{title}</h4>
          {message && (
            <p className="text-sm text-on-surface-variant mt-1">{message}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
