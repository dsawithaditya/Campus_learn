import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Flame, Code2, Music, Palette, Trophy, Camera, Gamepad2, Mic2 } from 'lucide-react';
import coursesData from '../data/courses.json';
import mentorsData from '../data/mentors.json';

const DOMAIN_META = {
  tech: { society: 'The Systems Guild', color: '#FF6B00', icon: Code2 },
  singing: { society: 'The Vocal Conservatory', color: '#F472B6', icon: Mic2 },
  music: { society: 'The Sonic Architects', color: '#A78BFA', icon: Music },
  dance: { society: 'The Kinetic Crew', color: '#FB923C', icon: Flame },
  sports: { society: 'The Athletic Vanguard', color: '#34D399', icon: Trophy },
  art: { society: 'The Spatial Designers', color: '#FFA057', icon: Palette },
  photography: { society: 'The Optics Collective', color: '#2DD4BF', icon: Camera },
  gaming: { society: 'The Tactical Arena', color: '#F87171', icon: Gamepad2 },
};

/**
 * Grail-Inspired 3D Spiral Cohort Deck ($e in grail-app.com)
 * Renders CampusLearn cohorts along a 3D helix with auto-flow, mouse-tilt parallax,
 * magnetic cursor pull, and drag-to-spin interaction.
 */
export function GrailSpiralDeck() {
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const groupRef = useRef(null);
  const cardRefs = useRef([]);
  const isVisibleRef = useRef(true);
  const pointerRef = useRef({ x: 0, y: 0, dragging: false, lastX: 0, lastY: 0 });
  const spinTargetRef = useRef(0);
  const spinCurrentRef = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0 });

  const [activeCategory, setActiveCategory] = useState('tech');
  const [activeCourseTitle, setActiveCourseTitle] = useState('');

  const deckItems = React.useMemo(() => {
    const raw = Array.isArray(coursesData) ? coursesData.slice(0, 11) : [];
    return raw.map((c, idx) => {
      const mentor = mentorsData?.find((m) => m.id === c.mentorId);
      const meta = DOMAIN_META[c.categoryId] || DOMAIN_META.tech;
      return {
        ...c,
        society: meta.society,
        accent: meta.color,
        Icon: meta.icon,
        mentorName: mentor?.name || 'Senior Mentor',
        mentorAvatar: mentor?.avatar,
        idx,
      };
    });
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let lastTime = performance.now() / 1000;
    let lastActiveIdx = -1;
    let lastChangeTime = performance.now();
    const count = deckItems.length;
    if (count === 0) return undefined;

    const half = Math.floor(count / 2);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!isVisibleRef.current) {
        lastTime = performance.now() / 1000;
        return;
      }

      const now = performance.now() / 1000;
      const nowMs = performance.now();
      const dt = Math.min(0.05, now - lastTime) || 0.016;
      lastTime = now;

      // Auto-spin along spiral like Grail's Ne.autoSpeed
      if (!prefersReduced && !pointerRef.current.dragging) {
        spinTargetRef.current += 0.24 * dt;
      }

      // Smooth lerp toward target spin
      spinCurrentRef.current +=
        (spinTargetRef.current - spinCurrentRef.current) * Math.min(1, dt * 7.5);

      const spin = spinCurrentRef.current;
      const ptr = pointerRef.current;

      // Smooth mouse-tilt of entire 3D spiral group
      const targetTiltX = -ptr.y * 8.5;
      const targetTiltZ = -ptr.x * 6.5;
      tiltRef.current.x += (targetTiltX - tiltRef.current.x) * Math.min(1, dt * 4.5);
      tiltRef.current.y += (targetTiltZ - tiltRef.current.y) * Math.min(1, dt * 4.5);

      if (groupRef.current) {
        groupRef.current.style.transform = `rotateX(${tiltRef.current.x.toFixed(2)}deg) rotateZ(${tiltRef.current.y.toFixed(2)}deg)`;
      }

      // Determine center active card
      const centerIndex = ((Math.round(spin) % count) + count) % count;
      if (centerIndex !== lastActiveIdx && deckItems[centerIndex]) {
        lastActiveIdx = centerIndex;
        lastChangeTime = nowMs;
        setActiveCategory(deckItems[centerIndex].categoryId || 'tech');
        setActiveCourseTitle(deckItems[centerIndex].title || '');
      }

      // Time elapsed since card switch (for lens autofocus micro-blur snap)
      const timeSinceChange = (nowMs - lastChangeTime) / 1000;
      // Focus snap blur: quick camera lens micro-blur pulse (~0.32s duration)
      const changeBlur = Math.max(0, (1 - timeSinceChange / 0.32) * 4.6);

      const isMobile = window.innerWidth < 768;
      const radiusX = isMobile ? 170 : 330;
      const radiusZ = isMobile ? 120 : 210;
      const gapY = isMobile ? 18 : 28;
      const angleStep = isMobile ? 0.62 : 0.52;

      const baseSlot = Math.round(spin) - half;

      for (let slot = 0; slot < count; slot++) {
        const virtualIdx = baseSlot + slot;
        const itemIdx = ((virtualIdx % count) + count) % count;
        const cardEl = cardRefs.current[itemIdx];
        if (!cardEl) continue;

        const n = virtualIdx - spin;
        const angle = n * angleStep;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);

        // Smooth spiral coordinates with gentle horizontal fanning
        let x = radiusX * sinA - n * 6;
        let y = n * gapY;
        const z = radiusZ * cosA - Math.abs(n) * 16;

        // Magnetic pull toward cursor on front-facing cards
        const dx = ptr.x * 200 - x;
        const dy = ptr.y * 120 - y;
        const mag = Math.exp(-(dx * dx + dy * dy) / 32000) * 0.12;
        x += dx * mag;
        y += dy * mag;

        // Elegant gentle yaw curve: center cards face viewer, wings curve gracefully away
        const rotY = -sinA * 24;
        const rotZ = -sinA * 2.8;
        const scale = (isMobile ? 0.78 : 0.88) + Math.max(0, cosA) * 0.16;

        // Layering hierarchy: center active card has unambiguously highest z-index
        // Using flat-stacking 2.5D prevents browser 3D polygon-intersection slicing bugs
        const computedZIndex = Math.round(500 + cosA * 400 - Math.abs(n) * 25);

        // Distance in slot units from center
        const distFromCenter = Math.abs(n);

        // TOP THREE CARDS (center n=0, immediate left n=-1, immediate right n=+1)
        // are properly visible in full focus (0px blur, high contrast & sharp text).
        let depthBlur = 0;
        let depthOpacity = 1.0;

        if (distFromCenter <= 1.25) {
          // In-focus plane for top three cards: 100% crisp, no blur!
          depthBlur = 0;
          depthOpacity = Math.max(0.86, 0.98 - distFromCenter * 0.1);
        } else {
          // Outer background cards: progressive optical depth blur and soft fade
          const excess = distFromCenter - 1.25;
          depthBlur = Math.min(10.0, excess * 4.6);
          depthOpacity = Math.max(0.0, 0.68 - excess * 0.35);
        }

        // Active center card switch micro-blur pulse (only momentary on the center card for ~0.24s)
        const isCenterCard = itemIdx === centerIndex && distFromCenter < 0.5;
        const switchBlur =
          isCenterCard && timeSinceChange < 0.24
            ? Math.max(0, (1 - timeSinceChange / 0.24) * 3.4)
            : 0;

        const totalBlur = depthBlur + switchBlur;

        // If card is behind the spiral plane (cosA < -0.15) or far out, hide
        if (cosA < -0.15 || distFromCenter > 2.85) {
          depthOpacity = 0;
        }

        cardEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        cardEl.style.opacity = depthOpacity.toFixed(2);
        cardEl.style.zIndex = String(Math.max(1, computedZIndex));
        cardEl.style.pointerEvents = distFromCenter <= 1.25 && cosA > 0 ? 'auto' : 'none';
        cardEl.style.filter = totalBlur > 0.08 ? `blur(${totalBlur.toFixed(2)}px)` : 'none';

        // Luminous active rim glow on the focused center card
        if (isCenterCard) {
          const glowAlpha = Math.max(0.3, 0.8 - timeSinceChange * 1.5);
          cardEl.style.borderColor = `rgba(255, 107, 0, ${glowAlpha.toFixed(2)})`;
          cardEl.style.boxShadow = `0 24px 60px rgba(0,0,0,0.95), 0 0 ${(24 * (1 - Math.min(1, timeSinceChange / 0.5))).toFixed(0)}px rgba(255, 107, 0, ${(glowAlpha * 0.5).toFixed(2)})`;
        } else if (distFromCenter <= 1.25) {
          // The adjacent top 2 cards (left and right) have clean, crisp subtle borders
          cardEl.style.borderColor = 'rgba(255, 255, 255, 0.16)';
          cardEl.style.boxShadow =
            '0 20px 50px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)';
        } else {
          // Outer background cards
          cardEl.style.borderColor = 'rgba(255, 255, 255, 0.06)';
          cardEl.style.boxShadow = '0 16px 40px rgba(0,0,0,0.85)';
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [deckItems]);

  const handlePointerDown = (e) => {
    pointerRef.current.dragging = true;
    pointerRef.current.lastX = e.clientX;
    pointerRef.current.lastY = e.clientY;
  };

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (pointerRef.current.dragging) {
      const dx = e.clientX - pointerRef.current.lastX;
      const dy = e.clientY - pointerRef.current.lastY;
      pointerRef.current.lastX = e.clientX;
      pointerRef.current.lastY = e.clientY;
      spinTargetRef.current -= (dx - dy * 0.5) * 0.0085;
    }
  };

  const handlePointerUp = () => {
    pointerRef.current.dragging = false;
  };

  const activeMeta = DOMAIN_META[activeCategory] || DOMAIN_META.tech;

  return (
    <div
      ref={stageRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-[430px] sm:h-[500px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing my-4"
      style={{ perspective: '1300px' }}
    >
      {/* Dynamic Accent Ambient Glow Behind Spiral */}
      <div
        className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[420px] rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-25"
        style={{
          background: `radial-gradient(circle, ${activeMeta.color} 0%, #FF6B00 45%, transparent 72%)`,
        }}
      />

      {/* Spiral Carousel Group (Flat compositing context prevents 3D polygon-intersection slicing artifacts) */}
      <div
        ref={groupRef}
        className="relative w-0 h-0 flex items-center justify-center"
        style={{ transformStyle: 'flat' }}
      >
        {deckItems.map((item, idx) => {
          const Icon = item.Icon;
          return (
            <div
              key={item.id || idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (item.slug) navigate(`/course/${item.slug}`);
              }}
              style={{
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity, filter',
              }}
              className="absolute -left-[135px] -top-[175px] w-[270px] h-[350px] rounded-[22px] bg-[#111116] border border-white/15 hover:border-[#FF6B00]/80 p-5 flex flex-col justify-between text-left shadow-[0_24px_60px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors duration-300 cursor-pointer group"
            >
              {/* Top Guild/Society Crest + Action Icon (Grail Quest Card Layout) */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  {/* Shield Crest Emblem */}
                  <div
                    className="w-12 h-13 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${item.accent}18`,
                      borderColor: `${item.accent}45`,
                      boxShadow: `0 6px 20px ${item.accent}24`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300 flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    {item.level}
                  </span>
                </div>

                {/* Society / Guild Subtitle */}
                <p className="font-mono text-[11px] text-zinc-400 tracking-wide mb-1.5">
                  {item.society}
                </p>

                {/* Bold Quest-Style Cohort Title */}
                <h3 className="font-heading font-bold text-[19px] text-white leading-[1.12] tracking-tight group-hover:text-[#FF6B00] transition-colors line-clamp-2 mb-2.5">
                  {item.title}
                </h3>

                {/* Concise Body Copy */}
                <p className="text-xs text-zinc-400 leading-[1.35] line-clamp-3">
                  {item.shortDescription}
                </p>
              </div>

              {/* Bottom Pill Row + Motto Footer (Matching Grail's Ze card canvas) */}
              <div className="pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    {item.mentorAvatar && (
                      <img
                        src={item.mentorAvatar}
                        alt={item.mentorName}
                        loading="lazy"
                        decoding="async"
                        className="w-6 h-6 rounded-full object-cover border border-[#FF6B00]/50"
                      />
                    )}
                    <span className="text-[11px] font-medium text-zinc-300 truncate max-w-[125px]">
                      {item.mentorName}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.07] text-[11px] font-mono text-[#FFA057] font-semibold flex items-center gap-0.5">
                    {item.durationHours}h <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 text-center pt-2 border-t border-white/[0.05] truncate">
                  Live peer cohort beats recorded theory.
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Interactive Hint Pill */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-[11px] font-mono text-zinc-400 pointer-events-none shadow-lg">
        <span
          className="w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: activeMeta.color }}
        />
        <span className="text-zinc-200 font-semibold">{activeMeta.society}</span>
        <span className="text-zinc-600">•</span>
        <span className="hidden sm:inline truncate max-w-[220px] text-zinc-400">
          {activeCourseTitle || 'Drag to flow cohorts'}
        </span>
        <span className="text-[#FF6B00] uppercase tracking-wider text-[10px]">
          Drag 3D Spiral
        </span>
      </div>
    </div>
  );
}

export default GrailSpiralDeck;

