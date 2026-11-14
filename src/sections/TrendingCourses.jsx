import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CourseCard } from '../components/CourseCard';
import { SplitTextReveal } from '../components/AnimatedText';
import coursesData from '../data/courses.json';

gsap.registerPlugin(ScrollTrigger);

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Tech' },
  { id: 'art', label: 'Design' },
  { id: 'music', label: 'Music' },
  { id: 'sports', label: 'Sports' },
  { id: 'gaming', label: 'Gaming' },
];

export function TrendingCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];

  const filteredCourses = safeCourses
    .filter((course) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'music')
        return course?.categoryId === 'music' || course?.categoryId === 'singing';
      return course?.categoryId === activeTab;
    })
    .slice(0, 3);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const gridEl = gridRef.current;
    if (!gridEl) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.trending-course-item', {
        y: 22,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: gridEl,
          start: 'top 88%',
          once: true,
        },
      });
    }, gridEl);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section id="courses" className="relative py-16 sm:py-20 border-t border-black/[0.08] overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0859D4] font-semibold block mb-2">
              LIVE NOW
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#1D1D1F] tracking-tight">
              <SplitTextReveal text="Featured" />{' '}
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.1em]">
                Cohorts
              </span>
            </h2>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/explore')}
            className="btn-zephyr-secondary text-xs sm:text-sm self-start sm:self-auto group"
          >
            <span>All Courses</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Minimal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-heading font-semibold transition-colors whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'text-white font-bold'
                    : 'bg-[#F5F5F7] text-[#424242] hover:text-[#1D1D1F] hover:bg-[#EBEBF0] border border-black/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="trending-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0859D4] to-[#1A59F9] shadow-[0_4px_14px_rgba(8,89,212,0.28)] -z-10"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* 3-Card Modern Grid (GSAP ScrollTrigger staggered entrance) */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredCourses.map((course, idx) => (
            <div key={course?.id || idx} className="trending-course-item">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingCourses;
