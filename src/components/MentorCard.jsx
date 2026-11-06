import React from 'react';
import { Star, Users, Check, Plus, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export function MentorCard({ mentor, className = '' }) {
  const navigate = useNavigate();
  const followedMentorIds = useAppStore((state) => state.followedMentorIds) || [];
  const toggleFollowMentor = useAppStore((state) => state.toggleFollowMentor);

  if (!mentor) return null;

  const isFollowed = followedMentorIds?.includes(mentor.id);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleCardClick = () => {
    if (mentor?.id) {
      navigate(`/mentor/${mentor.id}`);
    }
  };

  const handleFollowToggle = (e) => {
    e.stopPropagation();
    if (mentor?.id) {
      toggleFollowMentor(mentor.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      className={`glass-card group relative p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(59,130,246,0.1), transparent 40%)',
      }}
    >
      <div>
        {/* Mentor Avatar & Details */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative">
            <img
              src={mentor?.avatar}
              alt={mentor?.name || 'Mentor'}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-heading font-bold text-base text-slate-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {mentor?.name}
            </h4>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{mentor?.college}</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">
              {mentor?.branch} • {mentor?.year}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {mentor?.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor?.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-semibold bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Follow Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-zinc-400">
          <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {mentor?.rating}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            {(mentor?.followers + (isFollowed ? 1 : 0)).toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={handleFollowToggle}
          className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1 cursor-pointer ${
            isFollowed
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
          }`}
        >
          {isFollowed ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span>Following</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" />
              <span>Follow</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
