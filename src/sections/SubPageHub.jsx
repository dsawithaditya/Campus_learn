import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Compass, Users, Layers, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: '01',
    title: 'Courses',
    tagline: 'Live peer cohorts across 8 domains',
    to: '/explore',
    icon: Compass,
  },
  {
    num: '02',
    title: 'Mentors',
    tagline: 'Learn 1-on-1 from campus seniors',
    to: '/mentors',
    icon: Users,
  },
  {
    num: '03',
    title: 'How It Works',
    tagline: '4-week sprint format & roadmap',
    to: '/how-it-works',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Guilds & Outcomes',
    tagline: 'Campus societies, stats & stories',
    to: '/outcomes',
    icon: Sparkles,
  },
];

export function SubPageHub() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const gridEl = gridRef.current;
    if (!gridEl) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.hub-chapter-card', {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: gridEl,
          start: 'top 86%',
          once: true,
        },
      });
    }, gridEl);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 sm:py-20 border-t border-black/[0.08]">
      <div className="container-custom">
        <div
          data-scroll
          data-scroll-speed="0.04"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0859D4] font-semibold block mb-2">
              EXPLORE THE PLATFORM
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#1D1D1F] tracking-tight">
              Built in focused{' '}
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.1em]">
                chapters.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E73] max-w-xs">
            Jump straight into what you need.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.to}
                type="button"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(card.to)}
                className="hub-chapter-card studio-shimmer-card group relative p-6 rounded-2xl bg-white border border-black/[0.08] hover:border-[#0859D4]/45 text-left flex flex-col justify-between min-h-[168px] transition-colors duration-300 shadow-[0_8px_24px_rgba(29,29,31,0.05)] hover:shadow-[0_14px_34px_rgba(8,89,212,0.12)] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0859D4]/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between w-full mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0859D4]/10 border border-[#0859D4]/20 text-[#0859D4] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-[#6E6E73] group-hover:text-[#0859D4] transition-colors">
                    {card.num}
                  </span>
                </div>

                <div className="relative z-10 flex items-end justify-between gap-2 w-full">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1D1D1F] group-hover:text-[#0859D4] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#6E6E73] mt-1">{card.tagline}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0859D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mb-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SubPageHub;
