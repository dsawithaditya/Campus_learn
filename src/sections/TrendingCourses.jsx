import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { Tabs } from '../components/Tabs';
import { Skeleton } from '../components/Skeleton';
import coursesData from '../data/courses.json';

const filterTabs = [
  { id: 'all', label: 'All Fields' },
  { id: 'tech', label: 'Tech & Coding' },
  { id: 'art', label: 'Arts & Design' },
  { id: 'sports', label: 'Sports & Fitness' },
  { id: 'music', label: 'Music & Singing' },
];

export function TrendingCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 600 ms skeleton loading state on first load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = coursesData.filter((course) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'tech') return course.categoryId === 'tech';
    if (activeTab === 'art') return course.categoryId === 'art';
    if (activeTab === 'sports') return course.categoryId === 'sports';
    if (activeTab === 'music') return course.categoryId === 'music' || course.categoryId === 'singing';
    return true;
  }).slice(0, 8);

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <Flame className="w-4 h-4 text-accent" strokeWidth={2} />
              <span>Trending on Campus</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[40px] text-text dark:text-text-dark leading-[1.15]">
              Most Popular Peer Courses
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="text-sm font-semibold text-primary dark:text-primary-contrast hover:underline flex items-center gap-1.5 group self-start md:self-auto"
          >
            <span>Explore all {coursesData.length} courses</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="mb-8">
          <Tabs
            tabs={filterTabs}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId)}
            id="trending"
          />
        </div>

        {/* Courses Grid: 4-col desktop, 2-col tablet, horizontal swipe on mobile */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} variant="card" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

