import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, BookOpen, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Rating } from './Rating';
import categoriesData from '../data/categories.json';
import mentorsData from '../data/mentors.json';

const FALLBACK_THUMB = '/images/courses/react-supabase.svg';

export function CourseCard({ course, className = '' }) {
  const navigate = useNavigate();
  const savedCourseIds = useAppStore((state) => state.savedCourseIds) || [];
  const toggleSave = useAppStore((state) => state.toggleSave);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(course?.thumbnail || FALLBACK_THUMB);

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
    <motion.div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`zephyr-card p-4 group relative overflow-hidden cursor-pointer flex flex-col justify-between rounded-2xl h-full select-none ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(360px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(8,89,212,0.06), transparent 45%)',
      }}
    >
      <div>
        {/* Clean Cinematic Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#F5F5F7] border border-black/[0.08] group-hover:border-[#0859D4]/40 transition-colors mb-3.5">
          <img
            src={imgSrc}
            alt={course?.title || 'Course thumbnail'}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (imgSrc !== FALLBACK_THUMB) setImgSrc(FALLBACK_THUMB);
              setImgLoaded(true);
            }}
            className={`w-full h-full object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-105 ${
              imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
          {/* Subtle light-mode depth rim for crisp pill separation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-transparent pointer-events-none" />

          {/* Top Controls: Clean Category Pill + Heart */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {category && (
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/95 border border-black/10 text-[#1D1D1F] backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0859D4]" />
                {category?.name}
              </span>
            )}

            {/* Heart Save Button */}
            <motion.button
              type="button"
              onClick={handleHeartClick}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.85 }}
              aria-label={isSaved ? 'Remove from saved' : 'Save course'}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-sm text-[#6E6E73] hover:text-rose-500 transition-colors border border-black/10 cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#424242]'
                }`}
                strokeWidth={isSaved ? 0 : 2}
              />
            </motion.button>
          </div>
        </div>

        {/* Course Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-bold text-[15px] sm:text-base text-[#1D1D1F] line-clamp-2 group-hover:text-[#0859D4] transition-colors leading-snug">
              {course?.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0859D4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[transform,color] shrink-0 mt-0.5" />
          </div>

          <p className="text-[#6E6E73] text-xs line-clamp-2 leading-relaxed">
            {course?.shortDescription}
          </p>

          {/* Clean Meta Details */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#6E6E73] pt-1">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[#0859D4]" strokeWidth={2} />
              {course?.durationHours}h
            </span>
            <span className="text-black/25">•</span>
            <span className="flex items-center gap-1 font-medium">
              <BookOpen className="w-3 h-3 text-[#0859D4]" strokeWidth={2} />
              {course?.lessonsCount} lessons
            </span>
            <span className="text-black/25">•</span>
            <span className="text-[#1D1D1F] font-semibold">
              {course?.level}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Mentor & Clean Rating */}
      <div className="pt-3 mt-4 border-t border-black/[0.08] flex items-center justify-between gap-2">
        {mentor && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full p-[1px] bg-gradient-to-tr from-[#0859D4]/70 to-black/15 shrink-0">
              <img
                src={mentor?.avatar}
                alt={mentor?.name || 'Mentor'}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs font-heading font-medium text-[#424242] truncate group-hover:text-[#1D1D1F] transition-colors">
              {mentor?.name}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#1D1D1F] shrink-0">
          <Rating value={course?.rating ?? 5} size="sm" showValue={false} />
          <span className="text-[#1D1D1F]">{(course?.rating ?? 5).toFixed(1)}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CourseCard;
