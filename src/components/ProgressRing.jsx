import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export function ProgressRing({
  value = 0,
  size = 64,
  strokeWidth = 6,
  color = '#4F46E5',
  showLabel = true,
  className = '',
}) {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });
  const [currentValue, setCurrentValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    if (isInView) {
      setCurrentValue(clampedValue);
    }
  }, [isInView, clampedValue]);

  const offset = circumference - (currentValue / 100) * circumference;

  return (
    <div
      ref={ref}
      className={`inline-flex items-center justify-center relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800"
          fill="transparent"
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isInView ? offset : circumference}
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? offset : circumference }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      {showLabel && (
        <span className="absolute font-semibold text-xs text-text dark:text-text-dark">
          {Math.round(currentValue)}%
        </span>
      )}
    </div>
  );
}

