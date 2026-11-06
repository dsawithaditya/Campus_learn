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
      className={`group relative p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950/80 to-zinc-950/95 backdrop-blur-xl border border-white/[0.09] hover:border-[#FF6B00]/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_rgba(255,107,0,0.14)] hover:-translate-y-1.5 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(320px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,107,0,0.08), transparent 50%)',
      }}
    >
      <div>
        {/* Mentor Header: Avatar + Full Name + Year */}
        <div className="flex items-center gap-3.5 mb-3.5">
          <div className="relative w-14 h-14 shrink-0">
            <div className="w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-tr from-[#FF6B00]/70 via-white/20 to-transparent group-hover:from-[#FF6B00] group-hover:via-amber-400 group-hover:to-[#FF6B00] transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
              <img
                src={mentor?.avatar}
                alt={mentor?.name || 'Mentor'}
                loading="lazy"
                decoding="async"
                className="w-full h-full rounded-[14px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-bold text-base text-white group-hover:text-[#FF6B00] transition-colors leading-tight">
              {mentor?.name}
            </h4>
            <p className="text-[11px] text-zinc-400 font-medium mt-1">
              {mentor?.year || 'Senior Mentor'}
            </p>
          </div>
        </div>

        {/* College & Department - full card width so it never truncates awkwardly */}
        <div className="mb-3.5 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/25 text-[#FF6B00] font-semibold">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>{mentor?.college}</span>
          </span>
          <span className="text-zinc-400 font-medium text-[11px]">
            {mentor?.branch}
          </span>
        </div>

        {/* Bio */}
        <p className="text-xs text-zinc-400 leading-relaxed mb-4 min-h-[34px] line-clamp-2">
          {mentor?.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {mentor?.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded-lg border border-white/10 group-hover:border-[#FF6B00]/30 group-hover:bg-[#FF6B00]/5 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Follow Action */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs text-zinc-400">
          <span className="flex items-center gap-1 font-semibold text-white">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{mentor?.rating}</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span className="font-mono text-zinc-300 font-medium">
              {(mentor?.followers + (isFollowed ? 1 : 0)).toLocaleString()}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleFollowToggle}
          className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 cursor-pointer select-none active:scale-95 ${
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

export default MentorCard;
