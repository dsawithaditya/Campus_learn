import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MentorCard } from '../components/MentorCard';
import {
  SplitTextReveal,
  ColonTitle,
  GrailParenCounter,
  ScrambleText,
  Magnetic,
} from '../components/AnimatedText';
import mentorsData from '../data/mentors.json';

export function Mentors() {
  const navigate = useNavigate();
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];
  const spotlightMentors = safeMentors.slice(0, 6);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeMentor = spotlightMentors[activeIdx] || spotlightMentors[0];

  const handleStageCycle = (dir) => {
    if (spotlightMentors.length === 0) return;
    setActiveIdx((prev) => (prev + dir + spotlightMentors.length) % spotlightMentors.length);
  };

  return (
    <section id="mentors" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[350px] bg-[#FF6B00]/[0.04] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Grail ColonTitle Chapter Header */}
        <ColonTitle
          label="About Senior Mentors & Domain Leads"
          chapter="Chapter 04"
        />

        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2">
              <ScrambleText text="04 // CAMPUS MENTORSHIP" />
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.06]">
              <SplitTextReveal text="Learn Directly from" />{' '}
              <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.1em]">
                Seniors
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Club heads, national hackathon winners, and collegiate fest leads ready to guide you 1-on-1.
            </p>
          </div>

          <Magnetic strength={0.18} className="self-start md:self-auto">
            <InteractiveHoverButton
              text="Become a Mentor"
              onClick={() => navigate('/teach')}
              className="w-48 h-11 text-xs sm:text-sm border-white/20 hover:border-[#FF6B00]/70"
            />
          </Magnetic>
        </div>

        {/* GRAIL TOTEM-STYLE INTERACTIVE SPOTLIGHT STAGE (_totem_1pamk_1) */}
        {activeMentor && (
          <div className="relative rounded-[28px] bg-[#060608] border border-white/10 p-6 sm:p-10 mb-14 overflow-hidden select-none shadow-[0_28px_70px_rgba(0,0,0,0.9)]">
            {/* Ambient Stage Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full bg-radial-[circle,rgba(255,107,0,0.18)_0%,transparent_70%] blur-2xl pointer-events-none" />

            {/* Top Bar: One-liner Bio + Grail Animated (01) Parentheses Counter (_topbar_1pamk_164) */}
            <div className="relative z-10 flex items-start justify-between gap-6 mb-8 sm:mb-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeMentor.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading font-bold text-sm sm:text-lg text-zinc-200 max-w-xs leading-snug"
                >
                  {activeMentor.bio}
                </motion.p>
              </AnimatePresence>

              <GrailParenCounter
                value={activeIdx + 1}
                className="text-4xl sm:text-7xl"
              />
            </div>

            {/* Center Layered Typography + Portrait Stage (_nameBack, _stage, _nameFront) */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeft = e.clientX - rect.left < rect.width / 2;
                handleStageCycle(isLeft ? -1 : 1);
              }}
              title="Click left or right to cycle mentors"
              className="relative py-8 sm:py-12 flex flex-col items-center justify-center cursor-pointer group"
            >
              {/* Giant Background Uppercase Serif Name (_nameBack_1pamk_14) */}
              <div
                aria-hidden="true"
                className="font-grail-serif text-[clamp(48px,11vw,148px)] text-white/[0.14] leading-[0.86] tracking-[-0.01em] whitespace-nowrap pointer-events-none select-none mb-[-18px] sm:mb-[-32px] z-[1]"
              >
                <SplitTextReveal
                  key={`back-${activeMentor.id}`}
                  text={activeMentor.name}
                  stagger={0.07}
                />
              </div>

              {/* Center Interactive Portrait Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMentor.id}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/mentor/${activeMentor.id}`);
                  }}
                  className="relative z-[3] w-44 h-52 sm:w-52 sm:h-60 rounded-3xl p-1.5 bg-gradient-to-b from-[#FF6B00] via-[#FFA057]/50 to-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(255,107,0,0.3)] group/card"
                >
                  <img
                    src={activeMentor.avatar}
                    alt={activeMentor.name}
                    className="w-full h-full rounded-[20px] object-cover"
                  />
                  <div className="absolute inset-x-3 bottom-3 px-3 py-1.5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-mono font-bold text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {activeMentor.rating}
                    </span>
                    <span className="text-[#FF6B00] font-mono text-[11px] font-semibold flex items-center gap-0.5">
                      Profile <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Soft Radial Scrim (_scrim_1pamk_138) */}
              <div
                aria-hidden="true"
                className="w-3/4 h-16 bg-radial-[circle,rgba(0,0,0,0.85)_0%,transparent_70%] blur-xl pointer-events-none z-[2] -mt-6"
              />

              {/* Giant Foreground Domain Epithet (_nameFront_1pamk_13) */}
              <div className="font-grail-serif text-[clamp(32px,7vw,92px)] text-[#FFA057] leading-[0.88] tracking-[-0.01em] text-center z-[4] -mt-2 pointer-events-none">
                <SplitTextReveal
                  key={`front-${activeMentor.id}`}
                  text={activeMentor.expertise || 'Domain Lead'}
                  delay={0.1}
                  stagger={0.07}
                />
              </div>
            </div>

            {/* Hairline Divider (_divider_1pamk_203) */}
            <div className="h-[1px] w-full bg-white/15 my-6" />

            {/* Bottom Controls: Title + Grail Pill Selector (_bottom_1pamk_215) */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="font-grail-serif text-3xl sm:text-5xl text-white leading-[0.88]">
                  Top Mentors. <br />
                  <span className="text-[#FF6B00]">Pick your guide.</span>
                </h3>
              </div>

              <div className="flex flex-col gap-3 max-w-md">
                <p className="text-xs sm:text-sm text-zinc-400 leading-snug">
                  Pick a mentor in the craft you are trying to master. Click any pill below to inspect their domain focus.
                </p>
                <div
                  role="tablist"
                  aria-label="Spotlight Mentors"
                  className="flex flex-wrap gap-1.5"
                >
                  {spotlightMentors.map((m, idx) => {
                    const isOn = idx === activeIdx;
                    return (
                      <button
                        key={m.id || idx}
                        type="button"
                        role="tab"
                        aria-selected={isOn}
                        onClick={() => setActiveIdx(idx)}
                        className={`h-9 px-4 rounded-full font-heading text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isOn
                            ? 'bg-[#FF6B00] text-[#09090B] shadow-[0_0_20px_rgba(255,107,0,0.45)]'
                            : 'bg-white/[0.08] text-white hover:bg-white/[0.16]'
                        }`}
                      >
                        {m.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4 Mentor Cards Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeMentors?.slice(0, 4)?.map((mentor, idx) => (
            <motion.div
              key={mentor?.id || idx}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <MentorCard mentor={mentor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mentors;
