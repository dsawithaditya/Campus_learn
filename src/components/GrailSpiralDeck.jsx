import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Code2,
  Music,
  Palette,
  Trophy,
  Camera,
  Gamepad2,
  Mic2,
} from 'lucide-react';
import coursesData from '../data/courses.json';
import mentorsData from '../data/mentors.json';

const DOMAIN_META = {
  tech: { society: 'The Systems Guild', color: '#0859D4', icon: Code2 },
  singing: { society: 'The Vocal Conservatory', color: '#EE46D3', icon: Mic2 },
  music: { society: 'The Sonic Architects', color: '#6465ED', icon: Music },
  dance: { society: 'The Kinetic Crew', color: '#EF5533', icon: Flame },
  sports: { society: 'The Athletic Vanguard', color: '#1BC47D', icon: Trophy },
  art: { society: 'The Spatial Designers', color: '#EF5533', icon: Palette },
  photography: { society: 'The Optics Collective', color: '#00B5CE', icon: Camera },
  gaming: { society: 'The Tactical Arena', color: '#E11D48', icon: Gamepad2 },
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
  const [activeIndex, setActiveIndex] = useState(0);

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

      // Gentle auto-flow along deck
      if (!prefersReduced && !pointerRef.current.dragging) {
        spinTargetRef.current += 0.14 * dt;
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
        setActiveIndex(centerIndex);
      }

      const isMobile = window.innerWidth < 768;
      const radiusX = isMobile ? 225 : 345;
      const radiusZ = isMobile ? 90 : 140;
      const angleStep = isMobile ? 0.72 : 0.66;

      const baseSlot = Math.round(spin) - half;

      for (let slot = 0; slot < count; slot++) {
        const virtualIdx = baseSlot + slot;
        const itemIdx = ((virtualIdx % count) + count) % count;
        const cardEl = cardRefs.current[itemIdx];
        if (!cardEl) continue;

        const n = virtualIdx - spin;
        const distFromCenter = Math.abs(n);
        const angle = n * angleStep;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);

        // Symmetrical 3-card studio fan: center card elevated, left/right neighbors arched cleanly
        let x = radiusX * sinA;
        let y = Math.pow(distFromCenter, 1.35) * (isMobile ? 14 : 20);
        const z = radiusZ * (cosA - 1);

        // Subtle magnetic pull toward cursor on front card
        const dx = ptr.x * 140 - x;
        const dy = ptr.y * 90 - y;
        const mag = Math.exp(-(dx * dx + dy * dy) / 28000) * 0.08;
        x += dx * mag;
        y += dy * mag;

        const rotY = -sinA * 14;
        const rotZ = sinA * 3.5;
        const scale = (isMobile ? 0.86 : 0.9) + Math.max(0, cosA) * 0.1;

        const computedZIndex = Math.round(500 + cosA * 400 - distFromCenter * 40);

        const isCenterCard = itemIdx === centerIndex && distFromCenter < 0.5;
        // Keep left, center, and right cards visible symmetrically with solid surfaces
        const hiddenCard = cosA < 0.05 || distFromCenter > 1.75;
        let depthOpacity = 0;

        if (!hiddenCard) {
          depthOpacity = distFromCenter <= 1.25 ? 1 : Math.max(0, 1 - (distFromCenter - 1.25) * 2.1);
        }

        cardEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        cardEl.style.opacity = depthOpacity.toFixed(2);
        cardEl.style.visibility = hiddenCard ? 'hidden' : 'visible';
        cardEl.style.zIndex = String(Math.max(1, computedZIndex));
        cardEl.style.pointerEvents = distFromCenter <= 1.2 && cosA > 0.25 ? 'auto' : 'none';

        const nextTier = hiddenCard ? 'hidden' : isCenterCard ? 'center' : 'near';
        if (cardEl.dataset.tier !== nextTier) {
          cardEl.dataset.tier = nextTier;
          if (nextTier === 'hidden') {
            cardEl.style.borderColor = 'transparent';
            cardEl.style.boxShadow = 'none';
          } else if (nextTier === 'center') {
            cardEl.style.borderColor = 'rgba(8, 89, 212, 0.35)';
            cardEl.style.boxShadow = '0 24px 52px rgba(29,29,31,0.12), 0 4px 14px rgba(8, 89, 212, 0.08)';
          } else {
            cardEl.style.borderColor = 'rgba(29, 29, 31, 0.08)';
            cardEl.style.boxShadow = '0 14px 32px rgba(29,29,31,0.06)';
          }
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

  const stepDeck = (dir) => {
    spinTargetRef.current = Math.round(spinTargetRef.current) + dir;
  };

  const activeMeta = DOMAIN_META[activeCategory] || DOMAIN_META.tech;

  return (
    <div className="relative w-full flex flex-col items-center my-2 select-none">
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[390px] sm:h-[420px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
        style={{ perspective: '1300px' }}
      >
        {/* Subtle Accent Studio Glow Behind Deck */}
        <div
          className="absolute w-[340px] sm:w-[480px] h-[320px] sm:h-[360px] rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-12"
          style={{
            background: `radial-gradient(circle, ${activeMeta.color} 0%, #0859D4 45%, transparent 72%)`,
          }}
        />

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
                  willChange: 'transform, opacity',
                }}
                className="absolute -left-[145px] -top-[180px] w-[290px] h-[355px] rounded-[24px] bg-white border border-black/10 hover:border-[#0859D4] p-4 flex flex-col justify-between text-left transition-colors duration-300 cursor-pointer group"
              >
                <div>
                  {/* Clean Studio Visual Header */}
                  <div className="relative w-full h-[132px] rounded-2xl bg-[#F5F5F7] border border-black/[0.06] overflow-hidden mb-3.5">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-sm">
                      <Icon className="w-3 h-3" style={{ color: item.accent }} />
                      <span className="font-mono text-[10px] font-semibold text-[#1D1D1F] tracking-tight">
                        {item.society.replace(/^The\s+/i, '')}
                      </span>
                    </div>
                    <span className="absolute top-2.5 right-2.5 font-mono text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] text-[#424242]">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-[17px] text-[#1D1D1F] leading-[1.2] tracking-tight group-hover:text-[#0859D4] transition-colors line-clamp-2 mb-1.5 px-0.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6E6E73] leading-relaxed line-clamp-2 px-0.5">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Minimalist Card Footer */}
                <div className="pt-3 border-t border-black/[0.07] flex items-center justify-between px-0.5">
                  <div className="flex items-center gap-2 min-w-0">
                    {item.mentorAvatar && (
                      <img
                        src={item.mentorAvatar}
                        alt={item.mentorName}
                        loading="lazy"
                        decoding="async"
                        className="w-6 h-6 rounded-full object-cover border border-black/10 shrink-0"
                      />
                    )}
                    <span className="text-xs font-medium text-[#1D1D1F] truncate max-w-[135px]">
                      {item.mentorName}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#F5F5F7] group-hover:bg-[#0859D4] text-[11px] font-mono text-[#0859D4] group-hover:text-white font-semibold flex items-center gap-0.5 transition-colors shrink-0">
                    {item.durationHours}h <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimalist Single-Line Deck Controller */}
      <div className="mt-2 z-30 inline-flex items-center gap-2 p-1 rounded-full bg-white border border-black/[0.08] shadow-[0_6px_20px_rgba(29,29,31,0.06)]">
        <button
          type="button"
          onClick={() => stepDeck(-1)}
          aria-label="Previous cohort"
          className="w-7 h-7 rounded-full hover:bg-[#F5F5F7] text-[#424242] hover:text-[#0859D4] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 px-2 text-xs font-mono">
          <span
            className="w-2 h-2 rounded-full transition-colors duration-300 shrink-0"
            style={{ backgroundColor: activeMeta.color }}
          />
          <span className="text-[#1D1D1F] font-semibold whitespace-nowrap">
            {activeMeta.society}
          </span>
          <span className="text-black/20">•</span>
          <span className="text-[#0859D4] font-semibold tabular-nums whitespace-nowrap">
            {String(activeIndex + 1).padStart(2, '0')} / {String(deckItems.length).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          onClick={() => stepDeck(1)}
          aria-label="Next cohort"
          className="w-7 h-7 rounded-full hover:bg-[#F5F5F7] text-[#424242] hover:text-[#0859D4] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default GrailSpiralDeck;

