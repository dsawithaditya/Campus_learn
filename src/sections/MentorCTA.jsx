import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2,
  Music,
  Palette,
  Trophy,
  Flame,
  Mic2,
  Camera,
  Gamepad2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
} from 'lucide-react';
import { SplitTextReveal } from '../components/AnimatedText';

const SPOKE_COUNT = 8;
const BASE_ROTATION_SPEED = 5.5;
const MAGNETIC_ATTRACT_WIDTH = 28;

const CAMPUS_GUILDS = [
  {
    name: 'The Systems Guild',
    domain: 'Tech & Coding',
    short: 'Tech',
    Icon: Code2,
    color: '#0859D4',
    lightColor: '#1A59F9',
    category: 'tech',
  },
  {
    name: 'The Sonic Architects',
    domain: 'Music Production',
    short: 'Music',
    Icon: Music,
    color: '#6465ED',
    lightColor: '#4F46E5',
    category: 'music',
  },
  {
    name: 'The Spatial Designers',
    domain: 'Art & UI/UX',
    short: 'Design',
    Icon: Palette,
    color: '#EF5533',
    lightColor: '#DC2626',
    category: 'art',
  },
  {
    name: 'The Athletic Vanguard',
    domain: 'Sports & Fitness',
    short: 'Sports',
    Icon: Trophy,
    color: '#1BC47D',
    lightColor: '#059669',
    category: 'sports',
  },
  {
    name: 'The Kinetic Crew',
    domain: 'Dance & Motion',
    short: 'Dance',
    Icon: Flame,
    color: '#D97706',
    lightColor: '#B45309',
    category: 'dance',
  },
  {
    name: 'The Vocal Conservatory',
    domain: 'Singing & Vocals',
    short: 'Vocals',
    Icon: Mic2,
    color: '#DB2777',
    lightColor: '#BE185D',
    category: 'singing',
  },
  {
    name: 'The Optics Collective',
    domain: 'Photo & Film',
    short: 'Optics',
    Icon: Camera,
    color: '#0097A7',
    lightColor: '#0E7490',
    category: 'photography',
  },
  {
    name: 'The Tactical Arena',
    domain: 'Gaming & Esports',
    short: 'Gaming',
    Icon: Gamepad2,
    color: '#DC2626',
    lightColor: '#B91C1C',
    category: 'gaming',
  },
];

const normalizeAngle = (a) => ((a % 360) + 540) % 360 - 180;

export function MentorCTA() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const orbitTrackRef = useRef(null);
  const crestRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const stageEl = stageRef.current;
    const secEl = sectionRef.current;
    if (!stageEl || !secEl) return undefined;

    let inView = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(secEl);

    let angle = 0;
    const mouse = { x: 0, y: 0, on: false };
    const h = Array(SPOKE_COUNT).fill(0);

    const onPointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.on = true;
    };
    const onPointerLeave = () => {
      mouse.on = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    let rafId = 0;
    let lastTime = performance.now();
    let lastReportedIdx = -1;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!inView) return;

      angle = (angle + BASE_ROTATION_SPEED * dt) % 360;

      const rect = stageEl.getBoundingClientRect();
      const Cx = rect.left + rect.width / 2;
      const Cy = rect.top + rect.height / 2;

      // Sized cleanly so all 8 crests stay inside the stage with generous padding
      const minDim = Math.min(rect.width, rect.height);
      const baseRadius = Math.max(118, Math.min(182, minDim * 0.35));

      if (orbitTrackRef.current) {
        orbitTrackRef.current.style.width = `${(baseRadius * 2).toFixed(0)}px`;
        orbitTrackRef.current.style.height = `${(baseRadius * 2).toFixed(0)}px`;
      }

      const dx = mouse.x - Cx;
      const dy = mouse.y - Cy;
      const mouseDist = Math.hypot(dx, dy);
      const mouseAngle = (Math.atan2(dx, -dy) * 180) / Math.PI;

      let closestIdx = 0;
      let minAngleDist = 1e9;

      for (let t = 0; t < SPOKE_COUNT; t++) {
        const spokeAngle = normalizeAngle(t * (360 / SPOKE_COUNT) + angle);
        if (Math.abs(spokeAngle) < minAngleDist) {
          minAngleDist = Math.abs(spokeAngle);
          closestIdx = t;
        }

        let targetRadialPull = 0;
        if (mouse.on && mouseDist < baseRadius * 1.6) {
          const diff = normalizeAngle(mouseAngle - spokeAngle);
          const bell = Math.exp(-Math.pow(diff / MAGNETIC_ATTRACT_WIDTH, 2));
          const proj = mouseDist * Math.cos((diff * Math.PI) / 180);
          targetRadialPull =
            Math.max(-0.07 * baseRadius, Math.min(0.11 * baseRadius, (proj - baseRadius) * 1.4)) *
            bell;
        }

        h[t] += (targetRadialPull - h[t]) * Math.min(1, dt * 7);

        const rad = (spokeAngle * Math.PI) / 180;
        const currentR = baseRadius + h[t];
        const posX = Math.sin(rad) * currentR;
        const posY = -Math.cos(rad) * currentR;

        const crestEl = crestRefs.current[t];
        if (crestEl) {
          crestEl.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0) translate(-50%, -50%)`;
        }
      }

      if (closestIdx !== lastReportedIdx) {
        lastReportedIdx = closestIdx;
        setActiveIdx(closestIdx % CAMPUS_GUILDS.length);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      io.disconnect();
    };
  }, []);

  const currentGuild = CAMPUS_GUILDS[activeIdx];
  const CurrentIcon = currentGuild.Icon;

  return (
    <section ref={sectionRef} id="guilds" className="relative space-y-10 select-none">
      {/* Top 2-Column Modern Hero Card */}
      <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#F5F5F7] border border-black/[0.08] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_60px_rgba(29,29,31,0.06)]">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(8,89,212,0.08)_0%,transparent_70%)] pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Crisp Editorial Copy & Actions */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono font-semibold text-[#424242] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0859D4]" />
              <span>8 Campus Societies</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] text-[#1D1D1F] leading-[1.04] tracking-tight mb-4">
              <SplitTextReveal text="Pick your guild." />
              <br />
              <span className="text-[#424242]">Lead your </span>
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.12em]">
                campus.
              </span>
            </h1>

            <p className="text-[#6E6E73] text-sm sm:text-base leading-relaxed max-w-md mb-8">
              Join a peer-led society around your craft, or start one and mentor juniors.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/teach')}
                className="btn-zephyr-primary px-6 py-3 text-xs sm:text-sm gap-2"
              >
                <span>Start a Guild</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="btn-zephyr-secondary px-6 py-3 text-xs sm:text-sm"
              >
                Explore Courses
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#6E6E73] font-medium">
              <GraduationCap className="w-4 h-4 text-[#0859D4]" />
              <span>Zero platform fees • Verified student leads</span>
            </div>
          </div>

          {/* Right Column: Balanced Interactive Orbit Wheel */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={stageRef}
              className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center overflow-visible"
            >
              {/* Orbit Track */}
              <div
                ref={orbitTrackRef}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/[0.14] pointer-events-none transition-all duration-300"
                style={{ width: '340px', height: '340px' }}
              />
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[460px] h-[420px] sm:h-[460px] rounded-full border border-dotted border-black/[0.08] pointer-events-none"
              />

              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center justify-center">
                <div
                  style={{
                    background: `radial-gradient(circle, ${currentGuild.color}20 0%, ${currentGuild.color}08 55%, transparent 75%)`,
                  }}
                  className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full blur-2xl transition-colors duration-500"
                />

                <div
                  style={{
                    borderColor: `${currentGuild.color}40`,
                    boxShadow: `0 18px 40px rgba(29,29,31,0.1), 0 0 0 6px rgba(255,255,255,0.65)`,
                  }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-white border flex flex-col items-center justify-center transition-all duration-300"
                >
                  <div
                    style={{
                      backgroundColor: `${currentGuild.color}12`,
                      borderColor: `${currentGuild.color}28`,
                    }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-colors duration-300"
                  >
                    <CurrentIcon
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300"
                      style={{ color: currentGuild.color }}
                    />
                  </div>
                  <span
                    className="mt-1.5 font-mono text-[10px] uppercase tracking-widest font-bold transition-colors duration-300"
                    style={{ color: currentGuild.lightColor }}
                  >
                    {currentGuild.short}
                  </span>
                </div>
              </div>

              {/* 8 Orbiting Minimalist Studio Guild Badges */}
              <div className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible pointer-events-none">
                {CAMPUS_GUILDS.map((guild, idx) => {
                  const Icon = guild.Icon;
                  const isSelected = idx === activeIdx;
                  return (
                    <div
                      key={guild.name}
                      ref={(el) => {
                        crestRefs.current[idx] = el;
                      }}
                      className="absolute top-0 left-0 w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] block pointer-events-auto cursor-pointer group transition-transform duration-150"
                      onClick={() => navigate(`/explore?category=${guild.category}`)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      title={`${guild.name} • ${guild.domain}`}
                    >
                      <div
                        style={{
                          borderColor: isSelected ? guild.color : 'rgba(29, 29, 31, 0.08)',
                          boxShadow: isSelected
                            ? `0 14px 32px ${guild.color}24, 0 0 0 4px ${guild.color}14`
                            : '0 10px 24px rgba(29, 29, 31, 0.08)',
                        }}
                        className="w-full h-full rounded-[22px] bg-white border flex flex-col items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                      >
                        <div
                          style={{
                            backgroundColor: `${guild.color}12`,
                            borderColor: `${guild.color}26`,
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        >
                          <Icon
                            className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                            style={{ color: guild.color }}
                          />
                        </div>
                        <span
                          className="mt-1 font-mono text-[9px] tracking-wider uppercase font-bold truncate max-w-[92%]"
                          style={{ color: isSelected ? guild.lightColor : '#424242' }}
                        >
                          {guild.short}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clean Active Guild Pill Below Wheel (Zero Overlap) */}
            <button
              type="button"
              onClick={() => navigate(`/explore?category=${currentGuild.category}`)}
              className="mt-2 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-black/10 hover:border-[#0859D4]/50 font-mono text-xs text-[#424242] transition-colors cursor-pointer shadow-sm"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentGuild.color }}
              />
              <span className="font-semibold text-[#1D1D1F]">{currentGuild.name}</span>
              <span className="text-black/25">•</span>
              <span style={{ color: currentGuild.lightColor }}>{currentGuild.domain}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6E6E73]" />
            </button>
          </div>
        </div>
      </div>

      {/* 8 Campus Guilds Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAMPUS_GUILDS.map((guild, idx) => {
          const Icon = guild.Icon;
          const isSelected = idx === activeIdx;
          return (
            <motion.button
              key={guild.name}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/explore?category=${guild.category}`)}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`group relative p-5 rounded-2xl bg-white border text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer shadow-soft ${
                isSelected
                  ? 'border-[#0859D4]/55 shadow-[0_10px_28px_rgba(8,89,212,0.1)]'
                  : 'border-black/[0.08] hover:border-[#0859D4]/45'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${guild.color}14`,
                    borderColor: `${guild.color}35`,
                    color: guild.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading text-sm font-bold text-[#1D1D1F] group-hover:text-[#0859D4] transition-colors truncate">
                    {guild.name}
                  </div>
                  <div className="font-mono text-[11px] text-[#6E6E73] mt-0.5 truncate">
                    {guild.domain}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0859D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default MentorCTA;
