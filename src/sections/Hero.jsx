import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ShapeGrid from '../components/ShapeGrid';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';
import { GrailSpiralDeck } from '../components/GrailSpiralDeck';
import {
  SplitTextReveal,
  ScrambleText,
  Magnetic,
} from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const topDisciplines = [
  'Full-Stack & Systems',
  'Vocal Arts & Riyaz',
  'Beat Production',
  'UI/UX & Design',
  'Urban Choreography',
  'Athletic Conditioning',
  'Film & Photography',
  'Tactical Esports',
];

export function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const sectionEl = sectionRef.current;
    const headlineEl = headlineRef.current;
    if (!sectionEl || !headlineEl) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(headlineEl, {
        yPercent: -14,
        scale: 0.9,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Interactive ShapeGrid Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="rgba(29, 29, 31, 0.055)"
          hoverColor="#0859D4"
          hoverFillColor="#0859D4"
          fillOpacity={0.15}
          cellSize={44}
          speed={0.32}
          glow={0.4}
          clickCascade={true}
          fade={0.88}
          className="w-full h-full"
        />
      </div>

      {/* Ambient Radial Vignette & Cobalt Studio Bloom (Locomotive parallax depth) */}
      <div
        data-scroll
        data-scroll-speed="-0.12"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[460px] bg-gradient-to-b from-[#0859D4]/[0.08] via-[#1A59F9]/[0.03] to-transparent blur-3xl pointer-events-none z-[1]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FFFFFF_86%)] pointer-events-none z-[1]" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Minimal Status Pill */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate('/explore')}
            className="animate-float-gentle inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-black/[0.08] hover:border-[#0859D4]/45 backdrop-blur-xl text-xs font-medium text-[#424242] mb-7 shadow-[0_4px_20px_rgba(29,29,31,0.06)] transition-colors cursor-pointer select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0859D4] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0859D4]" />
            </span>
            <span>10,000+ Students</span>
            <span className="text-black/25">•</span>
            <ScrambleText
              text="50+ CAMPUSES"
              className="font-mono text-[11px] tracking-wider text-[#0859D4] font-bold"
            />
          </motion.button>

          {/* Clean Modern Hero Headline */}
          <div ref={headlineRef} className="w-full origin-center will-change-transform mb-5">
            <h1 className="font-display font-bold text-[clamp(40px,6.8vw,78px)] text-[#1D1D1F] leading-[1.02] tracking-[-0.03em]">
              <SplitTextReveal text="Master real skills" delay={0.05} stagger={0.045} />
              <br />
              <span className="text-[#424242]">
                <SplitTextReveal text="with" delay={0.2} stagger={0.05} />{' '}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="font-editorial italic font-normal text-[#0859D4] text-[1.12em] tracking-normal inline-block"
              >
                campus seniors.
              </motion.span>
            </h1>
          </div>

          {/* Crisp 1-Line Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-sm sm:text-base text-[#6E6E73] max-w-md mb-8 leading-relaxed"
          >
            Live peer cohorts in tech, design, music, and sports.
          </motion.p>

          {/* Two Clean CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-6"
          >
            <Magnetic strength={0.18} className="w-full sm:w-auto">
              <InteractiveHoverButton
                text="Start Learning"
                onClick={() => navigate('/signup')}
                className="w-full sm:w-48 h-12 text-sm shadow-lg shadow-[#0859D4]/20"
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
          </motion.div>

          {/* Interactive 3D Spiral Cohort Deck (Locomotive depth wrapper) */}
          <div data-scroll data-scroll-speed="0.06" className="w-full">
            <GrailSpiralDeck />
          </div>

          {/* Clean Discipline Marquee */}
          <div className="pt-6 mt-4 border-t border-black/[0.08] w-full overflow-hidden">
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
                    className="inline-flex items-center gap-8 text-xs font-heading font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-default"
                  >
                    <span className="hover:text-[#0859D4] transition-colors">{discipline}</span>
                    <span className="w-1 h-1 rounded-full bg-[#0859D4]/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radiant Orange Horizon Light Beam */}
      <OrangeHorizonLight
        className="bottom-0"
        intensity="medium"
        height="h-[140px]"
        lineOpacity="opacity-65"
      />
    </section>
  );
}

export default Hero;
