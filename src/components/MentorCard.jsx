import React from 'react';
import { Star, Users, Check, Plus } from 'lucide-react';
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
          'radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(249,115,22,0.12), transparent 40%)',
      }}
    >
      <div>
        {/* Mentor Avatar & Details */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative">
            <img
              src={mentor?.avatar}
              alt={mentor?.name || 'Mentor'}
              className="w-14 h-14 rounded-full object-cover border-2 border-orange-500/40 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-heading font-bold text-base text-zinc-100 truncate group-hover:text-orange-400 transition-colors">
              {mentor?.name}
            </h4>
            <p className="text-xs font-medium text-orange-400 truncate">
              {mentor?.college}
            </p>
            <p className="text-xs text-zinc-400 truncate">
              {mentor?.branch} • {mentor?.year}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-[13px] text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {mentor?.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor?.skills?.slice(0, 3)?.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
          {(mentor?.skills?.length || 0) > 3 && (
            <span className="text-[11px] text-zinc-500 px-1 py-0.5">
              +{(mentor?.skills?.length || 0) - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Stats & Follow Button */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
            {((mentor?.followers || 0) + (isFollowed ? 1 : 0)).toLocaleString()}
          </span>
          <span className="flex items-center gap-1 font-semibold text-zinc-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.75} />
            {mentor?.rating}
          </span>
        </div>

        <button
          type="button"
          onClick={handleFollowToggle}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 ${
            isFollowed
              ? 'bg-zinc-800 text-zinc-300 border border-white/10'
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500 hover:text-white'
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
    </div>
  );
}
