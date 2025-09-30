'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export default function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = false 
}: SkeletonProps) {
  const style = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <motion.div
      className={`
        bg-input animate-pulse
        ${rounded ? 'rounded-full' : 'rounded'}
        ${className}
      `.trim()}
      style={style}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}
