import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Music, Palette, Trophy, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GrailScrollSheet,
} from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const CREST_ICONS = [
  { Icon: Code2, color: '#0859D4', bg: 'rgba(8,89,212,0.12)' },
  { Icon: Music, color: '#6465ED', bg: 'rgba(100,101,237,0.12)' },
  { Icon: Palette, color: '#EF5533', bg: 'rgba(239,85,51,0.12)' },
  { Icon: Trophy, color: '#1BC47D', bg: 'rgba(27,196,125,0.12)' },
  { Icon: Flame, color: '#DB2777', bg: 'rgba(219,39,119,0.12)' },
];

const JOURNEY_ROWS = [
  {
    chance: 'Build at a senior’s table.',
    desc: 'Join a weekend sprint, ship real work, and build alongside peers.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
  },
  {
    chance: 'Skip the theory trap.',
    desc: 'No outdated slides—just seniors showing you the real workflow.',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  },
  {
    chance: 'Find your campus society.',
    desc: 'Jam sessions, design critiques, and mentors right on your campus.',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    chance: 'Graduate with proof.',
    desc: 'Shipped repos, live performances, design systems, and peer credentials.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
  },
];

export function HowItWorks() {
  const navigate = useNavigate();
  const [crestIdx, setCrestIdx] = useState(0);
  const listRef = useRef(null);
  const photoRefs = useRef([]);

  // Grail Inline Crest Cycling every 1.4s (ar in grail-home.js)
  useEffect(() => {
    const id = setInterval(() => {
      setCrestIdx((prev) => (prev + 1) % CREST_ICONS.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // GSAP ScrollTrigger Split-Row Progress (--rp) + GPU-only quickTo Mouse-Tracking Photos
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const rows = listEl.querySelectorAll(':scope > div');
      rows.forEach((row) => {
        if (prefersReduced) {
          row.style.setProperty('--rp', '1');
          return;
        }
        gsap.fromTo(
          row,
          { '--rp': 0.25 },
          {
            '--rp': 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 94%',
              end: 'top 48%',
              scrub: 0.35,
            },
          }
        );
      });
    }, listEl);

    if (prefersReduced) {
      return () => ctx.revert();
    }

    const xSetters = photoRefs.current.map((el) =>
      el ? gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }) : null
    );

    let cachedRects = [];
    const measureRects = () => {
      cachedRects = photoRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    };

    const onPointerMove = (e) => {
      if (window.innerWidth < 768) return;
      if (cachedRects.length === 0) measureRects();
      for (let i = 0; i < JOURNEY_ROWS.length; i++) {
        const setter = xSetters[i];
        const r = cachedRects[i];
        if (!setter || !r) continue;
        const weight = 1 / (1 + Math.pow((e.clientY - r.cy) / 150, 2));
        const targetX = Math.max(-44, Math.min(44, (e.clientX - r.cx) * 0.14)) * weight;
        setter(targetX);
      }
    };

    const onPointerLeave = () => {
      xSetters.forEach((setter) => setter?.(0));
    };

    const invalidateRects = () => {
      cachedRects = [];
    };

    listEl.addEventListener('pointermove', onPointerMove, { passive: true });
    listEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('scroll', invalidateRects, { passive: true });
    window.addEventListener('resize', invalidateRects, { passive: true });

    return () => {
      ctx.revert();
      listEl.removeEventListener('pointermove', onPointerMove);
      listEl.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', invalidateRects);
      window.removeEventListener('resize', invalidateRects);
    };
  }, []);

  return (
    <section id="how-it-works" className="relative py-8 sm:py-12 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <GrailScrollSheet className="p-6 sm:p-10 lg:p-14 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 right-1/4 w-[550px] h-[380px] bg-[#0859D4]/[0.05] blur-3xl rounded-full pointer-events-none" />

          {/* Section Header with Inline Cycling Crest */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-8">
              <h1 className="font-grail-serif text-[clamp(38px,5.6vw,78px)] text-[#1D1D1F] leading-[0.88] tracking-[-0.01em]">
                <motion.span
                  initial={{ opacity: 0, y: '0.42em' }}
                  whileInView={{ opacity: 1, y: '0em' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  It starts as one{' '}
                  <span className="inline-flex items-center whitespace-nowrap align-middle">
                    <span
                      aria-hidden="true"
                      className="relative inline-flex items-center justify-center w-[0.86em] h-[0.86em] rounded-2xl border border-[#0859D4]/30 bg-white overflow-hidden mx-1 -translate-y-[0.06em] shadow-[0_8px_24px_rgba(8,89,212,0.14)]"
                    >
                      {CREST_ICONS.map((item, idx) => {
                        const Icon = item.Icon;
                        const isActive = idx === crestIdx;
                        return (
                          <span
                            key={idx}
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'translateY(0%)' : 'translateY(45%)',
                              transition:
                                'opacity 0.52s, transform 0.52s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Icon
                              className="w-[54%] h-[54%]"
                              style={{ color: item.color }}
                            />
                          </span>
                        );
                      })}
                    </span>{' '}
                    cohort.
                  </span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: '0.42em' }}
                  whileInView={{ opacity: 1, y: '0em' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block text-[#0859D4]"
                >
                  It rarely stays that way.
                </motion.span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-5"
            >
              <p className="text-sm text-[#6E6E73] font-normal leading-relaxed text-left lg:text-right max-w-xs">
                Short cohorts built around your semester schedule.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/explore')}
                className="btn-zephyr-secondary text-xs sm:text-sm px-5 py-2.5 group"
              >
                <span>Explore Cohorts</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </motion.div>
          </div>

          {/* 3 Clean Interactive Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-16">
            {/* Card 1: Animated Network Graph Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="zephyr-card rounded-3xl p-7 flex flex-col justify-between h-[370px] sm:h-[395px] group cursor-pointer"
              onClick={() => navigate('/explore?category=tech')}
            >
              <div className="relative w-full h-44 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center overflow-hidden group-hover:border-[#0859D4]/40 transition-colors">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <line x1="100" y1="60" x2="40" y2="30" stroke="rgba(29,29,31,0.14)" strokeWidth="1.5" />
                  <line x1="100" y1="60" x2="40" y2="90" stroke="rgba(29,29,31,0.14)" strokeWidth="1.5" />
                  <line x1="100" y1="60" x2="160" y2="30" stroke="rgba(29,29,31,0.14)" strokeWidth="1.5" />
                  <line x1="100" y1="60" x2="160" y2="90" stroke="rgba(29,29,31,0.14)" strokeWidth="1.5" />

                  {[
                    { x2: 40, y2: 30, delay: 0 },
                    { x2: 40, y2: 90, delay: 0.6 },
                    { x2: 160, y2: 30, delay: 0.3 },
                    { x2: 160, y2: 90, delay: 0.9 },
                  ].map((b, i) => (
                    <motion.circle
                      key={i}
                      r="2.8"
                      fill="#0859D4"
                      initial={{ cx: 100, cy: 60, opacity: 0 }}
                      animate={{
                        cx: [100, b.x2],
                        cy: [60, b.y2],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        delay: b.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}

                  <circle cx="40" cy="30" r="9" fill="#FFFFFF" stroke="rgba(8,89,212,0.45)" strokeWidth="1.2" />
                  <circle cx="40" cy="90" r="9" fill="#FFFFFF" stroke="rgba(29,29,31,0.22)" strokeWidth="1.2" />
                  <circle cx="160" cy="30" r="9" fill="#FFFFFF" stroke="rgba(29,29,31,0.22)" strokeWidth="1.2" />
                  <circle cx="160" cy="90" r="9" fill="#FFFFFF" stroke="rgba(8,89,212,0.45)" strokeWidth="1.2" />

                  <circle
                    cx="100"
                    cy="60"
                    r="17"
                    fill="#FFFFFF"
                    stroke="#0859D4"
                    strokeWidth="1.6"
                    className="group-hover:scale-110 transition-transform origin-center"
                  />
                  <circle cx="100" cy="60" r="7" fill="#0859D4" />
                </svg>
              </div>

              <div className="pt-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#0859D4] mb-1.5">
                  01 / Peer Network
                </div>
                <p className="font-heading text-base sm:text-lg font-bold text-[#1D1D1F] leading-snug group-hover:text-[#0859D4] transition-colors">
                  Ship portfolio-ready work in 4 weeks.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Animated Radial Orbit Hub Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="zephyr-card rounded-3xl p-7 flex flex-col justify-between h-[370px] sm:h-[395px] group cursor-pointer"
              onClick={() => navigate('/explore')}
            >
              <div className="relative w-full h-44 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center overflow-hidden group-hover:border-[#0859D4]/40 transition-colors">
                <div className="relative z-10 w-11 h-11 rounded-full bg-[#0859D4]/10 border border-[#0859D4]/45 flex items-center justify-center text-[#0859D4] text-sm font-mono font-bold shadow-[0_6px_18px_rgba(8,89,212,0.16)]">
                  +
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-32 h-32 rounded-full border border-dashed border-black/[0.15] group-hover:border-[#0859D4]/40 transition-colors"
                >
                  {[
                    { label: 'AI', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                    { label: 'UI', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                    { label: '3D', pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' },
                    { label: 'ML', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2' },
                  ].map((node) => (
                    <div key={node.label} className={`absolute ${node.pos}`}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                        className="w-7 h-7 rounded-full bg-white border border-black/15 group-hover:border-[#0859D4]/55 flex items-center justify-center font-mono text-[10px] font-bold text-[#1D1D1F] shadow-sm"
                      >
                        {node.label}
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="pt-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#0859D4] mb-1.5">
                  02 / Multi-Domain
                </div>
                <p className="font-heading text-base sm:text-lg font-bold text-[#1D1D1F] leading-snug group-hover:text-[#0859D4] transition-colors">
                  Flexible learning across all 8 campus domains.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Animated Pathway Track Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="zephyr-card rounded-3xl p-7 flex flex-col justify-between h-[370px] sm:h-[395px] group cursor-pointer"
              onClick={() => navigate('/teach')}
            >
              <div className="relative w-full h-44 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center overflow-hidden group-hover:border-[#0859D4]/40 transition-colors">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <line x1="20" y1="30" x2="180" y2="30" stroke="rgba(29,29,31,0.06)" strokeWidth="1" />
                  <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(29,29,31,0.06)" strokeWidth="1" />
                  <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(29,29,31,0.06)" strokeWidth="1" />
                  <line x1="50" y1="10" x2="50" y2="110" stroke="rgba(29,29,31,0.06)" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(29,29,31,0.06)" strokeWidth="1" />
                  <line x1="150" y1="10" x2="150" y2="110" stroke="rgba(29,29,31,0.06)" strokeWidth="1" />

                  <path
                    d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                    fill="none"
                    stroke="rgba(29,29,31,0.18)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <motion.path
                    d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                    fill="none"
                    stroke="#0859D4"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <circle cx="30" cy="90" r="4" fill="#6E6E73" />
                  <circle cx="160" cy="40" r="5" fill="#0859D4" />
                  <circle
                    cx="160"
                    cy="40"
                    r="10"
                    fill="none"
                    stroke="rgba(8,89,212,0.45)"
                    strokeWidth="1.2"
                    className="animate-ping"
                  />
                </svg>
              </div>

              <div className="pt-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#0859D4] mb-1.5">
                  03 / Fast Track
                </div>
                <p className="font-heading text-base sm:text-lg font-bold text-[#1D1D1F] leading-snug group-hover:text-[#0859D4] transition-colors">
                  Master practical skills directly with seniors.
                </p>
              </div>
            </motion.div>
          </div>

          {/* GRAIL SECTION 5 INTERACTIVE 3-COLUMN SPLIT-ROW LIST (_s5list_bwga5_755) */}
          <div ref={listRef} className="mt-8 space-y-2">
            {JOURNEY_ROWS.map((row, idx) => (
              <div
                key={idx}
                style={{ '--rp': 1 }}
                className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-5 md:gap-[5%] min-h-[155px] pt-5 pb-4"
              >
                {/* Top Center-Scaling Hairline Border (_s5row:before) */}
                <div
                  aria-hidden="true"
                  style={{
                    transform: 'scaleX(var(--rp, 1))',
                    transformOrigin: '50% 50%',
                  }}
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-black/[0.04] via-[#0859D4]/40 to-black/[0.04] transition-transform duration-150"
                />

                {/* Left Column: Chance Label + Bold Outcome + Index Number */}
                <div
                  style={{
                    opacity: 'var(--rp, 1)',
                    transform: 'translateX(calc((1 - var(--rp, 1)) * 6vw))',
                  }}
                  className="flex flex-row md:flex-col justify-between max-w-sm"
                >
                  <div>
                    <p className="font-heading text-lg sm:text-xl font-bold text-[#1D1D1F] leading-tight">
                      {row.chance}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-[#6E6E73] mt-auto pb-2">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                </div>

                {/* Center Column: Clip-Path Reveal + Mouse-Following Photo (_s5photo_bwga5_805) */}
                <div className="flex items-start justify-start md:justify-center">
                  <div
                    ref={(el) => {
                      photoRefs.current[idx] = el;
                    }}
                    className="will-change-transform"
                  >
                    <div
                      style={{
                        opacity: 'var(--rp, 1)',
                        transform: 'scale(calc(0.93 + var(--rp, 1) * 0.07))',
                      }}
                      className="transition-transform duration-200"
                    >
                      <img
                        src={row.img}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-[175px] sm:w-[205px] h-[112px] sm:h-[130px] object-cover rounded-[14px] shadow-[0_12px_30px_rgba(29,29,31,0.14)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Narrative Description (_s5desc_bwga5_813) */}
                <p
                  style={{
                    opacity: 'var(--rp, 1)',
                    transform: 'translateX(calc((1 - var(--rp, 1)) * -6vw))',
                  }}
                  className="text-[#424242] text-sm sm:text-[15px] leading-[1.35] max-w-sm md:justify-self-end self-center"
                >
                  {row.desc}
                </p>
              </div>
            ))}
          </div>
        </GrailScrollSheet>
      </div>
    </section>
  );
}

export default HowItWorks;
