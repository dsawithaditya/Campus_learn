import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView as useFramerInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * Awwwards-style Staggered Word Reveal with 3D masked slide-up
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
  const isInView = useFramerInView(ref, { once, amount: 0.25 });
  const words = String(text).split(' ');

  return (
    <Component ref={ref} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0 pb-[0.08em] -mb-[0.08em]"
        >
          <motion.span
            initial={{ y: '110%', opacity: 0, rotateZ: 3, filter: 'blur(4px)' }}
            animate={
              isInView
                ? { y: '0%', opacity: 1, rotateZ: 0, filter: 'blur(0px)' }
                : { y: '110%', opacity: 0, rotateZ: 3, filter: 'blur(4px)' }
            }
            transition={{
              duration: 0.65,
              delay: delay + idx * stagger,
              ease: [0.16, 1, 0.3, 1],
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
      // Expo ease out
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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

