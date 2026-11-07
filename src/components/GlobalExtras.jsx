import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

/**
 * Top Viewport Scroll Progress Laser Bar
 */
export function GlobalProgressBar() {
  const { progress } = useScrollProgress();
  const scaleX = useSpring(progress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    scaleX.set(progress);
  }, [progress, scaleX]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] bg-gradient-to-r from-[#FF6B00] via-[#FFA057] to-[#F59E0B] shadow-[0_0_14px_rgba(255,107,0,0.85)] pointer-events-none"
    />
  );
}

/**
 * Global Tactile Click Shockwave & Spark Animation
 */
export function GlobalClickBurst() {
  const [bursts, setBursts] = useState([]);

  const handlePointerDown = useCallback((e) => {
    if (e.button && e.button !== 0) return;
    const id = Date.now() + Math.random();
    const x = e.clientX;
    const y = e.clientY;

    setBursts((prev) => [...prev.slice(-5), { id, x, y }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 650);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [handlePointerDown]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            style={{ left: burst.x, top: burst.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <motion.div
              initial={{ width: 6, height: 6, opacity: 0.85 }}
              animate={{ width: 54, height: 54, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full border border-[#FF6B00] shadow-[0_0_16px_rgba(255,107,0,0.6)] -translate-x-1/2 -translate-y-1/2 absolute left-0 top-0"
            />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const tx = Math.cos(rad) * 24;
              const ty = Math.sin(rad) * 24;
              return (
                <motion.span
                  key={deg}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
                  animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.48, ease: 'easeOut' }}
                  className="absolute left-0 top-0 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full bg-[#FFA057] shadow-[0_0_6px_#FF6B00]"
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Concentric Back-to-Top Floating Orb (Tooltip removed per user request)
 */
export function BackToTopButton() {
  const { scrollY, progress } = useScrollProgress();
  const [isLaunching, setIsLaunching] = useState(false);
  const isVisible = scrollY > 300;

  const scrollToTop = () => {
    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLaunching(false), 600);
  };

  const size = 56;
  const center = size / 2;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0.02), 1);
  const strokeDashoffset = circumference - clampedProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="fixed bottom-7 right-7 z-50 flex items-center"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="group relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none focus:outline-none bg-transparent p-0 border-0 shadow-[0_12px_36px_rgba(0,0,0,0.88),0_0_26px_rgba(255,107,0,0.25)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.95),0_0_36px_rgba(255,107,0,0.48)] transition-shadow duration-300"
          >
            <svg
              className="w-14 h-14 block pointer-events-none overflow-visible"
              viewBox="0 0 56 56"
            >
              <defs>
                <linearGradient id="topRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="50%" stopColor="#FF8533" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <radialGradient id="topCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 107, 0, 0.28)" />
                  <stop offset="100%" stopColor="rgba(10, 10, 14, 0.96)" />
                </radialGradient>
              </defs>

              {/* Concentric Dark Obsidian Base Disc */}
              <circle
                cx={center}
                cy={center}
                r={26}
                fill="#0B0B0F"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />

              {/* Inner Hover Glow Disc */}
              <circle
                cx={center}
                cy={center}
                r={20}
                fill="url(#topCoreGlow)"
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Concentric Progress Track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2.75"
                fill="none"
              />

              {/* Concentric Active Progress Arc */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="url(#topRingGrad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  transition: 'stroke-dashoffset 0.12s ease-out',
                  filter: 'drop-shadow(0 0 6px rgba(255, 107, 0, 0.65))',
                }}
              />
            </svg>

            {/* Centered Upward Arrow */}
            <motion.span
              animate={
                isLaunching
                  ? { y: [-2, -14, 0], opacity: [1, 0, 1] }
                  : { y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <svg
                className="w-4 h-4 text-zinc-200 group-hover:text-white transition-colors duration-200 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated High-End Obsidian Splash Screen
 */
export function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 900);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#070709] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-b from-[#FF6B00]/[0.18] to-transparent blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center gap-5">
            {/* Minimal Luminous Orbital Emblem with 45° Blade */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                initial={{ rotate: -120, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 rounded-full border border-white/15 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-center shadow-[0_0_35px_rgba(255,107,0,0.35)] relative"
              >
                <svg viewBox="0 0 48 48" className="w-11 h-11 stroke-[2.2] fill-none">
                  <circle cx="24" cy="24" r="17" className="stroke-white/15" />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="17"
                    stroke="#FF6B00"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeDasharray="107"
                    initial={{ strokeDashoffset: 107 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,107,0,0.8))' }}
                  />
                  <line x1="12" y1="36" x2="36" y2="12" className="stroke-[#FF6B00]" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="font-display font-bold text-2xl text-white tracking-tight flex items-baseline justify-center gap-1">
                Campus <span className="font-editorial italic text-[#FF6B00] font-normal text-3xl leading-none">Learn</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 mt-2">
                PEER NETWORK
              </div>
            </motion.div>

            {/* Micro progress line */}
            <div className="w-24 h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.85, ease: 'easeInOut', repeat: Infinity }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
