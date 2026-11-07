import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  GraduationCap,
} from 'lucide-react';

const SPOKE_COUNT = 8;
const BASE_ROTATION_SPEED = 4.2; // degrees/sec
const SCROLL_VELOCITY_FACTOR = 0.05;
const MAX_SCROLL_BOOST = 100;
const MAGNETIC_ATTRACT_WIDTH = 28; // degrees

/**
 * Authentic CampusLearn Society Guilds matching the website's domains
 */
const CAMPUS_GUILDS = [
  {
    name: 'The Systems Guild',
    domain: 'Tech & Coding',
    Icon: Code2,
    color: '#FF6B00',
    lightColor: '#FFA057',
    category: 'tech',
  },
  {
    name: 'The Sonic Architects',
    domain: 'Music Production',
    Icon: Music,
    color: '#A78BFA',
    lightColor: '#C084FC',
    category: 'music',
  },
  {
    name: 'The Spatial Designers',
    domain: 'Art & UI/UX Design',
    Icon: Palette,
    color: '#FFA057',
    lightColor: '#FBBF24',
    category: 'art',
  },
  {
    name: 'The Athletic Vanguard',
    domain: 'Sports & Fitness',
    Icon: Trophy,
    color: '#34D399',
    lightColor: '#6EE7B7',
    category: 'sports',
  },
  {
    name: 'The Kinetic Crew',
    domain: 'Dance & Choreography',
    Icon: Flame,
    color: '#FB923C',
    lightColor: '#FDBA74',
    category: 'dance',
  },
  {
    name: 'The Vocal Conservatory',
    domain: 'Singing & Vocals',
    Icon: Mic2,
    color: '#F472B6',
    lightColor: '#F9A8D4',
    category: 'singing',
  },
  {
    name: 'The Optics Collective',
    domain: 'Photography & Film',
    Icon: Camera,
    color: '#2DD4BF',
    lightColor: '#5EEAD4',
    category: 'photography',
  },
  {
    name: 'The Tactical Arena',
    domain: 'Gaming & Esports',
    Icon: Gamepad2,
    color: '#F87171',
    lightColor: '#FCA5A5',
    category: 'gaming',
  },
];

const normalizeAngle = (a) => ((a % 360) + 540) % 360 - 180;

export function MentorCTA() {
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const guildNameRef = useRef(null);
  const orbitTrackRef = useRef(null);
  const crestRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // 1) Scroll-driven rising sheet effect (Images 2, 3, 4 from Grail)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Skip calculation if far off-screen to save CPU cycles
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      const n = (vh - rect.top) / vh;
      const progress = Math.min(1, Math.max(0, n));
      const off = 1 - progress;
      const rot = 1 - progress;
      const par = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

      el.style.setProperty('--g8off', off.toFixed(3));
      el.style.setProperty('--g8rot', rot.toFixed(3));
      el.style.setProperty('--g8par', par.toFixed(3));
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 2) Guilds Wheel centered rotation, upright crests, and magnetic cursor pull
  useEffect(() => {
    const stageEl = stageRef.current;
    const nameEl = guildNameRef.current;
    const secEl = sectionRef.current;
    if (!stageEl || !secEl) return undefined;

    let inView = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(secEl);

    let angle = 0;
    let lastScrollY = window.scrollY;
    let smoothVel = 0;
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

      if (!inView) {
        lastScrollY = window.scrollY;
        return;
      }

      const curY = window.scrollY;
      const rawVel = dt > 0 ? (curY - lastScrollY) / dt : 0;
      lastScrollY = curY;
      smoothVel += (rawVel - smoothVel) * Math.min(1, dt * 6);
      const scrollBoost = Math.max(
        -MAX_SCROLL_BOOST,
        Math.min(MAX_SCROLL_BOOST, smoothVel * SCROLL_VELOCITY_FACTOR)
      );

      // Continuous auto-rotation boosted by scroll velocity
      angle = (angle + (BASE_ROTATION_SPEED + scrollBoost) * dt) % 360;

      // Wheel center in viewport coordinates (dead center of the stage)
      const rect = stageEl.getBoundingClientRect();
      const Cx = rect.left + rect.width / 2;
      const Cy = rect.top + rect.height / 2;

      // Responsive orbit radius: significantly increased so it covers more of the page
      const isMobile = rect.width < 640;
      const isTablet = rect.width < 1024;
      const baseRadius = isMobile
        ? Math.min(185, Math.max(140, rect.width * 0.38))
        : isTablet
        ? Math.min(270, Math.max(215, rect.width * 0.30))
        : Math.min(360, Math.max(285, rect.width * 0.28));

      if (orbitTrackRef.current) {
        orbitTrackRef.current.style.width = `${(baseRadius * 2).toFixed(0)}px`;
        orbitTrackRef.current.style.height = `${(baseRadius * 2).toFixed(0)}px`;
      }

      // Mouse distance and angle from center of stage
      const dx = mouse.x - Cx;
      const dy = mouse.y - Cy;
      const mouseDist = Math.hypot(dx, dy);
      const mouseAngle = (Math.atan2(dx, -dy) * 180) / Math.PI;

      let closestIdx = 0;
      let minAngleDist = 1e9;

      for (let t = 0; t < SPOKE_COUNT; t++) {
        // Angle of spoke t relative to top apex (12 o'clock)
        const spokeAngle = normalizeAngle(t * (360 / SPOKE_COUNT) + angle);
        if (Math.abs(spokeAngle) < minAngleDist) {
          minAngleDist = Math.abs(spokeAngle);
          closestIdx = t;
        }

        // Magnetic attraction pull toward cursor
        let targetRadialPull = 0;
        if (mouse.on) {
          const diff = normalizeAngle(mouseAngle - spokeAngle);
          const bell = Math.exp(-Math.pow(diff / MAGNETIC_ATTRACT_WIDTH, 2));
          const proj = mouseDist * Math.cos((diff * Math.PI) / 180);
          targetRadialPull =
            Math.max(-0.08 * baseRadius, Math.min(0.14 * baseRadius, (proj - baseRadius) * 1.6)) *
            bell;
        }

        h[t] += (targetRadialPull - h[t]) * Math.min(1, dt * 7);

        // Position each crest in polar coordinates centered at (0, 0)
        // Math.sin for X, -Math.cos for Y so 0deg is at the top (12 o'clock)
        const rad = (spokeAngle * Math.PI) / 180;
        const currentR = baseRadius + h[t];
        const posX = Math.sin(rad) * currentR;
        const posY = -Math.cos(rad) * currentR;

        const crestEl = crestRefs.current[t];
        if (crestEl) {
          // Keeping rotate(0deg) ensures icons and labels are ALWAYS upright and readable!
          crestEl.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0) translate(-50%, -50%)`;
        }
      }

      // Update active index state for central hub
      if (closestIdx !== lastReportedIdx) {
        lastReportedIdx = closestIdx;
        setActiveIdx(closestIdx % CAMPUS_GUILDS.length);
      }

      // Display active guild name at top apex with smooth fade
      const activeGuild = CAMPUS_GUILDS[closestIdx % CAMPUS_GUILDS.length];
      const opacity = Math.max(0, Math.min(1, 1 - (minAngleDist - 6) / 18));
      if (nameEl) {
        nameEl.textContent = `${activeGuild.name} • ${activeGuild.domain}`;
        nameEl.style.opacity = opacity.toFixed(2);
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
    <div
      ref={wrapRef}
      style={{
        '--g8off': 1,
        '--g8rot': 1,
        '--g8par': 0.5,
      }}
      className="relative z-20 -mt-[45vh] sm:-mt-[55vh] will-change-transform"
    >
      {/* 
        The rising sheet (Images 2, 3, 4 from Grail)
        Enters at an angled tilt: rotate(calc(var(--g8rot) * -5.5deg)) scale(calc(1 - var(--g8off) * 0.12))
        Maintains our dark Obsidian theme: #09090D base, orange accents, no bright white!
      */}
      <section
        ref={sectionRef}
        id="guilds"
        style={{
          transform:
            'rotate(calc(var(--g8rot, 0) * -5.5deg)) scale(calc(1 - var(--g8off, 0) * 0.12))',
          transformOrigin: '50% 0%',
        }}
        className="relative w-full min-h-[95vh] sm:min-h-[110vh] bg-[#09090D] text-white rounded-t-[32px] sm:rounded-t-[48px] border-t border-white/[0.14] shadow-[0_-25px_80px_rgba(0,0,0,0.95),0_-1px_0_rgba(255,255,255,0.12)] overflow-hidden select-none will-change-transform pb-16 sm:pb-24"
      >
        {/* Top Chapter Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-12 pt-7 sm:pt-8 pb-4 text-xs sm:text-[13px] font-medium text-white/80 border-b border-white/[0.07]">
          <span>About Campus Societies & Guilds</span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            Chapter 07
          </span>
        </div>

        {/* Ambient Warm Golden/Amber Torch Glow in Obsidian Stage */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none -z-10"
        />

        {/* 
          Centered Guild Wheel Stage
          The rotation center is placed exactly at 50% 50% in the middle of the container
          Expanded height & orbit radius covers more of the page
        */}
        <div
          ref={stageRef}
          className="relative w-full h-[540px] sm:h-[680px] lg:h-[820px] flex items-center justify-center overflow-visible mt-2 sm:mt-6"
        >
          {/* Active Crest Name at 12 o'clock apex */}
          <div
            ref={guildNameRef}
            className="absolute top-3 sm:top-5 lg:top-7 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#FF6B00]/30 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#FFA057] uppercase text-center pointer-events-none z-30 transition-opacity duration-200 whitespace-nowrap shadow-lg"
          >
            The Systems Guild • Tech & Coding
          </div>

          {/* Subtle Celestial Orbit Track (Grail reference) */}
          <div
            ref={orbitTrackRef}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.12] pointer-events-none -z-[5] transition-all duration-300"
            style={{ width: '640px', height: '640px' }}
          />

          {/* Secondary faint outer celestial resonance circle */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[920px] h-[720px] sm:h-[920px] rounded-full border border-dotted border-white/[0.04] pointer-events-none -z-10"
          />

          {/* 
            CENTRAL OBSIDIAN HUB (Dead Center of Rotation)
            Anchors the rotation point with the active society icon and radiant pulse
          */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center justify-center">
            {/* Pulsing ambient radial glow in active society color */}
            <div
              style={{
                background: `radial-gradient(circle, ${currentGuild.color}40 0%, ${currentGuild.color}10 50%, transparent 75%)`,
              }}
              className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full blur-2xl transition-colors duration-500"
            />

            {/* Center Glass Medallion */}
            <div
              style={{
                borderColor: `${currentGuild.color}60`,
                boxShadow: `0 0 35px ${currentGuild.color}25, inset 0 1px 0 rgba(255,255,255,0.15)`,
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-zinc-950/90 border backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 shadow-2xl"
            >
              <CurrentIcon
                className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 transition-all duration-300"
                style={{ color: currentGuild.color }}
              />
              <span
                className="mt-1 font-mono text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider font-bold transition-colors duration-300"
                style={{ color: currentGuild.lightColor }}
              >
                {currentGuild.domain.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* 
            Orbiting 8 Society Heraldic Crests
            Each crest is positioned relative to the exact center (0, 0)
          */}
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
                  className="absolute top-0 left-0 w-[78px] h-[82px] sm:w-[94px] sm:h-[100px] lg:w-[110px] lg:h-[118px] block pointer-events-auto cursor-pointer group transition-transform duration-75 select-none"
                  onClick={() => navigate(`/explore?category=${guild.category}`)}
                  title={`${guild.name} (${guild.domain})`}
                >
                  {/* Modern Campus Heraldic Shield Badge */}
                  <div
                    style={{
                      WebkitMaskImage: 'url(/guild-crest.svg)',
                      maskImage: 'url(/guild-crest.svg)',
                      WebkitMaskSize: '100% 100%',
                      maskSize: '100% 100%',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                    }}
                    className={`w-full h-full relative overflow-hidden bg-[#111116] border transition-all duration-300 group-hover:scale-[1.15] shadow-[0_14px_36px_rgba(0,0,0,0.88)] ${
                      isSelected
                        ? 'border-[#FF6B00] shadow-[0_0_28px_rgba(255,107,0,0.45)]'
                        : 'border-white/20'
                    }`}
                  >
                    {/* Ambient Domain Radial Glow in Society Signature Color */}
                    <div
                      style={{
                        background: `radial-gradient(circle at 50% 38%, ${guild.color}38 0%, ${guild.color}10 50%, transparent 80%)`,
                      }}
                      className="absolute inset-0 pointer-events-none"
                    />

                    {/* Subtle Technical Lattice Grid Accent */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.07] pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${guild.color} 1px, transparent 1px), linear-gradient(to bottom, ${guild.color} 1px, transparent 1px)`,
                        backgroundSize: '10px 10px',
                      }}
                    />

                    {/* Society Icon & Domain Emblem (Always upright & readable) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                      <div
                        style={{
                          backgroundColor: `${guild.color}18`,
                          borderColor: `${guild.color}55`,
                          boxShadow: `0 0 20px ${guild.color}30`,
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_26px_rgba(255,107,0,0.5)]"
                      >
                        <Icon
                          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300"
                          style={{ color: guild.color }}
                        />
                      </div>

                      {/* Domain Tag */}
                      <span
                        className="mt-1 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-bold truncate max-w-[90%] transition-colors"
                        style={{ color: guild.lightColor }}
                      >
                        {guild.domain.split(' ')[0]}
                      </span>
                    </div>

                    {/* Luminous Rim Stroke */}
                    <div
                      style={{
                        borderColor: isSelected ? '#FF6B00' : `${guild.color}65`,
                      }}
                      className="absolute inset-0 rounded-[inherit] border pointer-events-none group-hover:border-[#FF6B00] transition-colors"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gradient Shader Blur over lower half of the wheel */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-44 sm:h-64 bg-gradient-to-t from-[#09090D] via-[#09090D]/85 to-transparent pointer-events-none z-10"
          />
        </div>

        {/* Center Editorial Text matching Grail (Image 4) */}
        <div
          style={{
            translate: '0 calc((var(--g8par, 0.5) - 0.5) * -3vw)',
          }}
          className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl mx-auto -mt-6 sm:-mt-12"
        >
          {/* Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-zinc-300 mb-5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Join a campus society. Or start one.</span>
          </div>

          {/* Monumental Headline */}
          <h2 className="font-grail-serif text-[clamp(40px,7vw,92px)] text-white uppercase leading-[0.88] tracking-[-0.015em] mb-5">
            Pick your guilds. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FFA057] to-[#F59E0B]">
              Empower your juniors.
            </span>
          </h2>

          {/* Narrative Body Copy */}
          <p className="text-zinc-400 text-xs sm:text-[14px] leading-relaxed max-w-lg mb-8 font-normal">
            A campus society is a corner of CampusLearn built around one craft.
            Getting strong. Shipping code. Recording tracks. Join the ones that
            fit the life you want, or start your own and pull juniors in. Nobody's
            ranked. You just get to see you're not the only one building here.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/teach')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FF6B00] hover:bg-[#E05300] text-white font-heading font-semibold text-xs sm:text-sm tracking-tight shadow-[0_6px_24px_rgba(255,107,0,0.35)] transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start a Society / Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 border border-white/15 text-xs sm:text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
            >
              Explore All Guilds
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
            <span>Zero platform fees • Verified student mentor credential</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MentorCTA;
