import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export function MentorCard({ mentor, className = '' }) {
  const navigate = useNavigate();
  const followedMentorIds = useAppStore((state) => state.followedMentorIds);
  const toggleFollowMentor = useAppStore((state) => state.toggleFollowMentor);

  const isFollowed = followedMentorIds.includes(mentor.id);

  const handleCardClick = () => {
    navigate(`/mentor/${mentor.id}`);
  };

  const handleFollowToggle = (e) => {
    e.stopPropagation();
    toggleFollowMentor(mentor.id);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-5 shadow-soft hover:shadow-lift cursor-pointer flex flex-col justify-between transition-shadow duration-base ${className}`}
    >
      <div>
        {/* Mentor Avatar & Details */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-soft dark:border-slate-700"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface dark:border-surface-dark rounded-full" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-heading font-semibold text-base text-text dark:text-text-dark truncate group-hover:text-primary dark:group-hover:text-primary-contrast transition-colors">
              {mentor.name}
            </h4>
            <p className="text-xs font-medium text-primary dark:text-primary-contrast truncate">
              {mentor.college}
            </p>
            <p className="text-xs text-muted dark:text-muted-dark truncate">
              {mentor.branch} • {mentor.year}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-[13px] text-muted dark:text-muted-dark line-clamp-2 mb-4 leading-relaxed">
          {mentor.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium bg-primary-soft dark:bg-slate-800 text-primary dark:text-primary-contrast px-2 py-0.5 rounded-pill"
            >
              {skill}
            </span>
          ))}
          {mentor.skills?.length > 3 && (
            <span className="text-[11px] text-muted dark:text-muted-dark px-1">
              +{mentor.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Stats & Follow Button */}
      <div className="pt-3 border-t border-border/60 dark:border-border-dark/60 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted dark:text-muted-dark">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
            {mentor.followers + (isFollowed ? 1 : 0)}
          </span>
          <span className="flex items-center gap-1 font-semibold text-text dark:text-text-dark">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.75} />
            {mentor.rating}
          </span>
        </div>

        <button
          type="button"
          onClick={handleFollowToggle}
          className={`px-3 py-1.5 rounded-pill text-xs font-semibold flex items-center gap-1 transition-all ${
            isFollowed
              ? 'bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted-dark hover:bg-slate-200'
              : 'bg-primary-soft text-primary dark:bg-primary-soft/15 dark:text-primary-contrast hover:bg-primary hover:text-white dark:hover:bg-primary'
          }`}
        >
          {isFollowed ? (
            <>
              <Check className="w-3 h-3" strokeWidth={2.5} />
              <span>Following</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" strokeWidth={2.5} />
              <span>Follow</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

