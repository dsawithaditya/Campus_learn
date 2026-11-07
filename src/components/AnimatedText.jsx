import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView as useFramerInView, useMotionValue, useSpring } from 'framer-motion';

const GRAIL_EASE = [0.22, 1, 0.36, 1];

/**
 * Grail-style Staggered Word Reveal with 3D masked slide-up
 * Uses Grail's signature cubic-bezier(0.22, 1, 0.36, 1) easing
 */
export function SplitTextReveal({
  text = '',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  once = true,
  as: Component = 'span',
}) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once, amount: 0.2 });
  const words = String(text).split(' ');

  return (
    <Component ref={ref} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0 pb-[0.09em] -mb-[0.09em] px-[0.02em] -mx-[0.02em]"
        >
          <motion.span
            initial={{ y: '115%', opacity: 0 }}
            animate={
              isInView
                ? { y: '0%', opacity: 1 }
                : { y: '115%', opacity: 0 }
            }
            transition={{
              duration: 0.72,
              delay: delay + idx * stagger,
              ease: GRAIL_EASE,
            }}
            className={`inline-block will-change-transform ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

/**
 * Grail's Signature Per-Letter Rise (_headline_bwga5_473 / _letter_bwga5_500)
 */
export function GrailLetterRise({
  text = '',
  delay = 0,
  stagger = 0.032,
  className = '',
  letterClassName = '',
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once, amount: 0.2 });
  const words = String(text).split(' ');
  let charIndex = 0;

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wIdx) => (
        <React.Fragment key={`w-${wIdx}`}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch, cIdx) => {
              const currentIdx = charIndex++;
              return (
                <motion.span
                  key={`c-${cIdx}`}
                  aria-hidden="true"
                  initial={{ opacity: 0, y: '0.62em' }}
                  animate={
                    isInView
                      ? { opacity: 1, y: '0em' }
                      : { opacity: 0, y: '0.62em' }
                  }
                  transition={{
                    duration: 0.62,
                    delay: delay + currentIdx * stagger,
                    ease: GRAIL_EASE,
                  }}
                  className={`inline-block will-change-transform ${letterClassName}`}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wIdx < words.length - 1 && (
            <span className="inline-block w-[0.26em]" aria-hidden="true">
              {' '}
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

/**
 * Grail's ColonTitle Top Chapter Bar (_colontitle_1ghgf_1)
 * Left: "About [Section]" | Right: "Chapter 01"
 */
export function ColonTitle({
  label = 'About Campus Learn',
  chapter = 'Chapter 01',
  className = '',
  accent = false,
}) {
  return (
    <div
      aria-hidden="true"
      className={`grail-colontitle w-full mb-8 pb-3.5 border-b border-white/[0.08] ${className}`}
    >
      <span className="flex items-center gap-2 text-zinc-300 font-medium">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            accent
              ? 'bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]'
              : 'bg-[#FF6B00]/80'
          }`}
        />
        <span>{label}</span>
      </span>
      <span className="text-right font-mono text-xs tracking-wider uppercase text-zinc-400">
        {chapter}
      </span>
    </div>
  );
}

/**
 * Grail's Animated Parenthesized Number Counter: (01)
 * When `value` changes, the left `(` and right `)` spring outward!
 */
export function GrailParenCounter({ value = 1, className = '' }) {
  const leftParenRef = useRef(null);
  const rightParenRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const timing = {
      duration: 520,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    };
    leftParenRef.current?.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-0.38em)' },
        { transform: 'translateX(0)' },
      ],
      timing
    );
    rightParenRef.current?.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(0.38em)' },
        { transform: 'translateX(0)' },
      ],
      timing
    );
  }, [value]);

  const formatted = String(value).padStart(2, '0');

  return (
    <span
      className={`font-grail-serif inline-flex items-baseline select-none ${className}`}
    >
      <span ref={leftParenRef} className="inline-block text-[#FF6B00]/80">
        (
      </span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: '0.48em' }}
        animate={{ opacity: 1, y: '0em' }}
        transition={{ duration: 0.5, ease: GRAIL_EASE }}
        className="inline-block tabular-nums text-white mx-0.5"
      >
        {formatted}
      </motion.span>
      <span ref={rightParenRef} className="inline-block text-[#FF6B00]/80">
        )
      </span>
    </span>
  );
}

/**
 * Grail's Per-Character Hover Lift Wave (Nn in Grail)
 */
export function GrailHoverChars({ text = '', className = '' }) {
  return (
    <span className={`group-wave inline-block ${className}`}>
      {[...String(text)].map((ch, idx) => (
        <span
          key={idx}
          className="grail-char-wave"
          style={{ '--i': idx }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

/**
 * Grail's Scroll-Driven Sheet Peel Wrapper (_section5_bwga5_683)
 * Subtly scales and tilts a rounded architectural sheet as it enters/leaves viewport
 */
export function GrailScrollSheet({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Compute entry/exit progress similar to Grail's --s5off and --s5rot
      const enterProg = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.85)));
      const exitProg = Math.min(1, Math.max(0, (vh * 0.35 - rect.bottom) / (vh * 0.85)));
      const off = Math.max(1 - enterProg, exitProg);
      const rot = (1 - enterProg) * 1.4 - exitProg * 1.4;
      const scale = 1 - off * 0.045;
      el.style.transform = `perspective(1400px) rotateZ(${(rot * 0.45).toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`grail-sheet ${className}`}>
      {children}
    </div>
  );
}

/**
 * Interactive Character Scramble / Decode effect on view & hover
 */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+';

export function ScrambleText({
  text = '',
  className = '',
  scrambleOnHover = true,
  duration = 550,
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.4 });

  const triggerScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const target = String(text);
    const totalSteps = Math.max(10, target.length * 2);
    let step = 0;

    intervalRef.current = setInterval(() => {
      step += 1;
      const progress = step / totalSteps;
      const revealedCount = Math.floor(progress * target.length);

      const next = target
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < revealedCount) return target[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(next);

      if (step >= totalSteps) {
        clearInterval(intervalRef.current);
        setDisplayText(target);
      }
    }, duration / totalSteps);
  };

  useEffect(() => {
    if (isInView) {
      triggerScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, text]);

  return (
    <span
      ref={ref}
      onMouseEnter={scrambleOnHover ? triggerScramble : undefined}
      className={`inline-block ${className}`}
    >
      {displayText}
    </span>
  );
}

/**
 * Smooth Count-Up Number Animation when scrolled into view
 */
export function CountUpNumber({
  value = 100,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.35 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let rafId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Cubic ease out matching Grail's 1 - (1 - n)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * value);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, value, duration]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Magnetic Pull Wrapper for tactile cursor attraction
 */
export function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
