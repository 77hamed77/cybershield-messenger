'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionProps {
  children: ReactNode;
  show: boolean;
  type?: 'fade' | 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
}

export default function Transition({ 
  children, 
  show, 
  type = 'fade', 
  direction = 'up', 
  duration = 0.3,
  className = ''
}: TransitionProps) {
  const getVariants = () => {
    const baseVariants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      },
      slide: {
        initial: { 
          opacity: 0, 
          y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
          x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
        },
        animate: { 
          opacity: 1, 
          y: 0, 
          x: 0 
        },
        exit: { 
          opacity: 0, 
          y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0,
          x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
        }
      },
      scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
      },
      rotate: {
        initial: { opacity: 0, rotate: -180 },
        animate: { opacity: 1, rotate: 0 },
        exit: { opacity: 0, rotate: 180 }
      }
    };

    return baseVariants[type];
  };

  const variants = getVariants();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
