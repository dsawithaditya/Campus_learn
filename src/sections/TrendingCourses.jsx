import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { Tabs } from '../components/Tabs';
import { Skeleton } from '../components/Skeleton';
import coursesData from '../data/courses.json';

const filterTabs = [
  { id: 'all', label: 'All Skill Camps' },
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
    }, 400);
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
    <section className="py-20 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Flame className="w-4 h-4 text-orange-500" strokeWidth={2} />
              <span>Trending Bootcamps</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white leading-[1.15]">
              Most Popular Peer Camps
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group self-start md:self-auto cursor-pointer"
          >
            <span>Browse all 100+ bootcamps</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <Tabs
            tabs={filterTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            id="trending-filter-tabs"
          />
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, index) => (
                <div
                  key={course?.id}
                  className={`animate-fade-up delay-${(index % 3) + 1}`}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
