import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { Skeleton } from '../components/Skeleton';
import { SplitTextReveal, ScrambleText } from '../components/AnimatedText';
import coursesData from '../data/courses.json';

const filterTabs = [
  { id: 'all', label: 'All Cohorts' },
  { id: 'tech', label: 'Tech & Coding' },
  { id: 'art', label: 'Art & Design' },
  { id: 'sports', label: 'Sports & Fitness' },
  { id: 'music', label: 'Music & Vocals' },
  { id: 'gaming', label: 'Gaming & Esports' },
];

export function TrendingCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
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

  return (
    <section id="courses" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[350px] bg-[#FF6B00]/[0.04] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
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

        {/* Spring-Animated Pill Filter Tabs */}
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
                    ? 'text-white'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.07]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="trending-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] shadow-[0_0_22px_rgba(255,107,0,0.45)] -z-10"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl bg-zinc-900/60" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course?.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default TrendingCourses;
