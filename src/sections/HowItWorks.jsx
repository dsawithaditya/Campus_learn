import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Music, Trophy, Sparkles, Layers, Cpu, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-white/[0.02] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header matching Zephyr Screenshot 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Master skills in <br />
              <span className="text-zinc-400">any environment</span>
            </h2>
          </motion.div>

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
            <button
              onClick={() => navigate('/explore')}
              className="btn-zephyr-secondary text-xs sm:text-sm px-5 py-2.5"
            >
              <span>Explore Student Cohorts</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70" />
            </button>
          </motion.div>
        </div>

        {/* 3 Dark Sleek Cards matching Zephyr Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Network Graph Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="zephyr-card rounded-3xl p-8 flex flex-col justify-between h-[390px] sm:h-[420px] group cursor-pointer"
            onClick={() => navigate('/explore?category=tech')}
          >
            {/* Visual Diagram Box */}
            <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-white/15 transition-colors">
              {/* SVG Network Tree */}
              <svg viewBox="0 0 200 120" className="w-full h-full opacity-80">
                <line x1="100" y1="60" x2="40" y2="35" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="40" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="160" y2="35" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <line x1="100" y1="60" x2="160" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                {/* Outer Nodes */}
                <circle cx="40" cy="35" r="8" fill="#18181b" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <circle cx="40" cy="85" r="8" fill="#18181b" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <circle cx="160" cy="35" r="8" fill="#18181b" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <circle cx="160" cy="85" r="8" fill="#18181b" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                {/* Central Emblem Node */}
                <circle cx="100" cy="60" r="16" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" className="group-hover:scale-110 transition-transform origin-center" />
                <circle cx="100" cy="60" r="8" fill="#ffffff" opacity="0.9" />
              </svg>
            </div>

            {/* Description */}
            <div className="pt-6">
              <p className="text-sm sm:text-base font-medium text-zinc-300 leading-snug group-hover:text-white transition-colors">
                From development machines to production portfolios in 4 weeks.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Radial Hub Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="zephyr-card rounded-3xl p-8 flex flex-col justify-between h-[390px] sm:h-[420px] group cursor-pointer"
            onClick={() => navigate('/explore')}
          >
            {/* Visual Diagram Box */}
            <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-white/15 transition-colors">
              {/* Radial Orbit Graphic */}
              <div className="relative w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
                {/* Center Core */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/40 flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>

                {/* Orbiting Satellite Dots */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-[10px] text-zinc-300">
                  AI
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-[10px] text-zinc-300">
                  UI
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-[10px] text-zinc-300">
                  3D
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-[10px] text-zinc-300">
                  ML
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6">
              <p className="text-sm sm:text-base font-medium text-zinc-300 leading-snug group-hover:text-white transition-colors">
                Bring your own craft—no rigid lock-in, full flexibility across domains.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Pathway Track Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="zephyr-card rounded-3xl p-8 flex flex-col justify-between h-[390px] sm:h-[420px] group cursor-pointer"
            onClick={() => navigate('/teach')}
          >
            {/* Visual Diagram Box */}
            <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-white/15 transition-colors">
              {/* Circuit Grid & Glowing Pathway */}
              <svg viewBox="0 0 200 120" className="w-full h-full opacity-80">
                <line x1="20" y1="30" x2="180" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="20" y1="60" x2="180" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="50" y1="10" x2="50" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="150" y1="10" x2="150" y2="110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* Glowing Smooth Curve */}
                <path
                  d="M 30 90 L 70 90 C 90 90, 90 40, 110 40 L 160 40"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Glowing Checkpoint Node */}
                <circle cx="160" cy="40" r="5" fill="#ffffff" />
                <circle cx="160" cy="40" r="10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" className="animate-ping" />
              </svg>
            </div>

            {/* Description */}
            <div className="pt-6">
              <p className="text-sm sm:text-base font-medium text-zinc-300 leading-snug group-hover:text-white transition-colors">
                Domain agnostic, master what works best for your career aspirations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
