import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Check, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';

export function MentorCard({ mentor, className = '' }) {
  const navigate = useNavigate();
  const followedMentorIds = useAppStore((state) => state.followedMentorIds) || [];
  const toggleFollowMentor = useAppStore((state) => state.toggleFollowMentor);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(mentor?.avatar || FALLBACK_AVATAR);

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

  const handleCardKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <motion.div
      role="link"
      tabIndex={0}
      aria-label={`View profile of ${mentor?.name || 'Mentor'}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-5 cursor-pointer flex flex-col justify-between rounded-2xl bg-white border border-black/[0.08] hover:border-[#0859D4]/45 shadow-[0_8px_24px_rgba(29,29,31,0.05)] hover:shadow-[0_14px_34px_rgba(8,89,212,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0859D4] transition-all h-full select-none ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(320px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(8,89,212,0.06), transparent 50%)',
      }}
    >
      <div>
        {/* Mentor Header: Avatar + Full Name + Expertise Tag */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative w-12 h-12 shrink-0">
            <div className="w-12 h-12 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#0859D4] via-[#1A59F9] to-black/10 shadow-[0_4px_12px_rgba(8,89,212,0.18)] overflow-hidden">
              <img
                src={avatarSrc}
                alt={mentor?.name || 'Mentor'}
                loading="lazy"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                onError={() => {
                  if (avatarSrc !== FALLBACK_AVATAR) setAvatarSrc(FALLBACK_AVATAR);
                  setImgLoaded(true);
                }}
                className={`w-full h-full rounded-[10px] object-cover transition-transform duration-500 group-hover:scale-108 ${
                  imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-bold text-base text-[#1D1D1F] group-hover:text-[#0859D4] transition-colors leading-tight truncate">
              {mentor?.name}
            </h4>
            {mentor?.college && (
              <p className="text-[11px] font-mono text-[#6E6E73] truncate mt-0.5">
                {mentor.college}
              </p>
            )}
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-semibold text-[#0859D4] bg-[#0859D4]/10 border border-[#0859D4]/20 px-2 py-0.5 rounded-md truncate max-w-full inline-block">
                {mentor?.expertise || 'Domain Lead'}
              </span>
            </div>
          </div>
        </div>

        {/* Clean concise bio */}
        <p className="text-xs text-[#6E6E73] leading-relaxed mb-4 line-clamp-2">
          {mentor?.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor?.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="font-mono text-[10px] font-medium bg-[#F5F5F7] text-[#424242] px-2 py-0.5 rounded-md border border-black/[0.06] group-hover:border-[#0859D4]/25 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Follow Action */}
      <div className="pt-3 border-t border-black/[0.08] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6E6E73] min-w-0">
          <span className="flex items-center gap-1 font-bold text-[#1D1D1F]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{mentor?.rating}</span>
          </span>
          <span className="text-black/25">•</span>
          <span className="text-[#6E6E73] text-[11px] truncate">
            {(mentor?.followers + (isFollowed ? 1 : 0)).toLocaleString()} learners
          </span>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleFollowToggle}
          className={`min-h-[38px] text-xs px-3.5 py-1.5 rounded-full font-heading font-semibold transition-all flex items-center gap-1 cursor-pointer select-none shrink-0 ${
            isFollowed
              ? 'bg-[#F5F5F7] border border-black/15 text-[#1D1D1F] hover:border-black/30'
              : 'bg-gradient-to-r from-[#0859D4] to-[#1A59F9] text-white shadow-[0_4px_12px_rgba(8,89,212,0.25)]'
          }`}
        >
          {isFollowed ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Following</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" />
              <span>Follow</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MentorCard;
