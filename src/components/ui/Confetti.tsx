'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  className?: string;
}

export default function Confetti({ isActive, duration = 3000, className = '' }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#988561', '#2E8B57', '#FFA500', '#D50000', '#2196F3'][Math.floor(Math.random() * 5)]
      }));
      
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          animate={{
            y: [0, -100],
            rotate: [0, 360],
            opacity: [1, 0]
          }}
          transition={{
            duration: duration / 1000,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}
