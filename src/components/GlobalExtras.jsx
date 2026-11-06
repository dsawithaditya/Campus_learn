import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function GlobalProgressBar() {
  return null;
}

export function BackToTopButton() {
  const { scrollY, progress } = useScrollProgress();
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = scrollY > 350;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;
  const percentText = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-7 right-7 z-50 flex flex-col items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Centered Floating Pill directly above the button on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-zinc-950/95 border border-white/15 text-zinc-300 text-xs font-semibold backdrop-blur-xl shadow-2xl flex items-center gap-1.5 select-none pointer-events-none z-20"
              >
                <span>Back to Top</span>
                <span className="font-mono text-[11px] text-[#FF6B00] font-bold">
                  {percentText}%
                </span>
                {/* Pointer tip */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 border-r border-b border-white/15 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unified Circular Button with SVG Progress Ring */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Back to top of page (${percentText}% scrolled)`}
            className="group relative w-12 h-12 rounded-full bg-zinc-950/90 backdrop-blur-2xl border border-white/15 hover:border-[#FF6B00]/70 flex items-center justify-center cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_22px_rgba(255,107,0,0.22)] transition-all duration-300 select-none focus:outline-none"
          >
            {/* SVG Circular Progress Track */}
            <svg
              className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              <defs>
                <linearGradient id="topRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#FFA057" />
                </linearGradient>
              </defs>
              {/* Subtle background track */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Glowing animated progress stroke */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="url(#topRingGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
            </svg>

            {/* Ambient orange core glow on hover */}
            <div className="absolute inset-2 rounded-full bg-[#FF6B00]/0 group-hover:bg-[#FF6B00]/15 transition-colors duration-300 blur-sm pointer-events-none" />

            {/* Modern Aerodynamic Upward Arrow */}
            <svg
              className="w-4 h-4 text-zinc-300 group-hover:text-white transition-all duration-300 ease-out group-hover:-translate-y-0.5 relative z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 750);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center transition-colors pointer-events-none"
    >
      <div className="relative flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#F59E0B] flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,107,0,0.4)]"
        >
          <svg
            className="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </motion.div>
        <div className="font-heading font-bold text-xl text-white tracking-tight">
          Campus <span className="text-[#FF6B00]">Learn</span>
        </div>
      </div>
    </motion.div>
  );
}
