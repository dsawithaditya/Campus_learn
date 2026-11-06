import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function GlobalProgressBar() {
  return null;
}

export function BackToTopButton() {
  const { scrollY, progress } = useScrollProgress();
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = scrollY > 400;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-7 right-7 z-50 flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Expanding Tooltip Pill on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="hidden sm:flex items-center gap-1.5 mr-2.5 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-white/15 text-zinc-300 text-xs font-semibold backdrop-blur-xl shadow-xl select-none pointer-events-none"
              >
                <span>Back to Top</span>
                <span className="font-mono text-[10px] text-[#FF6B00]">{Math.round(progress * 100)}%</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Circular Button with Active Progress Ring */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top of page"
            className="group relative w-12 h-12 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-white/15 hover:border-[#FF6B00]/70 flex items-center justify-center cursor-pointer shadow-[0_12px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(255,107,0,0.25)] transition-colors select-none focus:outline-none"
          >
            {/* SVG Circular Progress Track */}
            <svg
              className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              {/* Background faint ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Progress ring in Blaze Orange */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#FF6B00"
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

            {/* Glowing upward arrow */}
            <ArrowUp
              className="w-4 h-4 text-zinc-300 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200 z-10"
              strokeWidth={2.5}
            />
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

