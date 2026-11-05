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
  const savedCourseIds = useAppStore((state) => state.savedCourseIds);
  const toggleSave = useAppStore((state) => state.toggleSave);

  const isSaved = savedCourseIds.includes(course.id);
  const category = categoriesData.find((c) => c.id === course.categoryId);
  const mentor = mentorsData.find((m) => m.id === course.mentorId);

  const handleCardClick = () => {
    navigate(`/course/${course.slug}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleSave(course.id);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md overflow-hidden cursor-pointer shadow-soft hover:shadow-lift flex flex-col justify-between transition-shadow duration-base ${className}`}
    >
      <div>
        {/* Thumbnail 16:10 with zoom */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-base group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {category && (
              <span
                style={{
                  backgroundColor: `${category.color}EE`,
                  color: '#FFFFFF',
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-pill shadow-sm"
              >
                {category.name}
              </span>
            )}

            {/* Heart Save Button */}
            <motion.button
              type="button"
              onClick={handleHeartClick}
              whileTap={{ scale: 1.3 }}
              aria-label={isSaved ? 'Remove from saved' : 'Save course'}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-sm text-muted hover:text-accent transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isSaved ? 'fill-accent text-accent' : 'text-slate-600 dark:text-slate-300'
                }`}
                strokeWidth={isSaved ? 0 : 2}
              />
            </motion.button>
          </div>

          {/* Level Tag & Free Pill at bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white pointer-events-none">
            <span className="bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 rounded-sm">
              {course.level}
            </span>
            <span className="bg-accent font-bold px-2 py-0.5 rounded-sm shadow-sm text-white">
              {course.price || 'Free'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Title (max 2 lines) */}
          <h3 className="font-heading font-semibold text-[17px] text-text dark:text-text-dark line-clamp-2 leading-snug group-hover:text-primary dark:group-hover:text-primary-contrast transition-colors mb-2">
            {course.title}
          </h3>

          <p className="text-muted dark:text-muted-dark text-xs sm:text-[13px] line-clamp-2 mb-3">
            {course.shortDescription}
          </p>

          {/* Meta details */}
          <div className="flex items-center gap-3 text-xs text-muted dark:text-muted-dark mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
              {course.durationHours} hrs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
              {course.lessonsCount} lessons
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Mentor & Rating */}
      <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-border/60 dark:border-border-dark/60 flex items-center justify-between">
        {mentor && (
          <div className="flex items-center gap-2">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-6 h-6 rounded-full object-cover border border-border dark:border-border-dark"
            />
            <span className="text-xs font-medium text-text/90 dark:text-text-dark/90 truncate max-w-[110px]">
              {mentor.name}
            </span>
          </div>
        )}
        <Rating value={course.rating} count={course.reviewsCount} size="sm" />
      </div>
    </motion.div>
  );
}

