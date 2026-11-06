import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { Skeleton } from '../components/Skeleton';
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
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];

  const filteredCourses = safeCourses
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
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[350px] bg-white/[0.015] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
              Peer-Led Bootcamps
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Featured Campus Cohorts
            </h2>
          </div>

          <button
            onClick={() => navigate('/explore')}
            className="btn-zephyr-secondary text-xs sm:text-sm self-start md:self-auto"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70" />
          </button>
        </div>

        {/* Minimalist Pill Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B00] text-white shadow-[0_0_20px_rgba(255,107,0,0.45)] font-semibold scale-105 border border-[#FF6B00]'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
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
              {filteredCourses.map((course) => (
                <motion.div
                  key={course?.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
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
