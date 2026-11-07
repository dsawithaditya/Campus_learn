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

  return (
    <motion.div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-5 cursor-pointer flex flex-col justify-between rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#FF6B00]/45 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_36px_rgba(255,107,0,0.12)] transition-colors h-full select-none ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(320px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,107,0,0.08), transparent 50%)',
      }}
    >
      <div>
        {/* Mentor Header: Avatar + Full Name + Expertise Tag */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative w-12 h-12 shrink-0">
            <div className="w-12 h-12 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#FF6B00] via-amber-400 to-white/10 shadow-[0_0_12px_rgba(255,107,0,0.25)] overflow-hidden">
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
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-bold text-base text-zinc-100 group-hover:text-[#FF6B00] transition-colors leading-tight truncate">
              {mentor?.name}
            </h4>
            {/* Expertise tag replacing college name */}
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-semibold text-[#FFA057] bg-[#FF6B00]/10 border border-[#FF6B00]/25 px-2 py-0.5 rounded-md truncate max-w-full inline-block">
                {mentor?.expertise || 'Domain Lead'}
              </span>
            </div>
          </div>
        </div>

        {/* Clean concise bio */}
        <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
          {mentor?.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor?.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="font-mono text-[10px] font-medium bg-white/[0.04] text-zinc-300 px-2 py-0.5 rounded-md border border-white/10 group-hover:border-[#FF6B00]/25 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Follow Action */}
      <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="flex items-center gap-1 font-bold text-zinc-100">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{mentor?.rating}</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 text-[11px]">
            {(mentor?.followers + (isFollowed ? 1 : 0)).toLocaleString()} learners
          </span>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleFollowToggle}
          className={`text-xs px-3 py-1 rounded-full font-heading font-semibold transition-all flex items-center gap-1 cursor-pointer select-none ${
            isFollowed
              ? 'bg-zinc-800/90 border border-white/20 text-zinc-200 hover:border-white/40'
              : 'bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white hover:from-[#ff7a1a] hover:to-[#ffa05c] shadow-[0_0_14px_rgba(255,107,0,0.3)]'
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
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MentorCard;
