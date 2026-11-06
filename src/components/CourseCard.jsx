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
      className={`glass-card group relative overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(249,115,22,0.12), transparent 40%)',
      }}
    >
      <div>
        {/* Thumbnail 16:10 with zoom */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-800/80 mb-4">
          <motion.img
            src={course?.thumbnail}
            alt={course?.title || 'Course thumbnail'}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {category && (
              <span
                style={{
                  backgroundColor: `${category?.color || '#f97316'}EE`,
                  color: '#FFFFFF',
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
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
              className="pointer-events-auto w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md flex items-center justify-center shadow-md text-zinc-300 hover:text-orange-500 transition-colors border border-white/10"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isSaved ? 'fill-orange-500 text-orange-500' : 'text-zinc-300'
                }`}
                strokeWidth={isSaved ? 0 : 2}
              />
            </motion.button>
          </div>

          {/* Level Tag & Free Pill at bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white pointer-events-none">
            <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
              {course?.level}
            </span>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 font-bold px-2.5 py-0.5 rounded-md shadow-sm text-white">
              {course?.price || 'Free'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title (max 2 lines) */}
          <h3 className="font-heading font-bold text-[17px] text-zinc-100 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors">
            {course?.title}
          </h3>

          <p className="text-zinc-400 text-xs sm:text-[13px] line-clamp-2 leading-relaxed">
            {course?.shortDescription}
          </p>

          {/* Meta details */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 pt-1 pb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
              {course?.durationHours} hrs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
              {course?.lessonsCount} lessons
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Mentor & Rating */}
      <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
        {mentor && (
          <div className="flex items-center gap-2">
            <img
              src={mentor?.avatar}
              alt={mentor?.name || 'Mentor'}
              className="w-6 h-6 rounded-full object-cover border border-white/20"
            />
            <span className="text-xs font-medium text-zinc-300 truncate max-w-[110px]">
              {mentor?.name}
            </span>
          </div>
        )}
        <Rating value={course?.rating ?? 5} count={course?.reviewsCount} size="sm" />
      </div>
    </div>
  );
}
