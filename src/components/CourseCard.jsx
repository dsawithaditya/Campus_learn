import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Rating } from './Rating';
import categoriesData from '../data/categories.json';
import mentorsData from '../data/mentors.json';

export function CourseCard({ course, className = '' }) {
  const navigate = useNavigate();
  const savedCourseIds = useAppStore((state) => state.savedCourseIds) || [];
  const toggleSave = useAppStore((state) => state.toggleSave);

  if (!course) return null;

  const isSaved = savedCourseIds?.includes(course.id);
  const category = categoriesData?.find((c) => c?.id === course?.categoryId);
  const mentor = mentorsData?.find((m) => m?.id === course?.mentorId);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleCardClick = () => {
    if (course?.slug) {
      navigate(`/course/${course.slug}`);
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (course?.id) {
      toggleSave(course.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      className={`zephyr-card p-4 group relative overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 rounded-2xl ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,255,255,0.08), transparent 45%)',
      }}
    >
      <div>
        {/* Thumbnail 16:10 with zoom */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 border border-white/10 group-hover:border-[#FF6B00]/40 transition-colors mb-3.5">
          <motion.img
            src={course?.thumbnail}
            alt={course?.title || 'Course thumbnail'}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle dark vignette overlay to fit the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-black/20 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {category && (
              <span
                style={{
                  backgroundColor: `${category?.color || '#3b82f6'}`,
                  color: '#FFFFFF',
                }}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
              >
                {category?.name}
              </span>
            )}

            {/* Heart Save Button */}
            <motion.button
              type="button"
              onClick={handleHeartClick}
              whileTap={{ scale: 1.3 }}
              aria-label={isSaved ? 'Remove from saved' : 'Save course'}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-center shadow-md text-slate-400 hover:text-rose-500 transition-colors border border-slate-200/60 dark:border-white/10"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                }`}
                strokeWidth={isSaved ? 0 : 2}
              />
            </motion.button>
          </div>

          {/* Level Tag & Free Pill at bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white pointer-events-none">
            <span className="bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10">
              {course?.level}
            </span>
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] font-bold px-2.5 py-0.5 rounded-full shadow-sm text-white">
              {course?.price || 'Free'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title (max 2 lines) */}
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-[#FF6B00] transition-colors">
            {course?.title}
          </h3>

          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-[13px] line-clamp-2 leading-relaxed">
            {course?.shortDescription}
          </p>

          {/* Meta details */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-500 pt-1 pb-1">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#FF6B00]" strokeWidth={2} />
              {course?.durationHours} hrs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-[#FF6B00]" strokeWidth={2} />
              {course?.lessonsCount} lessons
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Mentor & Rating */}
      <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
        {mentor && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full p-[1px] bg-gradient-to-tr from-[#FF6B00]/50 to-white/20 shrink-0">
              <img
                src={mentor?.avatar}
                alt={mentor?.name || 'Mentor'}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-zinc-300 truncate max-w-[110px]">
              {mentor?.name}
            </span>
          </div>
        )}
        <Rating value={course?.rating ?? 5} count={course?.reviewsCount} size="sm" />
      </div>
    </div>
  );
}
