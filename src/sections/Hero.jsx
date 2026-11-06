import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Sparkles,
  Code2,
  Users,
  Trophy,
  Mic2,
  Music,
  Flame,
  Palette,
  Camera,
  Gamepad2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ShapeGrid from '../components/ShapeGrid';
import { Modal } from '../components/Modal';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';
import categoriesData from '../data/categories.json';

const iconMap = {
  tech: Code2,
  singing: Mic2,
  music: Music,
  dance: Flame,
  sports: Trophy,
  art: Palette,
  photography: Camera,
  gaming: Gamepad2,
};

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <div className="relative pt-24 sm:pt-32 pb-16 overflow-hidden min-h-[90vh]">
      {/* Interactive ShapeGrid Canvas from React Bits */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="rgba(255, 255, 255, 0.06)"
          hoverColor="#FF6B00"
          hoverFillColor="#FF6B00"
          fillOpacity={0.14}
          cellSize={42}
          speed={0.35}
          glow={0.35}
          clickCascade={true}
          fade={0.88}
          className="w-full h-full"
        />
      </div>

      {/* Ambient Radial Vignette & Blaze Orange Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#FF6B00]/[0.16] via-[#F59E0B]/[0.06] to-transparent blur-3xl pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,#0A0A0A_85%] pointer-events-none z-[1]" />

      <div className="container-custom relative z-10">
        {/* Main Hero Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 hover:border-[#FF6B00]/50 backdrop-blur-xl text-xs font-semibold text-zinc-300 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span>Over 10,000+ Students Learning Directly From Seniors</span>
            <span className="text-zinc-600">•</span>
            <span className="text-[#FF6B00]">50+ Top Campuses</span>
          </motion.div>

          {/* Main H1 Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[72px] text-white leading-[1.06] tracking-[-0.035em] mb-6 max-w-3xl"
          >
            The only sane way to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#FF6B00]">
              learn from seniors
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mb-9 leading-relaxed font-normal"
          >
            Campus Learn is a peer-to-peer student platform for hands-on bootcamps in tech, music, sports, and arts—taught directly by senior students from top colleges.
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
          >
            <InteractiveHoverButton
              text="Start Learning Free"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-56 h-12 text-sm border-white/20 hover:border-[#FF6B00]/70 shadow-lg shadow-[#FF6B00]/25"
            />

            <button
              type="button"
              onClick={() => navigate('/explore')}
              className="btn-zephyr-secondary text-sm font-medium px-7 py-3 cursor-pointer w-full sm:w-auto"
            >
              Explore Courses
            </button>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-2 px-4 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>How it works</span>
            </button>
          </motion.div>

          {/* Value Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-4xl mb-12"
          >
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#FF6B00]/40 backdrop-blur-xl shadow-lg transition-all duration-300 text-left group">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-2.5 transition-transform group-hover:scale-110">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-sm font-semibold text-white">Live Cohorts</div>
              <div className="text-xs text-zinc-400 mt-0.5">Build real apps & fests</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#FF6B00]/40 backdrop-blur-xl shadow-lg transition-all duration-300 text-left group">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-2.5 transition-transform group-hover:scale-110">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-sm font-semibold text-white">Senior Mentors</div>
              <div className="text-xs text-zinc-400 mt-0.5">1-on-1 peer guidance</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#FF6B00]/40 backdrop-blur-xl shadow-lg transition-all duration-300 text-left group">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-2.5 transition-transform group-hover:scale-110">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-sm font-semibold text-white">Verified Badges</div>
              <div className="text-xs text-zinc-400 mt-0.5">Portfolio ready proof</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#FF6B00]/40 backdrop-blur-xl shadow-lg transition-all duration-300 text-left group">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white mb-2.5 transition-transform group-hover:scale-110">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-sm font-semibold text-white">10,000+ Students</div>
              <div className="text-xs text-zinc-400 mt-0.5">Across 50+ campus hubs</div>
            </div>
          </motion.div>

          {/* Campus Network Strip matching Zephyr "Backed by" */}
          <div className="pt-6 border-t border-white/[0.08] w-full flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-zinc-500">
              Mentors from top colleges
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3.5 text-zinc-300 font-medium">
              <span className="hover:text-white transition-colors">IIT Bombay</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">BITS Pilani</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">IISc Bangalore</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">NIT Surathkal</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">SRCC Delhi</span>
              <span className="text-zinc-700">•</span>
              <span className="hover:text-white transition-colors">Jain University</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: CAMPUS DOMAINS - Explore Peer-Led Disciplines */}
        <div className="relative z-10 pt-16 pb-8 border-t border-white/[0.06] mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#FF6B00] font-semibold block mb-2">
                Campus Domains
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                Explore Peer-Led Disciplines
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg">
                Hands-on live learning across engineering, design, arts, audio, and athletic mastery.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/explore')}
              className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 group self-start sm:self-auto transition-colors cursor-pointer"
            >
              <span>View all courses</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 8 Categories Grid in 4 Columns of 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {safeCategories.map((cat, index) => {
              const IconComponent = iconMap[cat?.id] || Code2;
              const accentColor = cat?.color || '#3b82f6';
              return (
                <motion.button
                  key={cat?.id || index}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                  onClick={() => navigate(`/explore?category=${cat?.id}`)}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative p-4 rounded-2xl flex items-center justify-between text-left group cursor-pointer bg-zinc-950/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#FF6B00]/40 hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}35`,
                        color: accentColor,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white tracking-tight group-hover:text-white transition-colors truncate">
                        {cat?.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {cat?.courseCount || 12}+ live cohorts
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Radiant Orange Horizon Light Beam at Hero bottom transition */}
      <OrangeHorizonLight
        className="bottom-0"
        intensity="medium"
        height="h-[160px]"
        lineOpacity="opacity-70"
      />

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Experience Campus Learn"
      >
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Campus Learn Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </div>
  );
}

export default Hero;
