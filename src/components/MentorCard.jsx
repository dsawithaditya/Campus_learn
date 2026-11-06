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
      className={`zephyr-card group relative p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 rounded-3xl ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,255,255,0.08), transparent 45%)',
      }}
    >
      <div>
        {/* Mentor Avatar & Details */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative shrink-0">
            {/* Ambient orange glow ring */}
            <div className="relative w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-tr from-[#FF6B00]/50 via-white/20 to-transparent group-hover:from-[#FF6B00] group-hover:via-amber-400 group-hover:to-[#FF6B00] transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0.18)] group-hover:shadow-[0_0_22px_rgba(255,107,0,0.4)]">
              <img
                src={mentor?.avatar}
                alt={mentor?.name || 'Mentor'}
                loading="lazy"
                decoding="async"
                className="w-full h-full rounded-[14px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full shadow-sm" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-heading font-bold text-base text-zinc-100 truncate group-hover:text-[#FF6B00] transition-colors">
              {mentor?.name}
            </h4>
            <p className="text-xs font-medium text-[#FF6B00] truncate flex items-center gap-1.5 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 shrink-0 text-[#FF6B00]" />
              <span className="truncate">{mentor?.college}</span>
            </p>
            <p className="text-[11px] text-zinc-400 truncate mt-0.5">
              {mentor?.branch} • {mentor?.year}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {mentor?.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor?.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium bg-zinc-900/90 text-zinc-300 px-2.5 py-0.5 rounded-full border border-white/10 group-hover:border-[#FF6B00]/30 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Follow Action */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1 font-semibold text-white">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {mentor?.rating}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-zinc-300">{(mentor?.followers + (isFollowed ? 1 : 0)).toLocaleString()}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleFollowToggle}
          className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1 cursor-pointer select-none active:scale-95 ${
            isFollowed
              ? 'bg-zinc-800/90 border border-white/20 text-zinc-200 hover:border-white/40'
              : 'bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white hover:from-[#ff7a1a] hover:to-[#ffa05c] shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_22px_rgba(255,107,0,0.5)]'
          }`}
        >
          {isFollowed ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
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
