import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
 * Clean Obsidian + Blaze Orange Back-to-Top Floating Pill
 * Matches Image 2 perfectly with live scroll percentage, subtle orange border glow, and smooth launch.
 */
export function BackToTopButton() {
  const { scrollY, progress } = useScrollProgress();
  const [isLaunching, setIsLaunching] = useState(false);
  const isVisible = scrollY > 280;

  const scrollToTop = () => {
    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLaunching(false), 650);
  };

  const percentText = Math.min(100, Math.max(1, Math.round(progress * 100)));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 18 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-7 right-7 z-50 flex items-center"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Back to top of page (${percentText}% scrolled)`}
            className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B0B0F]/90 backdrop-blur-xl border border-[#FF6B00]/40 hover:border-[#FF6B00] shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(255,107,0,0.22)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.95),0_0_28px_rgba(255,107,0,0.45)] transition-all duration-300 cursor-pointer select-none focus:outline-none"
          >
            {/* Ambient orange glow on hover */}
            <div className="absolute inset-0 rounded-full bg-[#FF6B00]/0 group-hover:bg-[#FF6B00]/10 transition-colors duration-300 pointer-events-none" />

            {/* Aerodynamic Arrow */}
            <motion.span
              animate={
                isLaunching
                  ? { y: [-2, -14, 10, 0], opacity: [1, 0, 0, 1] }
                  : { y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </motion.span>

            {/* Label */}
            <span className="font-heading font-semibold text-xs sm:text-[13px] text-white tracking-tight">
              Back to top
            </span>

            {/* Dot separator */}
            <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-zinc-400 transition-colors" />

            {/* Percentage */}
            <span className="font-mono text-xs sm:text-[13px] font-bold text-[#FF6B00] tabular-nums tracking-tight">
              {percentText}%
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Grail-Inspired Scroll-Traveling Action Pill (_waitPill_bwga5_520)
 * Travels subtly along the bottom-left and adapts as the user scrolls
 */
export function GrailFloatingPill() {
  const { scrollY, progress } = useScrollProgress();
  const navigate = useNavigate();
  const isVisible = scrollY > 240 && progress < 0.91;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          whileHover={{ y: -3 }}
          whileTap={{ y: -1, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => navigate('/explore')}
          aria-label="Explore Live Cohorts"
          className="fixed bottom-7 left-7 z-40 hidden sm:flex items-center gap-3 pl-3.5 pr-1.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/15 hover:border-[#FF6B00]/50 backdrop-blur-2xl shadow-[0_14px_38px_rgba(0,0,0,0.85)] cursor-pointer group select-none"
        >
          {/* Rotating Emblem Mark on Hover matching Grail's _pillMark */}
          <span
            aria-hidden="true"
            className="w-6 h-6 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/40 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-12 group-hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none">
              <circle cx="12" cy="12" r="8" className="stroke-white/80" strokeWidth="2" />
              <line x1="6" y1="18" x2="18" y2="6" className="stroke-[#FF6B00]" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="px-4 py-2 rounded-full bg-white/[0.08] group-hover:bg-[#FF6B00] text-[#FFA057] group-hover:text-white font-heading font-semibold text-xs tracking-tight transition-all duration-300">
            Explore Cohorts
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Grail-Inspired 3D Framed Collector Card Preloader (_root_o5e3l_2)
 * Features 3D floating card with corner cutouts, live 0% -> 100% tabular counter,
 * and 3D perspective book-open reveal into the Obsidian Hero stage
 */
export function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const [opening, setOpening] = useState(false);
  const groupRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const loadDuration = 780; // Crisp, fast load to 100%

    const step = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / loadDuration);
      const eased = 1 - Math.pow(1 - p, 3);
      const currentPct = Math.round(eased * 100);
      setPct(currentPct);

      // Gentle 3D float matching Grail's floatSpeed & tiltX/tiltY
      if (groupRef.current && p < 1) {
        const t = elapsed / 1000;
        const rx = Math.sin(t * 2.4) * 7;
        const ry = Math.cos(t * 2.0) * 11;
        const rz = Math.sin(t * 1.6) * -3;
        groupRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
      }

      if (p < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setOpening(true);
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 420);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Campus Learn"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-[#070709] flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ perspective: '1400px' }}
        >
          {/* Ambient radial aura */}
          <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-b from-[#FF6B00]/[0.22] via-[#F59E0B]/[0.08] to-transparent blur-3xl pointer-events-none" />

          {/* 3D Floating Collector Card Group (_group_o5e3l_23 / _art_o5e3l_44) */}
          <motion.div
            ref={groupRef}
            animate={
              opening
                ? {
                    rotateY: -115,
                    scale: 3.2,
                    opacity: 0,
                    filter: 'blur(8px)',
                  }
                : {
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }
            }
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-[220px] h-[296px] sm:w-[248px] sm:h-[334px] rounded-[20px] bg-[#0D0D12] shadow-[0_28px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(255,107,0,0.28)] overflow-hidden flex flex-col items-center justify-between py-9 px-6"
          >
            {/* Grail Ornate Frame Border (_frame_o5e3l_54) */}
            <div className="absolute inset-0 border-[10px] border-[#FF6B00]/80 pointer-events-none" />
            <div className="absolute inset-[13px] border border-[#FFA057]/25 pointer-events-none" />

            {/* Grail 4 Circular Corner Cutouts (_corner_o5e3l_59) */}
            <div className="absolute -left-9 -top-9 w-20 h-20 rounded-full bg-[#FF6B00]/80 pointer-events-none" />
            <div className="absolute -right-9 -top-9 w-20 h-20 rounded-full bg-[#FF6B00]/80 pointer-events-none" />
            <div className="absolute -left-9 -bottom-9 w-20 h-20 rounded-full bg-[#FF6B00]/80 pointer-events-none" />
            <div className="absolute -right-9 -bottom-9 w-20 h-20 rounded-full bg-[#FF6B00]/80 pointer-events-none" />

            {/* Top Micro Kicker */}
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.24em] text-[#FFA057]">
              CAMPUS LEARN
            </span>

            {/* Central Orbital Slashed Mark (_mark_o5e3l_66) */}
            <div className="relative z-10 w-20 h-20 rounded-full border border-[#FF6B00]/40 bg-zinc-950/90 flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.35)]">
              <svg viewBox="0 0 48 48" className="w-12 h-12 fill-none">
                <circle cx="24" cy="24" r="17" className="stroke-white/20" strokeWidth="2.2" />
                <circle
                  cx="24"
                  cy="24"
                  r="17"
                  stroke="#FF6B00"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="107"
                  strokeDashoffset={107 - (pct / 100) * 107}
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,107,0,0.8))' }}
                />
                <line
                  x1="12"
                  y1="36"
                  x2="36"
                  y2="12"
                  className="stroke-[#FF6B00]"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Grail Uppercase Light Editorial Serif LOADING + Tabular % (_txt_o5e3l_74) */}
            <div className="relative z-10 text-center">
              <div className="font-grail-serif text-[34px] sm:text-[38px] text-[#FFA057] leading-[0.88] tracking-[-0.01em]">
                Loading
              </div>
              <div className="font-grail-serif text-[38px] sm:text-[42px] text-white tabular-nums leading-[0.9] mt-1">
                {pct}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Ambient Blaze Orange Cursor Spotlight
 * Floats subtly beneath the Obsidian custom arrow, illuminating dark surfaces
 * Active only on non-touch (fine-pointer) desktop environments
 */
export function CustomCursorGlow() {
  const [mounted, setMounted] = useState(false);
  const glowRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

    setMounted(true);
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let rafId = 0;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none z-[1] will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(255, 107, 0, 0.045) 0%, rgba(255, 107, 0, 0.015) 35%, transparent 68%)',
      }}
    />
  );
}

