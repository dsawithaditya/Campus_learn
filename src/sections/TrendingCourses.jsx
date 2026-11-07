import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  BookOpen,
  Star,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../components/Skeleton';
import {
  SplitTextReveal,
  ColonTitle,
  ScrambleText,
} from '../components/AnimatedText';
import { useAppStore } from '../store/useAppStore';
import coursesData from '../data/courses.json';
import mentorsData from '../data/mentors.json';

const filterTabs = [
  { id: 'all', label: 'All Cohorts' },
  { id: 'tech', label: 'Tech & Coding' },
  { id: 'art', label: 'Art & Design' },
  { id: 'sports', label: 'Sports & Fitness' },
  { id: 'music', label: 'Music & Vocals' },
  { id: 'gaming', label: 'Gaming & Esports' },
];

const CATEGORY_NAMES = {
  tech: 'TECH & CODING',
  art: 'ART & DESIGN',
  sports: 'SPORTS & FITNESS',
  music: 'MUSIC & VOCALS',
  singing: 'MUSIC & VOCALS',
  gaming: 'GAMING & ESPORTS',
};

const mentorMap = Array.isArray(mentorsData)
  ? Object.fromEntries(mentorsData.map((m) => [m.id, m]))
  : {};

export function TrendingCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const digitRefs = useRef([]);
  const listRef = useRef(null);
  const photoRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  // Grail Section 4 Live 48-Hour Countdown Clock
  useEffect(() => {
    let remaining = 172799; // 47:59:59
    const pad2 = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      const str = pad2(h) + pad2(m) + pad2(s);
      for (let i = 0; i < 6; i++) {
        const el = digitRefs.current[i];
        if (el && el.textContent !== str[i]) {
          el.textContent = str[i];
        }
      }
      remaining = remaining > 0 ? remaining - 1 : 172799;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];

  const filteredCourses =
    safeCourses
      ?.filter((course) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'tech') return course?.categoryId === 'tech';
        if (activeTab === 'art') return course?.categoryId === 'art';
        if (activeTab === 'sports') return course?.categoryId === 'sports';
        if (activeTab === 'music')
          return course?.categoryId === 'music' || course?.categoryId === 'singing';
        if (activeTab === 'gaming') return course?.categoryId === 'gaming';
        return true;
      })
      ?.slice(0, 8) || [];

  // Grail Split-Row Scroll Progress (--rp) + Horizontal Mouse-Tracking Photos
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let mouseX = -1;
    let mouseY = -1;
    const offsets = filteredCourses.map(() => 0);

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
        const rp = Math.min(1, Math.max(0, (vh * 0.94 - rect.top) / (vh * 0.48)));
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

      for (let i = 0; i < filteredCourses.length; i++) {
        const photoEl = photoRefs.current[i];
        if (!photoEl) continue;
        let targetX = 0;
        if (inView && mouseX >= 0) {
          const r = photoEl.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const weight = 1 / (1 + Math.pow((mouseY - cy) / 140, 2));
          targetX = Math.max(-44, Math.min(44, (mouseX - cx) * 0.14)) * weight;
        }
        offsets[i] = (offsets[i] || 0) + (targetX - (offsets[i] || 0)) * 0.12;
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
  }, [filteredCourses]);

  const handleRowClick = (course) => {
    navigate(`/course/${course.slug || course.id}`);
  };

  return (
    <section id="courses" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[350px] bg-[#FF6B00]/[0.05] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        {/* Grail ColonTitle Chapter Bar */}
        <ColonTitle
          label="About Live Cohorts & Sprints"
          chapter="Chapter 02"
        />

        {/* Grail Monumental 48-Hour Countdown Clock Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-zinc-950/90 to-black/90 border border-white/[0.08] p-6 sm:p-9 mb-14 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B00] font-semibold block mb-1.5">
                NEXT CAMPUS SPRINT WINDOW
              </span>
              <h3 className="font-grail-serif text-3xl sm:text-5xl text-white leading-[0.9] tracking-[-0.01em]">
                Cohort accepted.{' '}
                <span className="text-[#FFA057]">Clock&apos;s running.</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 max-w-md leading-relaxed">
                48 hours to lock in your weekly deliverable with your senior mentor—because &ldquo;someday&rdquo; is how every side project dies.
              </p>
            </div>

            {/* Giant Grail Tabular Clock Digits */}
            <div
              aria-hidden="true"
              className="font-grail-serif text-[clamp(44px,7.5vw,92px)] text-[#FF6B00] leading-none tracking-[-0.02em] flex items-baseline select-none drop-shadow-[0_0_28px_rgba(255,107,0,0.28)]"
            >
              {['47', '59', '59'].map((pair, gIdx) => (
                <React.Fragment key={gIdx}>
                  {gIdx > 0 && (
                    <span className="inline-block w-[0.24em] text-center text-white/35">
                      :
                    </span>
                  )}
                  <span className="inline-flex">
                    {[0, 1].map((dIdx) => (
                      <span
                        key={dIdx}
                        ref={(el) => {
                          digitRefs.current[gIdx * 2 + dIdx] = el;
                        }}
                        className="inline-block w-[0.58em] text-center tabular-nums"
                      >
                        {pair[dIdx]}
                      </span>
                    ))}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2">
              <ScrambleText text="02 // PEER-LED BOOTCAMPS" />
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.06]">
              <SplitTextReveal text="Featured Campus" />{' '}
              <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.08em]">
                Cohorts
              </span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/explore')}
            className="btn-zephyr-secondary text-xs sm:text-sm self-start md:self-auto group"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Grail-Styled Pill Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'text-[#09090B] font-bold'
                    : 'bg-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.12] border border-white/[0.08]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="trending-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFA057] shadow-[0_0_22px_rgba(255,107,0,0.45)] -z-10"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Grail-Style Horizontal Split-Row Cohort Stage */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-2xl bg-zinc-900/60" />
            ))}
          </div>
        ) : (
          <div ref={listRef} className="space-y-1">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => {
                const categoryLabel =
                  CATEGORY_NAMES[course?.categoryId] || 'CAMPUS COHORT';
                const mentor = mentorMap[course?.mentorId] || {
                  name: 'Senior Campus Mentor',
                  avatar:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                };

                return (
                  <motion.div
                    key={course?.id}
                    layout
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ '--rp': 1 }}
                    onClick={() => handleRowClick(course)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.985 }}
                    className="group relative grid grid-cols-1 md:grid-cols-[1.1fr_auto_1.1fr] items-stretch gap-6 lg:gap-10 min-h-[175px] py-7 px-4 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.025] cursor-pointer"
                  >
                    {/* Top Center-Scaling Hairline Divider */}
                    <div
                      aria-hidden="true"
                      style={{
                        transform: 'scaleX(var(--rp, 1))',
                        transformOrigin: '50% 50%',
                      }}
                      className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent transition-transform duration-200"
                    />

                    {/* Left Column: Category Kicker + Bold Cohort Title + Index Number */}
                    <div
                      style={{
                        opacity: 'var(--rp, 1)',
                        transform: 'translateX(calc((1 - var(--rp, 1)) * 4.5vw))',
                      }}
                      className="flex flex-col justify-between max-w-md pr-2 transition-transform duration-150"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B00] font-bold">
                            {categoryLabel}
                          </span>
                          {course?.level && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                              {course.level}
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading text-xl sm:text-2xl lg:text-[25px] font-bold text-white leading-tight group-hover:text-[#FFA057] transition-colors duration-200">
                          {course?.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 mt-4 pt-2">
                        <span className="font-mono text-xs sm:text-sm text-zinc-500 font-semibold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                          48H SPRINT
                        </span>
                      </div>
                    </div>

                    {/* Center Column: Smooth Scaled & Mouse-Tracking Photo (Clean, No Hollow Outline) */}
                    <div className="flex items-center justify-start md:justify-center">
                      <div
                        ref={(el) => {
                          photoRefs.current[idx] = el;
                        }}
                        className="will-change-transform relative group/thumb"
                      >
                        <div
                          style={{
                            opacity: 'var(--rp, 1)',
                            transform: 'scale(calc(0.93 + var(--rp, 1) * 0.07))',
                          }}
                          className="relative overflow-hidden rounded-[16px] shadow-[0_14px_40px_rgba(0,0,0,0.85)] group-hover:shadow-[0_18px_48px_rgba(255,107,0,0.22)] transition-all duration-200"
                        >
                          <img
                            src={course?.thumbnail}
                            alt={course?.title || 'Cohort thumbnail'}
                            loading="lazy"
                            decoding="async"
                            className="w-[200px] sm:w-[225px] lg:w-[250px] h-[125px] sm:h-[138px] lg:h-[150px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />

                          {/* Subtle Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Floating Price Pill */}
                          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0B0B0F]/85 border border-[#FF6B00]/30 backdrop-blur-md">
                            <span className="font-mono text-[11px] font-bold text-[#FFA057] uppercase tracking-wider">
                              {course?.price || 'Free'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Narrative Description + Metadata + Join CTA */}
                    <div
                      style={{
                        opacity: 'var(--rp, 1)',
                        transform:
                          'translateX(calc((1 - var(--rp, 1)) * -4.5vw))',
                      }}
                      className="flex flex-col justify-between max-w-md md:justify-self-end self-center w-full transition-transform duration-150"
                    >
                      <p className="text-zinc-300 text-xs sm:text-[14px] leading-[1.4] line-clamp-2 mb-4 font-normal">
                        {course?.shortDescription}
                      </p>

                      {/* Mentor and Cohort Metrics */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-5">
                        {/* Mentor Avatar + Name */}
                        <div className="flex items-center gap-2">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-5 h-5 rounded-full object-cover border border-white/20"
                          />
                          <span className="font-medium text-zinc-200">
                            {mentor.name}
                          </span>
                        </div>

                        <span className="text-zinc-600">•</span>

                        {/* Duration */}
                        <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                          <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>{course?.durationHours || 10}h</span>
                        </div>

                        <span className="text-zinc-600">•</span>

                        {/* Lessons */}
                        <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                          <BookOpen className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>{course?.lessonsCount || 18} lessons</span>
                        </div>

                        <span className="text-zinc-600">•</span>

                        {/* Rating */}
                        <div className="flex items-center gap-1 font-mono text-[11px] text-[#FFA057]">
                          <Star className="w-3 h-3 fill-[#FFA057] text-[#FFA057]" />
                          <span>{course?.rating || 4.9}</span>
                        </div>
                      </div>

                      {/* Interactive Action Button */}
                      <div className="flex items-center pt-1">
                        {/* Join Cohort CTA Button */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03, x: 2 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(course);
                          }}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-[#FF6B00] text-zinc-200 hover:text-white font-heading font-semibold text-xs sm:text-sm tracking-tight border border-white/10 hover:border-[#FF6B00] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_22px_rgba(255,107,0,0.35)] transition-all duration-300 group/btn"
                        >
                          <span>Join Cohort</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

export default TrendingCourses;
