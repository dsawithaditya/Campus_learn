import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SplitTextReveal, ScrambleText } from '../components/AnimatedText';

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#FF6B00]/[0.035] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2.5">
              <ScrambleText text="03 // ARCHITECTURE OF LEARNING" />
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06]">
              <SplitTextReveal text="Master skills in" /> <br />
              <span className="text-zinc-400">
                <SplitTextReveal text="any" delay={0.18} />{' '}
              </span>
              <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.1em]">
                environment.
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-5"
          >
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed text-left lg:text-right max-w-md">
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

        {/* 3 Dark Sleek Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Animated Network Graph Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="zephyr-card rounded-3xl p-8 flex flex-col justify-between h-[390px] sm:h-[420px] group cursor-pointer"
            onClick={() => navigate('/explore?category=tech')}
          >
            {/* Visual Diagram Box */}
            <div className="relative w-full h-48 rounded-2xl bg-zinc-950/90 border border-white/[0.07] flex items-center justify-center overflow-hidden group-hover:border-[#FF6B00]/40 transition-colors">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                {/* Base Connections */}
                <line x1="100" y1="60" x2="40" y2="30" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="40" y2="90" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="160" y2="30" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="160" y2="90" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />

                {/* Animated Data Pulses along branches */}
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

                {/* Outer Nodes */}
                <circle cx="40" cy="30" r="9" fill="#121216" stroke="rgba(255,107,0,0.45)" strokeWidth="1.2" />
                <circle cx="40" cy="90" r="9" fill="#121216" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                <circle cx="160" cy="30" r="9" fill="#121216" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                <circle cx="160" cy="90" r="9" fill="#121216" stroke="rgba(255,107,0,0.45)" strokeWidth="1.2" />

                {/* Central Emblem Node */}
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

            {/* Description */}
            <div className="pt-6">
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
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="zephyr-card rounded-3xl p-8 flex flex-col justify-between h-[390px] sm:h-[420px] group cursor-pointer"
            onClick={() => navigate('/explore')}
          >
            {/* Visual Diagram Box */}
            <div className="relative w-full h-48 rounded-2xl bg-zinc-950/90 border border-white/[0.07] flex items-center justify-center overflow-hidden group-hover:border-[#FF6B00]/40 transition-colors">
              {/* Center Core */}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/60 flex items-center justify-center text-[#FF6B00] text-sm font-mono font-bold shadow-[0_0_24px_rgba(255,107,0,0.35)]">
                +
              </div>

              {/* Rotating Orbit Ring */}
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

            {/* Description */}
            <div className="pt-6">
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
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="zephyr-card rounded-3xl p-8 flex flex-col justify-between h-[390px] sm:h-[420px] group cursor-pointer"
            onClick={() => navigate('/teach')}
          >
            {/* Visual Diagram Box */}
            <div className="relative w-full h-48 rounded-2xl bg-zinc-950/90 border border-white/[0.07] flex items-center justify-center overflow-hidden group-hover:border-[#FF6B00]/40 transition-colors">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                <line x1="20" y1="30" x2="180" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="50" y1="10" x2="50" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="150" y1="10" x2="150" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* Base Dim Curve */}
                <path
                  d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Animated Glowing Trajectory Curve */}
                <motion.path
                  d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Start & End Nodes */}
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

            {/* Description */}
            <div className="pt-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B00] mb-1.5">
                03 / Fast Track
              </div>
              <p className="font-heading text-base sm:text-lg font-bold text-zinc-200 leading-snug group-hover:text-white transition-colors">
                Domain agnostic—master what works best for your career aspirations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
