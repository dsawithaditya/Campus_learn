import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Sparkles,
  Code2,
  Users,
  Trophy,
  Mic2,
  Music,
  Flame,
  Palette,
  Camera,
  Gamepad2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ShapeGrid from '../components/ShapeGrid';
import { Modal } from '../components/Modal';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';
import { GrailSpiralDeck } from '../components/GrailSpiralDeck';
import {
  SplitTextReveal,
  GrailLetterRise,
  ColonTitle,
  ScrambleText,
  Magnetic,
} from '../components/AnimatedText';
import categoriesData from '../data/categories.json';

const iconMap = {
  tech: Code2,
  singing: Mic2,
  music: Music,
  dance: Flame,
  sports: Trophy,
  art: Palette,
  photography: Camera,
  gaming: Gamepad2,
};

const topDisciplines = [
  'Full-Stack & Systems Architecture',
  'Vocal Arts & Classical Riyaz',
  'Lo-Fi & Beat Production',
  'UI/UX & Design Systems',
  'Urban Hip-Hop & Footwork',
  'Athletic Conditioning & Agility',
  'Cinematic Video & Street Photo',
  'Tactical FPS & Game Sense',
  'Competitive Chess & Tactics',
  'Next.js 15 & Hackathon Sprints',
];

const highlightCards = [
  {
    icon: Code2,
    title: 'Live Cohorts',
    subtitle: 'Build real apps & fests',
    accent: true,
  },
  {
    icon: Users,
    title: 'Senior Mentors',
    subtitle: '1-on-1 peer guidance',
    accent: true,
  },
  {
    icon: Trophy,
    title: 'Verified Badges',
    subtitle: 'Portfolio ready proof',
    accent: true,
  },
  {
    icon: Sparkles,
    title: '10,000+ Students',
    subtitle: 'Across 50+ campus hubs',
    accent: false,
  },
];

// Grail Section 2 Staggered Offset Editorial Lines (rr in grail-home.js)
const manifestoLines = [
  { text: "Everyone's out", ml: 'lg:ml-[36vw]' },
  { text: "shipping. You're", ml: 'lg:ml-[18vw]' },
  { text: 'watching old slides', ml: 'lg:ml-[10vw]' },
  { text: 'on a screen.', ml: 'lg:ml-[34vw]' },
];

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();
  const headlineRef = useRef(null);

  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  // Grail Hero Headline scroll-linked scale & parallax (ar in grail-home.js)
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.willChange = 'transform, opacity';
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        const vh = window.innerHeight || 800;
        if (y > vh * 0.8) return;
        const prog = Math.min(1, Math.max(0, y / (vh * 0.65)));
        const scale = 1 - 0.24 * prog;
        const ty = -y * 0.14;
        const opacity = Math.max(0.15, 1 - prog * 0.85);
        el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(2);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative pt-24 sm:pt-28 pb-16 overflow-hidden min-h-screen">
      {/* Grail 3-Layer Progressive Top Blur Scrim (_scrim_bwga5_388) */}
      <div className="grail-scrim-top" aria-hidden="true">
        <div className="grail-scrim-b1" />
        <div className="grail-scrim-b2" />
        <div className="grail-scrim-grad" />
      </div>

      {/* Interactive ShapeGrid Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="rgba(255, 255, 255, 0.055)"
          hoverColor="#FF6B00"
          hoverFillColor="#FF6B00"
          fillOpacity={0.15}
          cellSize={44}
          speed={0.32}
          glow={0.4}
          clickCascade={true}
          fade={0.88}
          className="w-full h-full"
        />
      </div>

      {/* Ambient Radial Vignette & Blaze Orange Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[920px] h-[480px] bg-gradient-to-b from-[#FF6B00]/[0.16] via-[#F59E0B]/[0.06] to-transparent blur-3xl pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#070709_86%)] pointer-events-none z-[1]" />

      <div className="container-custom relative z-10">
        {/* Grail ColonTitle Chapter Header */}
        <ColonTitle
          label="One real-world cohort a week. Taught by campus seniors."
          chapter="Chapter 01"
          accent
        />

        {/* Main Hero Header */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto pt-2 pb-6">
          {/* Interactive Scramble Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/85 border border-white/15 hover:border-[#FF6B00]/60 backdrop-blur-xl text-xs font-semibold text-zinc-300 mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.6),0_0_16px_rgba(255,107,0,0.12)] transition-colors cursor-pointer select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
            </span>
            <span>Over 10,000+ Students Learning Directly From Seniors</span>
            <span className="text-zinc-600">•</span>
            <ScrambleText
              text="50+ TOP CAMPUSES"
              className="font-mono text-[11px] tracking-wider text-[#FF6B00] font-bold"
            />
          </motion.div>

          {/* Grail Monumental Per-Letter Rising Headline (_headline_bwga5_473) */}
          <div
            ref={headlineRef}
            className="w-full origin-center will-change-transform mb-6"
          >
            <div className="font-grail-serif text-[clamp(44px,8.2vw,112px)] text-white tracking-[-0.015em] leading-[0.88] mb-3 select-none">
              <GrailLetterRise
                text="RECLAIM YOUR CRAFT"
                delay={0.04}
                stagger={0.032}
              />
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-[44px] text-zinc-200 leading-[1.08] tracking-[-0.025em] max-w-3xl mx-auto">
              <SplitTextReveal
                text="The only sane way to"
                delay={0.22}
                stagger={0.05}
              />{' '}
              <span className="inline">
                <SplitTextReveal
                  text="learn from"
                  delay={0.38}
                  stagger={0.055}
                  wordClassName="text-shimmer-orange"
                />{' '}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-editorial italic font-normal text-[#FF6B00] text-[1.14em] tracking-normal inline-block drop-shadow-[0_0_28px_rgba(255,107,0,0.35)]"
                >
                  seniors.
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-sm sm:text-base text-zinc-400 max-w-xl mb-8 leading-relaxed font-normal"
          >
            Campus Learn pulls you out of autopilot with live, peer-led cohorts in tech, music, sports, and arts—taught directly by senior mentors from top colleges.
          </motion.p>

          {/* Magnetic & Spring-Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6"
          >
            <Magnetic strength={0.18} className="w-full sm:w-auto">
              <InteractiveHoverButton
                text="Start Learning Free"
                onClick={() => navigate('/signup')}
                className="w-full sm:w-56 h-12 text-sm border-white/20 hover:border-[#FF6B00]/70 shadow-lg shadow-[#FF6B00]/25"
              />
            </Magnetic>

            <Magnetic strength={0.18} className="w-full sm:w-auto">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/explore')}
                className="btn-zephyr-secondary text-sm font-medium px-7 py-3 cursor-pointer w-full sm:w-auto"
              >
                Explore Courses
              </motion.button>
            </Magnetic>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsVideoModalOpen(true)}
              className="group text-xs sm:text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-2.5 px-4 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#FF6B00] border border-white/15 group-hover:border-[#FF6B00] flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0)] group-hover:shadow-[0_0_20px_rgba(255,107,0,0.6)]">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              <span>How it works</span>
            </motion.button>
          </motion.div>

          {/* GRAIL CENTERPIECE: Interactive 3D Spiral Cohort Card Deck (_scene_bwga5_154) */}
          <GrailSpiralDeck />

          {/* Value Highlight Cards with Staggered Reveal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-4xl mt-6 mb-12">
            {highlightCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/explore')}
                  className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#FF6B00]/50 backdrop-blur-xl shadow-lg hover:shadow-[0_12px_30px_rgba(255,107,0,0.14)] transition-colors duration-300 text-left group cursor-pointer select-none"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      item.accent
                        ? 'bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00]'
                        : 'bg-white/10 border border-white/15 text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-heading text-sm font-bold text-white group-hover:text-[#FF6B00] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Infinite Scrolling Discipline Marquee Ticker */}
          <div className="pt-7 border-t border-white/[0.08] w-full overflow-hidden">
            <div className="font-mono uppercase tracking-[0.2em] text-[10px] font-semibold text-zinc-500 mb-4">
              Peer-Led Domains & Student Societies Across The Network
            </div>
            <div
              className="relative flex overflow-hidden w-full group"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              }}
            >
              <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center gap-8 py-1">
                {[...topDisciplines, ...topDisciplines].map((discipline, idx) => (
                  <div
                    key={`${discipline}-${idx}`}
                    className="inline-flex items-center gap-8 text-xs sm:text-sm font-heading font-semibold text-zinc-400 hover:text-white transition-colors cursor-default"
                  >
                    <span className="hover:text-[#FF6B00] transition-colors">{discipline}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GRAIL SECTION 2 MANIFESTO: Staggered Offset Editorial Lines (_section2_bwga5_184) */}
        <div className="relative py-20 sm:py-28 border-t border-white/[0.08]">
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">
            About The Loop
          </div>

          <div className="w-full">
            <div className="font-grail-serif text-[clamp(38px,6.2vw,88px)] text-white leading-[0.88] tracking-[-0.01em] space-y-1">
              {manifestoLines.map((line, idx) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, y: '0.5em' }}
                  whileInView={{ opacity: 1, y: '0em' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.08 + idx * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`${line.ml} whitespace-nowrap`}
                >
                  {idx === 1 ? (
                    <>
                      shipping. <span className="text-[#FF6B00] italic font-editorial lowercase">You&apos;re</span>
                    </>
                  ) : (
                    line.text
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.72, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-400 text-sm sm:text-base leading-[1.35] max-w-[420px] mt-8 lg:mt-12 lg:ml-[36vw]"
            >
              Same semester, over and over, until you can&apos;t tell them apart. You keep meaning to build the project, master the instrument, join the society—and somehow it&apos;s always next semester. Campus Learn pairs you directly with seniors who already cracked it.
            </motion.p>
          </div>
        </div>

        {/* CAMPUS DOMAINS - Explore Peer-Led Disciplines */}
        <div className="relative z-10 pt-14 pb-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2">
                <ScrambleText text="01 // CAMPUS DOMAINS" />
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-tight">
                <SplitTextReveal text="Explore Peer-Led" />{' '}
                <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.08em]">
                  Disciplines
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-lg">
                Hands-on live learning across engineering, design, arts, audio, and athletic mastery.
              </p>
            </div>
            <motion.button
              type="button"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/explore')}
              className="text-xs sm:text-sm font-heading font-semibold text-zinc-300 hover:text-[#FF6B00] flex items-center gap-1.5 group self-start sm:self-auto transition-colors cursor-pointer"
            >
              <span>View all courses</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* 8 Categories Grid in 4 Columns of 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {safeCategories.map((cat, index) => {
              const IconComponent = iconMap[cat?.id] || Code2;
              const accentColor = cat?.color || '#3b82f6';
              return (
                <motion.button
                  key={cat?.id || index}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => navigate(`/explore?category=${cat?.id}`)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative p-4 rounded-2xl flex items-center justify-between text-left group cursor-pointer bg-zinc-950/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#FF6B00]/50 hover:bg-white/[0.04] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}38`,
                        color: accentColor,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading text-sm font-bold text-white tracking-tight group-hover:text-[#FF6B00] transition-colors truncate">
                        {cat?.name}
                      </div>
                      <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                        {cat?.courseCount || 12}+ live cohorts
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Radiant Orange Horizon Light Beam at Hero bottom transition */}
      <OrangeHorizonLight
        className="bottom-0"
        intensity="medium"
        height="h-[160px]"
        lineOpacity="opacity-70"
      />

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Experience Campus Learn"
      >
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Campus Learn Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </div>
  );
}

export default Hero;
