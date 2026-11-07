import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Music, Palette, Trophy, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  SplitTextReveal,
  ColonTitle,
  GrailScrollSheet,
  ScrambleText,
} from '../components/AnimatedText';

const CREST_ICONS = [
  { Icon: Code2, color: '#FF6B00', bg: 'rgba(255,107,0,0.18)' },
  { Icon: Music, color: '#A78BFA', bg: 'rgba(167,139,250,0.18)' },
  { Icon: Palette, color: '#FFA057', bg: 'rgba(255,160,87,0.18)' },
  { Icon: Trophy, color: '#34D399', bg: 'rgba(52,211,153,0.18)' },
  { Icon: Flame, color: '#F472B6', bg: 'rgba(244,114,182,0.18)' },
];

// Grail Section 5 Split-Row Journey Items (nr in grail-home.js adapted to CampusLearn)
const JOURNEY_ROWS = [
  {
    chance: 'To build at a senior’s table.',
    desc: 'You joined for one weekend sprint. Six weeks later you are shipping production code and leading a hackathon team with people you did not know last month.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
  },
  {
    chance: 'To skip the theory trap.',
    desc: 'No outdated slides, no attendance sheets. Just you and a senior who already cracked the internship or won the national fest showing you the real workflow.',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  },
  {
    chance: 'To find the society you walked past.',
    desc: 'An evening jam session on the hostel roof. A design critique room you never tried. The best mentors on campus were right there the whole time.',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  },
  {
    chance: 'To graduate with proof, not grades.',
    desc: 'Not a multiple-choice exam. Actual GitHub repos, live performances, design systems, and verified peer credentials that speak for themselves.',
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

  // Grail Split-Row Scroll Progress (--rp) + Horizontal Mouse-Tracking Photos
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let mouseX = -1;
    let mouseY = -1;
    const offsets = JOURNEY_ROWS.map(() => 0);

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateScrollRows = () => {
      const vh = window.innerHeight || 800;
      const children = listEl.children;
      for (let i = 0; i < children.length; i++) {
        const row = children[i];
        const rect = row.getBoundingClientRect();
        const rp = Math.min(1, Math.max(0, (vh * 0.92 - rect.top) / (vh * 0.45)));
        row.style.setProperty('--rp', rp.toFixed(3));
      }
    };

    let rafId = 0;
    const tickPhotos = () => {
      rafId = requestAnimationFrame(tickPhotos);
      if (prefersReduced || window.innerWidth < 768) return;

      const listRect = listEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const inView = listRect.bottom > 0 && listRect.top < vh;

      for (let i = 0; i < JOURNEY_ROWS.length; i++) {
        const photoEl = photoRefs.current[i];
        if (!photoEl) continue;
        let targetX = 0;
        if (inView && mouseX >= 0) {
          const r = photoEl.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const weight = 1 / (1 + Math.pow((mouseY - cy) / 140, 2));
          targetX = Math.max(-52, Math.min(52, (mouseX - cx) * 0.16)) * weight;
        }
        offsets[i] += (targetX - offsets[i]) * 0.12;
        photoEl.style.transform = `translateX(${offsets[i].toFixed(1)}px)`;
      }
    };

    updateScrollRows();
    window.addEventListener('scroll', updateScrollRows, { passive: true });
    window.addEventListener('resize', updateScrollRows, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(tickPhotos);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScrollRows);
      window.removeEventListener('resize', updateScrollRows);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <GrailScrollSheet className="p-6 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 right-1/4 w-[550px] h-[380px] bg-[#FF6B00]/[0.05] blur-3xl rounded-full pointer-events-none" />

          {/* Grail ColonTitle Chapter Header */}
          <ColonTitle
            label="About Journey & Architecture"
            chapter="Chapter 03"
          />

          {/* Grail Section 5 Header with Inline Cycling Crest (_s5head_bwga5_699) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-20">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-3">
                <ScrambleText text="03 // ARCHITECTURE OF LEARNING" />
              </span>

              <h2 className="font-grail-serif text-[clamp(38px,5.8vw,84px)] text-white leading-[0.88] tracking-[-0.01em]">
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
                      className="relative inline-flex items-center justify-center w-[0.86em] h-[0.86em] rounded-2xl border border-[#FF6B00]/45 bg-zinc-900/90 overflow-hidden mx-1 -translate-y-[0.06em] shadow-[0_0_24px_rgba(255,107,0,0.3)]"
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
                  className="block text-[#FFA057]"
                >
                  It rarely stays that way.
                </motion.span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-5"
            >
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed text-left lg:text-right max-w-sm">
                Campus Learn bootcamps and live code cohorts take weeks instead of semesters, designed to fit around university exams.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/explore')}
                className="btn-zephyr-secondary text-xs sm:text-sm px-5 py-2.5 group"
              >
                <span>Explore Student Cohorts</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </motion.div>
          </div>

          {/* 3 Dark Sleek Interactive Architecture Cards */}
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
              <div className="relative w-full h-44 rounded-2xl bg-zinc-950/90 border border-white/[0.07] flex items-center justify-center overflow-hidden group-hover:border-[#FF6B00]/40 transition-colors">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <line x1="100" y1="60" x2="40" y2="30" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                  <line x1="100" y1="60" x2="40" y2="90" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                  <line x1="100" y1="60" x2="160" y2="30" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                  <line x1="100" y1="60" x2="160" y2="90" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />

                  {[
                    { x2: 40, y2: 30, delay: 0 },
                    { x2: 40, y2: 90, delay: 0.6 },
                    { x2: 160, y2: 30, delay: 0.3 },
                    { x2: 160, y2: 90, delay: 0.9 },
                  ].map((b, i) => (
                    <motion.circle
                      key={i}
                      r="2.8"
                      fill="#FF6B00"
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

                  <circle cx="40" cy="30" r="9" fill="#121216" stroke="rgba(255,107,0,0.45)" strokeWidth="1.2" />
                  <circle cx="40" cy="90" r="9" fill="#121216" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                  <circle cx="160" cy="30" r="9" fill="#121216" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                  <circle cx="160" cy="90" r="9" fill="#121216" stroke="rgba(255,107,0,0.45)" strokeWidth="1.2" />

                  <circle
                    cx="100"
                    cy="60"
                    r="17"
                    fill="#141418"
                    stroke="#FF6B00"
                    strokeWidth="1.6"
                    className="group-hover:scale-110 transition-transform origin-center"
                  />
                  <circle cx="100" cy="60" r="7" fill="#FF6B00" />
                </svg>
              </div>

              <div className="pt-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B00] mb-1.5">
                  01 / Peer Network
                </div>
                <p className="font-heading text-base sm:text-lg font-bold text-zinc-200 leading-snug group-hover:text-white transition-colors">
                  From hostel laptops to production portfolios in 4 weeks.
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
              <div className="relative w-full h-44 rounded-2xl bg-zinc-950/90 border border-white/[0.07] flex items-center justify-center overflow-hidden group-hover:border-[#FF6B00]/40 transition-colors">
                <div className="relative z-10 w-11 h-11 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/60 flex items-center justify-center text-[#FF6B00] text-sm font-mono font-bold shadow-[0_0_24px_rgba(255,107,0,0.35)]">
                  +
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-32 h-32 rounded-full border border-dashed border-white/15 group-hover:border-[#FF6B00]/40 transition-colors"
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
                        className="w-7 h-7 rounded-full bg-zinc-900 border border-white/25 group-hover:border-[#FF6B00]/60 flex items-center justify-center font-mono text-[10px] font-bold text-zinc-200 shadow-md"
                      >
                        {node.label}
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="pt-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B00] mb-1.5">
                  02 / Multi-Domain
                </div>
                <p className="font-heading text-base sm:text-lg font-bold text-zinc-200 leading-snug group-hover:text-white transition-colors">
                  Bring your own craft—no rigid lock-in, full flexibility across domains.
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
              <div className="relative w-full h-44 rounded-2xl bg-zinc-950/90 border border-white/[0.07] flex items-center justify-center overflow-hidden group-hover:border-[#FF6B00]/40 transition-colors">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <line x1="20" y1="30" x2="180" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="50" y1="10" x2="50" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="150" y1="10" x2="150" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  <path
                    d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <motion.path
                    d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                    fill="none"
                    stroke="#FF6B00"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <circle cx="30" cy="90" r="4" fill="#A1A1AA" />
                  <circle cx="160" cy="40" r="5" fill="#FF6B00" />
                  <circle
                    cx="160"
                    cy="40"
                    r="10"
                    fill="none"
                    stroke="rgba(255,107,0,0.5)"
                    strokeWidth="1.2"
                    className="animate-ping"
                  />
                </svg>
              </div>

              <div className="pt-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B00] mb-1.5">
                  03 / Fast Track
                </div>
                <p className="font-heading text-base sm:text-lg font-bold text-zinc-200 leading-snug group-hover:text-white transition-colors">
                  Domain agnostic—master what works best for your career aspirations.
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
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/5 via-[#FF6B00]/45 to-white/5 transition-transform duration-150"
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
                    <p className="text-xs font-mono uppercase tracking-wider text-[#FF6B00]/90">
                      A chance
                    </p>
                    <p className="font-heading text-lg sm:text-xl font-bold text-white leading-tight mt-1">
                      {row.chance}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-zinc-500 mt-auto pb-2">
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
                        className="w-[175px] sm:w-[205px] h-[112px] sm:h-[130px] object-cover rounded-[14px] shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
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
                  className="text-zinc-400 text-sm sm:text-[15px] leading-[1.35] max-w-sm md:justify-self-end self-center"
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
