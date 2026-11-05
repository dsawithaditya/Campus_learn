import React, { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

export function StatCounter({ end = 100, label, suffix = '', prefix = '', duration = 1200 }) {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTime = null;
    let animationFrame;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-primary-contrast tracking-tight mb-1">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      {label && (
        <div className="text-sm font-medium text-muted dark:text-muted-dark uppercase tracking-wider">
          {label}
        </div>
      )}
    </div>
  );
}

