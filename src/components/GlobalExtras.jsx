import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/locomotive-scroll.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { BrandMark } from './BrandLogo';

gsap.registerPlugin(ScrollTrigger);

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
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] bg-gradient-to-r from-[#0859D4] via-[#1A59F9] to-[#18A0FB] shadow-[0_0_12px_rgba(8,89,212,0.55)] pointer-events-none"
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
              className="rounded-full border border-[#0859D4] shadow-[0_0_12px_rgba(8,89,212,0.4)] -translate-x-1/2 -translate-y-1/2 absolute left-0 top-0"
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
                  className="absolute left-0 top-0 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full bg-[#0859D4]"
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
 * Minimalist Circular Progress Back-to-Top Dial
 * Combines a radial scroll progress ring with an upward launch arrow in a compact 48x48 circle.
 */
export function BackToTopButton() {
  const { scrollY, progress } = useScrollProgress();
  const [isLaunching, setIsLaunching] = useState(false);
  const isVisible = scrollY > 280;

  const scrollToTop = () => {
    setIsLaunching(true);
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLaunching(false), 600);
  };

  const pct = Math.min(1, Math.max(0, progress));
  const percentText = Math.min(100, Math.max(1, Math.round(pct * 100)));
  const circumference = 2 * Math.PI * 20; // r=20 -> 125.66
  const dashOffset = circumference * (1 - pct);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 14 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.94 }}
            title={`Back to top (${percentText}%)`}
            aria-label={`Back to top of page (${percentText}% scrolled)`}
            className="group relative w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_28px_rgba(29,29,31,0.12)] flex flex-col items-center justify-center transition-colors duration-300 cursor-pointer select-none focus:outline-none"
          >
            {/* Radial Progress SVG Ring */}
            <svg
              viewBox="0 0 48 48"
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(29, 29, 31, 0.06)"
                strokeWidth="2.2"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#0859D4"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray={circumference.toFixed(2)}
                strokeDashoffset={dashOffset.toFixed(2)}
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            <motion.span
              animate={
                isLaunching
                  ? { y: [-2, -10, 8, 0], opacity: [1, 0, 0, 1] }
                  : { y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center justify-center leading-none"
            >
              <svg
                className="w-3.5 h-3.5 text-[#1D1D1F] group-hover:text-[#0859D4] group-hover:-translate-y-0.5 transition-all duration-200"
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
              <span className="font-mono text-[8px] font-bold text-[#6E6E73] group-hover:text-[#0859D4] tabular-nums mt-0.5">
                {percentText}%
              </span>
            </motion.span>
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
          className="fixed bottom-7 left-7 z-40 hidden sm:flex items-center gap-3 pl-3.5 pr-1.5 py-1.5 rounded-full bg-white/95 border border-black/10 hover:border-[#0859D4]/50 backdrop-blur-2xl shadow-[0_10px_28px_rgba(29,29,31,0.12)] cursor-pointer group select-none"
        >
          <span
            aria-hidden="true"
            className="w-6 h-6 rounded-full bg-[#0859D4]/10 border border-[#0859D4]/25 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-12 group-hover:scale-110"
          >
            <BrandMark className="w-3.5 h-3.5" strokeWidth={2.1} />
          </span>
          <span className="px-4 py-2 rounded-full bg-[#F5F5F7] group-hover:bg-[#0859D4] text-[#0859D4] group-hover:text-white font-heading font-semibold text-xs tracking-tight transition-all duration-300">
            Explore Cohorts
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Minimalist Studio Splash Screen (Light Aesthetic)
 * - Zero React re-renders during 0% -> 100% progress via direct DOM manipulation
 * - Synchronized orbital progress arc + precision linear rail
 * - Snappy 480ms ease-out sweep with crisp upward settle
 */
export function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const pctTextRef = useRef(null);
  const ringRef = useRef(null);
  const barRef = useRef(null);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      if (onFinishRef.current) onFinishRef.current();
      return undefined;
    }

    // Safety fallback: guaranteed to dismiss after 1.2s max so it can NEVER get stuck
    const safetyTimer = setTimeout(() => {
      setOpening(true);
      if (onFinishRef.current) onFinishRef.current();
      setTimeout(() => setVisible(false), 260);
    }, 1200);

    let rafId = 0;
    const start = performance.now();
    const loadDuration = 640;
    const ringCircumference = 150.8; // 2 * pi * 24

    const step = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / loadDuration);
      const eased = 1 - Math.pow(1 - p, 2.8);
      const currentPct = Math.min(100, Math.round(eased * 100));

      if (pctTextRef.current) {
        pctTextRef.current.textContent = `${String(currentPct).padStart(2, '0')}%`;
      }
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = `${(ringCircumference * (1 - eased)).toFixed(2)}`;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased.toFixed(4)})`;
      }

      if (p < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        clearTimeout(safetyTimer);
        setOpening(true);
        if (onFinishRef.current) onFinishRef.current();
        setTimeout(() => {
          setVisible(false);
        }, 280);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Campus Learn"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Subtle studio dot pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(29, 29, 31, 0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Minimalist ambient cobalt aura */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(540px 360px at 50% 45%, rgba(8, 89, 212, 0.06), rgba(24, 160, 251, 0.025) 48%, transparent 72%)',
            }}
          />

          {/* Centered Studio Composition */}
          <motion.div
            animate={
              opening
                ? { opacity: 0, y: -10, scale: 0.985 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center px-6"
          >
            {/* Floating Dual-Ring Orbital Emblem */}
            <div className="relative w-16 h-16 flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-full bg-[#0859D4]/[0.06] blur-md" />
              <svg viewBox="0 0 60 60" className="relative w-16 h-16 fill-none overflow-visible">
                {/* Ambient dashed outer ring */}
                <circle
                  cx="30"
                  cy="30"
                  r="28"
                  stroke="rgba(8, 89, 212, 0.16)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  className="origin-center animate-[spin_12s_linear_infinite]"
                />
                {/* Faint base progress track */}
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="rgba(29, 29, 31, 0.08)"
                  strokeWidth="2.2"
                />
                {/* Dynamic cobalt sweep arc */}
                <circle
                  ref={ringRef}
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="#0859D4"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="150.8"
                  strokeDashoffset="150.8"
                  transform="rotate(-90 30 30)"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(8, 89, 212, 0.25))' }}
                />
                {/* Crisp white inner medallion */}
                <circle
                  cx="30"
                  cy="30"
                  r="17"
                  fill="#FFFFFF"
                  stroke="rgba(29, 29, 31, 0.07)"
                  strokeWidth="1"
                />
                {/* Brand geometric mark */}
                <g transform="translate(18, 18)">
                  <path
                    d="M17.2 6.8A7.5 7.5 0 1 0 19 14.2"
                    stroke="#1D1D1F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8.5 14.5L13 10L17.5 14.5"
                    stroke="#0859D4"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="17.5" cy="7.5" r="2" fill="#0859D4" />
                </g>
              </svg>
            </div>

            {/* Clean Typographic Wordmark */}
            <div className="mb-5 flex items-baseline gap-1.5">
              <span className="font-heading font-semibold text-2xl sm:text-[26px] tracking-[-0.03em] text-[#1D1D1F]">
                Campus
              </span>
              <span className="font-grail-serif italic text-[27px] sm:text-[30px] text-[#0859D4] tracking-[-0.01em] leading-none">
                Learn
              </span>
            </div>

            {/* Precision Progress Rail */}
            <div className="w-44 sm:w-48 h-[2.5px] rounded-full bg-black/[0.07] overflow-hidden mb-2.5">
              <div
                ref={barRef}
                className="h-full w-full origin-left bg-gradient-to-r from-[#0859D4] via-[#1A59F9] to-[#38BDF8] will-change-transform"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            {/* Micro Status Readout */}
            <div className="w-44 sm:w-48 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E6E73]">
              <span>Loading</span>
              <span ref={pctTextRef} className="tabular-nums text-[#1D1D1F] font-medium">
                00%
              </span>
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

    const wake = () => {
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      wake();
    };

    const loop = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        rafId = 0;
      } else {
        currentX += dx * 0.18;
        currentY += dy * 0.18;
        rafId = requestAnimationFrame(loop);
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
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
          'radial-gradient(circle, rgba(8, 89, 212, 0.055) 0%, rgba(24, 160, 251, 0.02) 38%, transparent 68%)',
      }}
    />
  );
}


/**
 * Unified SmoothScroll Engine: Locomotive Scroll v5 + Lenis + GSAP ScrollTrigger.
 * - Calibrated duration (0.88s) and wheel multiplier (1.05) for crisp inertia
 * - Runs Lenis & Locomotive [data-scroll] inside GSAP's ticker with ScrollTrigger.update
 * - Refreshes scroll elements across SPA navigation automatically
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let tickerFn = null;
    const locomotive = new LocomotiveScroll({
      lenisOptions: {
        duration: 0.88,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.0,
        syncTouch: false,
      },
      scrollCallback: () => {
        ScrollTrigger.update();
      },
      initCustomTicker: (render) => {
        tickerFn = () => render();
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);
      },
      destroyCustomTicker: () => {
        if (tickerFn) {
          gsap.ticker.remove(tickerFn);
          tickerFn = null;
        }
      },
    });

    window.__locomotive = locomotive;
    window.__lenis = locomotive.lenisInstance;
    document.documentElement.classList.add('lenis', 'locomotive-ready');

    let refreshTimer = 0;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        try {
          locomotive.removeScrollElements(document.body);
          locomotive.addScrollElements(document.body);
          locomotive.resize();
          ScrollTrigger.refresh();
        } catch {
          // Ignore teardown race during unmount
        }
      }, 220);
    };

    const rootEl = document.getElementById('root') || document.body;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList' && m.addedNodes.length > 0) {
          scheduleRefresh();
          break;
        }
      }
    });
    observer.observe(rootEl, { childList: true, subtree: true });

    window.addEventListener('popstate', scheduleRefresh);

    return () => {
      window.clearTimeout(refreshTimer);
      observer.disconnect();
      window.removeEventListener('popstate', scheduleRefresh);
      locomotive.destroy();
      delete window.__locomotive;
      delete window.__lenis;
      document.documentElement.classList.remove('lenis', 'locomotive-ready');
    };
  }, []);

  return null;
}

/**
 * Obsidian + Blaze Orange magnetic cursor.
 * - Core dot follows the pointer instantly; ring trails with spring easing.
 * - Ring morphs per context: hover (expand + ember fill), press (contract),
 *   text (I-beam), drag (chevrons), hidden when leaving the window.
 * - Direct transform on SVG ticks avoids expensive CSS variable invalidations.
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ticksRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (
      window.matchMedia?.('(pointer: coarse)').matches ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ticks = ticksRef.current;
    if (!dot || !ring) return undefined;

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let mode = 'default';
    let pressed = false;
    let visible = false;
    let spin = 0;
    let rafId = 0;

    const INTERACTIVE =
      'a,button,[role="button"],select,summary,label[for],.cursor-pointer,[data-cursor="hover"]';
    const TEXT =
      'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]),textarea,[contenteditable="true"]';

    const applyMode = () => {
      ring.dataset.mode = mode;
      ring.dataset.pressed = pressed ? '1' : '0';
      dot.dataset.mode = mode;
    };

    const wakeLoop = () => {
      if (!rafId && visible) rafId = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      wakeLoop();
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      let next = 'default';
      if (t.closest(TEXT)) next = 'text';
      else if (t.closest('.cursor-grab, [data-cursor="drag"]')) next = 'drag';
      else if (t.closest(INTERACTIVE)) next = 'hover';
      if (next !== mode) {
        mode = next;
        applyMode();
      }
    };

    const onDown = () => {
      pressed = true;
      applyMode();
    };
    const onUp = () => {
      pressed = false;
      applyMode();
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const loop = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      const dx = pos.x - ringPos.x;
      const dy = pos.y - ringPos.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.15) {
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(loop);
      ringPos.x += dx * 0.22;
      ringPos.y += dy * 0.22;
      spin = (spin + 0.6 + Math.min(6, dist * 0.05)) % 360;

      // Velocity squash/stretch along motion direction
      const speed = Math.min(1, dist / 90);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const stretch = 1 + speed * 0.2;
      const squash = 1 - speed * 0.1;

      ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(1)}deg) scale(${stretch.toFixed(3)}, ${squash.toFixed(3)}) rotate(${(-angle).toFixed(1)}deg)`;
      if (ticks) {
        ticks.style.transform = `rotate(${spin.toFixed(1)}deg)`;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    applyMode();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cl-cursor-ring" style={{ opacity: 0 }}>
        <svg viewBox="0 0 48 48" className="cl-cursor-ring-svg">
          <circle cx="24" cy="24" r="21" className="cl-ring-base" />
          <g ref={ticksRef} className="cl-ring-ticks">
            <line x1="24" y1="1" x2="24" y2="6" />
            <line x1="24" y1="42" x2="24" y2="47" />
            <line x1="1" y1="24" x2="6" y2="24" />
            <line x1="42" y1="24" x2="47" y2="24" />
          </g>
          <g className="cl-ring-drag">
            <path d="M9 18l-6 6 6 6M39 18l6 6-6 6" />
          </g>
        </svg>
      </div>
      <div ref={dotRef} aria-hidden="true" className="cl-cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}

/**
 * Optimized Scroll-reveal for section headings and [data-reveal] elements.
 * - Debounced mutation scanner avoids layout thrashing
 * - Single observer instance with automatic unobserve once revealed
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const SELECTOR = 'main h2, main [data-reveal]';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cl-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    const seen = new WeakSet();
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.classList.add('cl-reveal');
        io.observe(el);
      });
    };

    scan();

    let moTimer = 0;
    const debouncedScan = () => {
      if (moTimer) return;
      moTimer = requestAnimationFrame(() => {
        moTimer = 0;
        scan();
      });
    };

    const mo = new MutationObserver(debouncedScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (moTimer) cancelAnimationFrame(moTimer);
    };
  }, []);

  return null;
}
