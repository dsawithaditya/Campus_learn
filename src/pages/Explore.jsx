import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Skeleton } from '../components/Skeleton';
import { Button } from '../components/Button';
import coursesData from '../data/courses.json';
import categoriesData from '../data/categories.json';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const levelParam = searchParams.get('level') || 'all';
  const sortParam = searchParams.get('sort') || 'popular';
  const durationParam = searchParams.get('duration') || 'all';
  const rating4Plus = searchParams.get('rating4') === 'true';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam ? categoryParam.split(',') : []
  );
  const [selectedLevel, setSelectedLevel] = useState(levelParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [selectedDuration, setSelectedDuration] = useState(durationParam);
  const [isRating4Plus, setIsRating4Plus] = useState(rating4Plus);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  const updateFilters = (newFilters) => {
    const updated = {
      q: newFilters.q !== undefined ? newFilters.q : searchQuery,
      category:
        newFilters.categories !== undefined
          ? newFilters.categories.join(',')
          : selectedCategories.join(','),
      level: newFilters.level !== undefined ? newFilters.level : selectedLevel,
      sort: newFilters.sort !== undefined ? newFilters.sort : selectedSort,
      duration: newFilters.duration !== undefined ? newFilters.duration : selectedDuration,
      rating4: newFilters.rating4 !== undefined ? String(newFilters.rating4) : String(isRating4Plus),
    };

    const params = new URLSearchParams();
    if (updated.q) params.set('q', updated.q);
    if (updated.category) params.set('category', updated.category);
    if (updated.level && updated.level !== 'all') params.set('level', updated.level);
    if (updated.sort && updated.sort !== 'popular') params.set('sort', updated.sort);
    if (updated.duration && updated.duration !== 'all') params.set('duration', updated.duration);
    if (updated.rating4 === 'true') params.set('rating4', 'true');

    setSearchParams(params);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 250);
  };

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    const cats = searchParams.get('category');
    setSelectedCategories(cats ? cats.split(',') : []);
    setSelectedLevel(searchParams.get('level') || 'all');
    setSelectedSort(searchParams.get('sort') || 'popular');
    setSelectedDuration(searchParams.get('duration') || 'all');
    setIsRating4Plus(searchParams.get('rating4') === 'true');
  }, [searchParams]);

  const toggleCategory = (catId) => {
    const next = selectedCategories.includes(catId)
      ? selectedCategories.filter((c) => c !== catId)
      : [...selectedCategories, catId];
    setSelectedCategories(next);
    updateFilters({ categories: next });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedLevel('all');
    setSelectedSort('popular');
    setSelectedDuration('all');
    setIsRating4Plus(false);
    setSearchParams(new URLSearchParams());
  };

  const filteredCourses = useMemo(() => {
    let result = [...safeCourses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c?.title?.toLowerCase().includes(q) ||
          c?.shortDescription?.toLowerCase().includes(q) ||
          c?.tags?.some((t) => t?.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c?.categoryId));
    }

    if (selectedLevel !== 'all') {
      result = result.filter((c) => c?.level?.toLowerCase() === selectedLevel.toLowerCase());
    }

    if (selectedDuration === 'short') {
      result = result.filter((c) => (c?.durationHours || 0) < 8);
    } else if (selectedDuration === 'medium') {
      result = result.filter(
        (c) => (c?.durationHours || 0) >= 8 && (c?.durationHours || 0) <= 12
      );
    } else if (selectedDuration === 'long') {
      result = result.filter((c) => (c?.durationHours || 0) > 12);
    }

    if (isRating4Plus) {
      result = result.filter((c) => (c?.rating || 0) >= 4.0);
    }

    if (selectedSort === 'newest') {
      result.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
    } else {
      result.sort((a, b) => (b?.studentsCount || 0) - (a?.studentsCount || 0));
    }

    return result;
  }, [
    safeCourses,
    searchQuery,
    selectedCategories,
    selectedLevel,
    selectedDuration,
    isRating4Plus,
    selectedSort,
  ]);

  const activeFilterCount =
    (selectedCategories.length > 0 ? selectedCategories.length : 0) +
    (selectedLevel !== 'all' ? 1 : 0) +
    (selectedDuration !== 'all' ? 1 : 0) +
    (isRating4Plus ? 1 : 0);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container-custom">
        {/* Header with Search and Stats */}
        <div className="py-6 border-b border-white/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-100">
                Explore Peer Courses
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Showing{' '}
                <span className="font-bold text-orange-400">
                  {filteredCourses.length}
                </span>{' '}
                college-created courses
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <Search
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                strokeWidth={2}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateFilters({ q: e.target.value });
                }}
                placeholder="Search courses, tags, tools..."
                className="w-full pl-10 pr-9 py-2.5 bg-zinc-900/60 border border-white/10 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-orange-500/60 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    updateFilters({ q: '' });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 flex-wrap gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-200 shadow-sm active:scale-95"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:underline font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters ({activeFilterCount})</span>
              </button>
            )}

            {/* Sort selector */}
            <div className="flex items-center gap-2 ml-auto text-xs sm:text-sm">
              <span className="text-zinc-400">Sort by:</span>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  updateFilters({ sort: e.target.value });
                }}
                className="bg-zinc-900 border border-white/10 text-zinc-200 rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-orange-500/60 text-xs sm:text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Left Filter Panel + Right Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop Left Filter Panel */}
          <aside className="hidden md:block md:col-span-3 space-y-6">
            <div className="glass-card p-5 shadow-lg space-y-6">
              {/* Category Multi-select */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  {safeCategories?.map((cat) => {
                    const isChecked = selectedCategories.includes(cat?.id);
                    return (
                      <label
                        key={cat?.id}
                        className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat?.id)}
                            className="rounded border-zinc-700 bg-zinc-800 text-orange-500 focus:ring-orange-500 h-3.5 w-3.5"
                          />
                          <span className={isChecked ? 'font-bold text-orange-400' : 'text-zinc-300'}>
                            {cat?.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500">
                          {cat?.courseCount}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Level Filter */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Difficulty Level
                </h4>
                <div className="space-y-1 text-xs">
                  {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                    <label
                      key={lvl}
                      className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer capitalize"
                    >
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl}
                        onChange={() => {
                          setSelectedLevel(lvl);
                          updateFilters({ level: lvl });
                        }}
                        className="text-orange-500 focus:ring-orange-500 h-3.5 w-3.5"
                      />
                      <span className="text-zinc-300">
                        {lvl === 'all' ? 'All Levels' : lvl}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Duration
                </h4>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'Any Duration' },
                    { id: 'short', label: '< 8 hours' },
                    { id: 'medium', label: '8 - 12 hours' },
                    { id: 'long', label: '> 12 hours' },
                  ].map((dur) => (
                    <label
                      key={dur.id}
                      className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="duration"
                        checked={selectedDuration === dur.id}
                        onChange={() => {
                          setSelectedDuration(dur.id);
                          updateFilters({ duration: dur.id });
                        }}
                        className="text-orange-500 focus:ring-orange-500 h-3.5 w-3.5"
                      />
                      <span className="text-zinc-300">{dur.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating 4+ */}
              <div className="pt-4 border-t border-white/10">
                <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isRating4Plus}
                    onChange={(e) => {
                      setIsRating4Plus(e.target.checked);
                      updateFilters({ rating4: e.target.checked });
                    }}
                    className="rounded border-zinc-700 bg-zinc-800 text-orange-500 focus:ring-orange-500 h-3.5 w-3.5"
                  />
                  <span className="text-zinc-300 font-medium">
                    Rated 4.0 & above only
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right: Course Cards Grid */}
          <main className="col-span-1 md:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} variant="card" />
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="glass-card p-12 text-center flex flex-col items-center justify-center my-6">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-xl text-zinc-100 mb-2">
                  No courses match your filters
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
                  Try adjusting your search terms, clearing some categories, or resetting filters to view all courses.
                </p>
                <Button variant="secondary" onClick={handleClearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredCourses?.slice(0, visibleCount)?.map((course, idx) => (
                    <div
                      key={course?.id || idx}
                      className={`animate-fade-up ${
                        idx % 3 === 0 ? 'delay-1' : idx % 3 === 1 ? 'delay-2' : 'delay-3'
                      }`}
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </motion.div>

                {/* Load More Button */}
                {visibleCount < filteredCourses.length && (
                  <div className="mt-10 text-center">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                    >
                      Load more courses ({filteredCourses.length - visibleCount} remaining)
                    </Button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom-Sheet Filter */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-zinc-950 border-t border-white/10 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-zinc-100">
                  Filters
                </h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {safeCategories?.map((cat) => {
                    const isChecked = selectedCategories.includes(cat?.id);
                    return (
                      <button
                        key={cat?.id}
                        type="button"
                        onClick={() => toggleCategory(cat?.id)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          isChecked
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-zinc-900 text-zinc-300 border-white/10'
                        }`}
                      >
                        {cat?.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Difficulty Level
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setSelectedLevel(lvl);
                        updateFilters({ level: lvl });
                      }}
                      className={`text-xs py-2 px-3 rounded-lg border text-center capitalize ${
                        selectedLevel === lvl
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-zinc-900 text-zinc-300 border-white/10'
                      }`}
                    >
                      {lvl === 'all' ? 'All' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredCourses.length} results)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
