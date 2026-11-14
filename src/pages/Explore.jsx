import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  Star,
} from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Skeleton } from '../components/Skeleton';
import { Button } from '../components/Button';
import { SplitTextReveal } from '../components/AnimatedText';
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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    setTimeout(() => setIsLoading(false), 180);
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

  const selectAllCategories = () => {
    setSelectedCategories([]);
    updateFilters({ categories: [] });
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

  const secondaryFilterCount =
    (selectedLevel !== 'all' ? 1 : 0) +
    (selectedDuration !== 'all' ? 1 : 0) +
    (isRating4Plus ? 1 : 0);

  const activeFilterCount = selectedCategories.length + secondaryFilterCount + (searchQuery ? 1 : 0);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-custom">
        {/* Clean Modern Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#1D1D1F] tracking-tight leading-[1.06]">
              <SplitTextReveal text="Explore" />{' '}
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.1em]">
                Cohorts
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-2 font-mono">
              <span className="font-bold text-[#0859D4]">{filteredCourses.length}</span>{' '}
              {filteredCourses.length === 1 ? 'cohort' : 'cohorts'} available
            </p>
          </div>

          {/* Search Pill */}
          <div className="w-full md:w-80 relative">
            <Search
              className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]"
              strokeWidth={2}
            />
            <input
              type="text"
              id="explore-search-input"
              name="search"
              aria-label="Search courses, tags, and tools"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                updateFilters({ q: e.target.value });
              }}
              placeholder="Search cohorts, skills, tools..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#F5F5F7] border border-black/[0.08] rounded-full text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:bg-white focus:border-[#0859D4]/60 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  updateFilters({ q: '' });
                }}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-[#6E6E73] hover:text-[#1D1D1F] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-5">
          <button
            type="button"
            onClick={selectAllCategories}
            className={`px-4 min-h-[40px] flex items-center rounded-full text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all cursor-pointer select-none ${
              selectedCategories.length === 0
                ? 'bg-[#0859D4] text-white font-bold shadow-[0_4px_14px_rgba(8,89,212,0.28)]'
                : 'bg-[#F5F5F7] text-[#424242] hover:text-[#1D1D1F] hover:bg-[#EBEBF0] border border-black/[0.06]'
            }`}
          >
            All Domains
          </button>

          {safeCategories.map((cat) => {
            const isSelected = selectedCategories.includes(cat?.id);
            return (
              <button
                key={cat?.id}
                type="button"
                onClick={() => toggleCategory(cat?.id)}
                className={`px-4 min-h-[40px] flex items-center rounded-full text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#0859D4] text-white font-bold shadow-[0_4px_14px_rgba(8,89,212,0.28)]'
                    : 'bg-[#F5F5F7] text-[#424242] hover:text-[#1D1D1F] hover:bg-[#EBEBF0] border border-black/[0.06]'
                }`}
              >
                {cat?.name}
              </button>
            );
          })}
        </div>

        {/* Compact Toolbar: Filters Toggle + Reset + Sort */}
        <div className="flex items-center justify-between gap-3 py-3 border-y border-black/[0.08] mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-4 min-h-[40px] rounded-full text-xs font-heading font-semibold border transition-colors cursor-pointer ${
                isFilterOpen || secondaryFilterCount > 0
                  ? 'bg-[#0859D4]/10 border-[#0859D4]/30 text-[#0859D4]'
                  : 'bg-[#F5F5F7] border-black/[0.08] text-[#424242] hover:text-[#1D1D1F] hover:bg-[#EBEBF0]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {secondaryFilterCount > 0 && (
                <span className="bg-[#0859D4] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {secondaryFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#6E6E73] hover:text-[#0859D4] transition-colors font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-[#6E6E73] font-mono uppercase tracking-wider text-[11px]">Sort</span>
            <select
              id="explore-sort"
              name="sort"
              aria-label="Sort courses by"
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
                updateFilters({ sort: e.target.value });
              }}
              className="bg-[#F5F5F7] border border-black/[0.08] text-[#1D1D1F] rounded-full px-3.5 py-1.5 font-medium outline-none focus:bg-white focus:border-[#0859D4]/60 text-xs cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Collapsible Inline Glass Filter Bar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-[0_12px_32px_rgba(29,29,31,0.06)] grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Level */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#6E6E73] mb-2.5">
                    Difficulty
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl);
                          updateFilters({ level: lvl });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors cursor-pointer ${
                          selectedLevel === lvl
                            ? 'bg-[#0859D4] text-white font-bold shadow-sm'
                            : 'bg-[#F5F5F7] text-[#424242] hover:bg-[#EBEBF0] border border-black/[0.06]'
                        }`}
                      >
                        {lvl === 'all' ? 'All' : lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#6E6E73] mb-2.5">
                    Duration
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'Any' },
                      { id: 'short', label: '< 8h' },
                      { id: 'medium', label: '8–12h' },
                      { id: 'long', label: '> 12h' },
                    ].map((dur) => (
                      <button
                        key={dur.id}
                        type="button"
                        onClick={() => {
                          setSelectedDuration(dur.id);
                          updateFilters({ duration: dur.id });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          selectedDuration === dur.id
                            ? 'bg-[#0859D4] text-white font-bold shadow-sm'
                            : 'bg-[#F5F5F7] text-[#424242] hover:bg-[#EBEBF0] border border-black/[0.06]'
                        }`}
                      >
                        {dur.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#6E6E73] mb-2.5">
                    Rating
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !isRating4Plus;
                      setIsRating4Plus(next);
                      updateFilters({ rating4: next });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      isRating4Plus
                        ? 'bg-[#0859D4] text-white font-bold shadow-sm'
                        : 'bg-[#F5F5F7] text-[#424242] hover:bg-[#EBEBF0] border border-black/[0.06]'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isRating4Plus ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'}`} />
                    <span>4.0+ Rated Only</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-Width 3-Column Course Grid */}
        <section aria-label="Course catalog">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant="card" />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="glass-card p-12 text-center flex flex-col items-center justify-center my-6">
              <div className="w-14 h-14 rounded-full bg-[#0859D4]/10 text-[#0859D4] flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#1D1D1F] mb-2">
                No cohorts found
              </h3>
              <p className="text-sm text-[#6E6E73] max-w-sm mb-6">
                Try clearing filters or searching a different keyword.
              </p>
              <Button variant="secondary" onClick={handleClearFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCourses.slice(0, visibleCount).map((course, idx) => (
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

              {visibleCount < filteredCourses.length && (
                <div className="mt-10 text-center">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Load more ({filteredCourses.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
