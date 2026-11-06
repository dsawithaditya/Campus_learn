import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function GlobalProgressBar() {
  return null;
}

export function BackToTopButton() {
  const { scrollY } = useScrollProgress();
  const isVisible = scrollY > 600;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lift flex items-center justify-center cursor-pointer transition-colors"
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2} />
        </motion.button>
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
    }, 850);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-bg dark:bg-bg-dark flex flex-col items-center justify-center transition-colors pointer-events-none"
    >
      <div className="relative flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lift"
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
        <div className="font-heading font-bold text-xl text-text dark:text-text-dark tracking-tight">
          Campus<span className="text-primary dark:text-primary-contrast">Learn</span>
        </div>
      </div>
    </motion.div>
  );
}

