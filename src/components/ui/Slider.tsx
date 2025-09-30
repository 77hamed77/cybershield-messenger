'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  hideTrack?: boolean;
  showTicks?: boolean;
  colors?: {
    track?: string;
    thumb?: string;
    active?: string;
  };
}

export default function Slider({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  disabled = false, 
  className = '',
  showValue = false,
  label,
  size = 'md',
  variant = 'primary',
  hideTrack = false,
  showTicks = false,
  colors
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const percentage = ((value - min) / (max - min)) * 100;

  // Animation values
  const springValue = useSpring(0);
  const thumbScale = useTransform(springValue, [0, 1], [1, 1.2]);

  // Get variant colors
  const getVariantColors = () => {
    if (variant === 'primary') {
      return {
        track: colors?.track || '#4C4848',
        thumb: colors?.thumb || '#988561',
        active: colors?.active || '#988561'
      };
    }
    if (variant === 'success') {
      return {
        track: '#2E8B57',
        thumb: '#2E8B57',
        active: '#2E8B57'
      };
    }
    if (variant === 'warning') {
      return {
        track: '#FFA500',
        thumb: '#FFA500',
        active: '#FFA500'
      };
    }
    if (variant === 'error') {
      return {
        track: '#D50000',
        thumb: '#D50000',
        active: '#D50000'
      };
    }
    return {
      track: '#6E6E6E',
      thumb: '#6E6E6E',
      active: '#6E6E6E'
    };
  };

  const variants = getVariantColors();

  // Size configurations
  const getSizeConfig = () => {
    if (size === 'sm') {
      return {
        height: '4px',
        thumbSize: '16px',
        thumbOffset: '6px',
        textSize: 'xs'
      };
    }
    if (size === 'lg') {
      return {
        height: '8px',
        thumbSize: '20px',
        thumbOffset: '6px',
        textSize: 'lg'
      };
    }
    return {
      height: '6px',
      thumbSize: '18px',
      thumbOffset: '6px',
      textSize: 'sm'
    };
  };

  const sizeConfig = getSizeConfig();

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    springValue.set(percentage / 100);
  }, [percentage, springValue]);

  return (
    <div className={`w-full ${className}`}>
      {/* Label with WhatsApp/Telegram Style */}
      {label && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <label className={`text-${sizeConfig.textSize} font-medium text-on-surface block mb-1`}>
              {label}
            </label>
          </div>
          {showValue && (
            <span className={`text-sm font-semibold text-primary bg-surface px-3 py-1 rounded-full min-w-[40px] text-center border border-border/20`}>
              {value}%
            </span>
          )}
        </div>
      )}

      {/* Value Display */}
      {showValue && !label && (
        <div className="flex justify-between text-xs text-on-surface-variant mb-2">
          <span>{min}</span>
          <span className="font-medium">{value}</span>
          <span>{max}</span>
        </div>
      )}

      {/* Ticks */}
      {showTicks && (
        <div className="flex justify-between px-2 mb-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const tickValue = min + ((max - min) / 4) * i;
            return (
              <span 
                key={i}
                className="text-xs text-on-surface-variant"
              >
                {tickValue}
              </span>
            );
          })}
        </div>
      )}

      {/* WhatsApp/Telegram Style Slider Container */}
      <div className="relative flex items-center">
        {/* Left Track (Inactive) */}
        {!hideTrack && (
          <div 
            className="rounded-full"
            style={{ 
              width: '100%',
              height: sizeConfig.height,
              backgroundColor: variants.track,
              opacity: 0.4
            }}
          />
        )}

        {/* Active Track (WhatsApp/Telegram Style) */}
        <motion.div
          className="absolute rounded-full"
          style={{ 
            height: sizeConfig.height,
            backgroundColor: variants.active,
            opacity: 0.9
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />

        {/* WhatsApp/Telegram Style Thumb */}
        <motion.div
          className="absolute cursor-pointer rounded-full shadow-md border-2 border-white"
          style={{
            width: size === 'lg' ? '24px' : '20px',
            height: size === 'lg' ? '24px' : '20px',
            left: `calc(${percentage}% - ${size === 'lg' ? '12' : '10'}px)`,
            backgroundColor: variants.thumb,
            top: `calc(-${size === 'lg' ? '8' : '6'}px)`,
            boxShadow: `0 4px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`
          }}
          animate={{
            scale: isDragging ? 1.15 : 1,
            boxShadow: isDragging 
              ? '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' 
              : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            y: isDragging ? -1 : 0
          }}
          whileHover={{ 
            scale: 1.05,
            y: -0.5,
            transition: { duration: 0.1 }
          }}
          whileTap={{ 
            scale: 0.95,
            y: 0,
            transition: { duration: 0.1 }
          }}
        />

        {/* Hidden Input */}
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => !disabled && onChange(Number(e.target.value))}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          disabled={disabled}
          className={`
            w-full absolute top-0 opacity-0 cursor-pointer z-10
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          style={{
            height: sizeConfig.height,
          }}
        />
      </div>

      {/* WhatsApp/Telegram Style Responsive */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 0;
          height: 0;
        }
        
        input[type="range"]::-moz-range-thumb {
          appearance: none;
          width: 0;
          height: 0;
          border: none;
          background: transparent;
        }
        
        input[type="range"]::-ms-thumb {
          appearance: none;
          width: 0;
          height: 0;
          border: none;
          background: transparent;
        }
        
        /* WhatsApp/Telegram Style Improvements */
        .slider-container:hover .slider-thumb {
          transform: scale(1.05);
        }
        
        .slider-thumb:active {
          transform: scale(0.95);
        }
        
        @media (max-width: 640px) {
          .slider-container {
            padding: 0.5rem;
          }
          
          .value-display {
            font-size: 0.75rem;
            min-width: 35px;
          }
        }
        
        @media (max-width: 480px) {
          .slider-container .thumb {
            width: ${size === 'lg' ? '22px' : '18px'};
            height: ${size === 'lg' ? '22px' : '18px'};
          }
          
          .value-display {
            font-size: 0.7rem;
            min-width: 32px;
          }
        }
        
        /* WhatsApp-like smooth track */
        .slider-track {
          transition: all 0.15s ease;
        }
        
        .slider-track.active {
          background: linear-gradient(90deg, transparent 0%, currentColor 100%);
        }
      `}</style>
    </div>
  );
}
