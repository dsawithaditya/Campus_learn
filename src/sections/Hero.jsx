import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
import { Zephyr3DOrb } from '../components/Zephyr3DOrb';
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
  const trackRef = useRef(null);

  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  // Track scroll progress across the two-stage Hero -> Campus Domains wrapper
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Liquid-smooth spring physics so wheel & trackpad scrolling feel weightless
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.55,
  });

  // 3D Orb choreographed S-curve descent & breathing scale (Hero -> Campus Domains)
  const orbY = useTransform(smoothProgress, [0, 0.45, 1], [-10, 28, 12]);
  const orbX = useTransform(smoothProgress, [0, 0.5, 1], [0, -18, -6]);
  const orbScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.07, 1.02]);

  // Dynamic ambient backlight glow intensifies as the 3D Orb descends
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.22, 1.1]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.75, 1, 0.9]);

  // Hero Floating Cards: orbit outward slightly then fold in smoothly as we descend to Campus Domains
  const heroCardsOpacity = useTransform(smoothProgress, [0, 0.35, 0.52], [1, 0.85, 0]);
  const heroCardsScale = useTransform(smoothProgress, [0, 0.35, 0.52], [1, 0.96, 0.82]);
  const heroCardsPointerEvents = useTransform(smoothProgress, (v) => (v < 0.45 ? 'auto' : 'none'));

  const card1X = useTransform(smoothProgress, [0, 0.5], [0, -28]);
  const card1Y = useTransform(smoothProgress, [0, 0.5], [0, -18]);

  const card2X = useTransform(smoothProgress, [0, 0.5], [0, -36]);
  const card2Y = useTransform(smoothProgress, [0, 0.5], [0, 12]);

  const card3X = useTransform(smoothProgress, [0, 0.5], [0, -22]);
  const card3Y = useTransform(smoothProgress, [0, 0.5], [0, 28]);

  const card4X = useTransform(smoothProgress, [0, 0.5], [0, 26]);
  const card4Y = useTransform(smoothProgress, [0, 0.5], [0, -22]);

  // Stage 2 Floating Domain Badges around the 3D Orb when positioned beside Campus Domains
  const stage2BadgeOpacity = useTransform(smoothProgress, [0.42, 0.62, 1], [0, 1, 1]);
  const stage2BadgeY = useTransform(smoothProgress, [0.42, 0.65], [24, 0]);
  const stage2BadgeScale = useTransform(smoothProgress, [0.42, 0.65], [0.88, 1]);

  return (
    <div ref={trackRef} className="relative pt-20 sm:pt-24 pb-12 overflow-x-clip">
      {/* Top Ambient Glow in Blaze Orange & Amber */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-[#FF6B00]/[0.14] via-[#F59E0B]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start w-full">
          
          {/* Left Column: Natural Vertical Scroll Flow from Hero -> Explore Peer-Led Disciplines */}
          <div className="lg:col-span-7 flex flex-col z-10">
            
            {/* SECTION 1: Main Hero Intro */}
            <div className="min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-center items-start w-full py-8">
              {/* Main H1 Title matching Zephyr "The only sane way to do micro-frontends" */}
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[68px] text-white leading-[1.05] tracking-[-0.035em] mb-5">
                The only sane way to{' '}
                <span className="text-zinc-100 block sm:inline">
                  learn from seniors
                </span>
              </h1>

              {/* Subtitle matching Zephyr aesthetic */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-8 leading-relaxed font-normal">
                Campus Learn is a peer-to-peer student platform for hands-on bootcamps in tech, music, sports, and arts—taught directly by senior students from top colleges.
              </p>

              {/* Interactive CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-zephyr-primary text-sm font-semibold px-7 py-3 cursor-pointer"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                </button>

                <button
                  onClick={() => navigate('/explore')}
                  className="btn-zephyr-secondary text-sm font-medium px-6 py-3 cursor-pointer"
                >
                  Explore Courses
                </button>
              </div>

              {/* Campus Network Strip matching Zephyr "Backed by" */}
              <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span className="uppercase tracking-wider text-[10px] font-semibold text-zinc-500">
                  Mentors from
                </span>
                <div className="flex flex-wrap items-center gap-3.5 text-zinc-300 font-medium">
                  <span className="hover:text-white transition-colors">IIT Bombay</span>
                  <span className="text-zinc-700">•</span>
                  <span className="hover:text-white transition-colors">BITS Pilani</span>
                  <span className="text-zinc-700">•</span>
                  <span className="hover:text-white transition-colors">IISc</span>
                  <span className="text-zinc-700">•</span>
                  <span className="hover:text-white transition-colors">NIT Surathkal</span>
                  <span className="text-zinc-700">•</span>
                  <span className="hover:text-white transition-colors">Jain Univ</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: CAMPUS DOMAINS - Explore Peer-Led Disciplines (3D Orb travels down right beside this) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[70vh] lg:min-h-[82vh] flex flex-col justify-center py-12 border-t border-white/[0.06]"
            >
              {/* Header matching user image */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#FF6B00] font-semibold block mb-1.5">
                    Campus Domains
                  </span>
                  <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                    Explore Peer-Led Disciplines
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-1 group self-start sm:self-auto transition-colors cursor-pointer"
                >
                  <span>View all courses</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* 8 Categories Grid in 2 Columns of 4, positioned right beside the descending 3D Orb */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {safeCategories.map((cat, index) => {
                  const IconComponent = iconMap[cat?.id] || Code2;
                  const accentColor = cat?.color || '#3b82f6';
                  return (
                    <motion.button
                      key={cat?.id || index}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.4, delay: index * 0.045, ease: 'easeOut' }}
                      onClick={() => navigate(`/explore?category=${cat?.id}`)}
                      whileHover={{ y: -3, scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative p-3.5 rounded-2xl flex items-center justify-between text-left group cursor-pointer bg-zinc-950/75 backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden"
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
            </motion.div>

          </div>

          {/* Right Column: Sticky 3D Glass Orb that Travels Down From Hero to Campus Domains */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] relative flex items-center justify-center py-6 lg:py-0">
            {/* Dynamic Ambient Radial Blaze Orange Backlight Glow behind Orb */}
            <motion.div
              style={{ scale: glowScale, opacity: glowOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-[#FF6B00]/24 via-[#F59E0B]/14 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#FF6B00]/16 rounded-full blur-2xl pointer-events-none -z-10" />

            {/* 3D Floating WebGL Orb with Spring-Damped Flight Path */}
            <motion.div
              style={{
                x: orbX,
                y: orbY,
                scale: orbScale,
              }}
              className="w-full flex items-center justify-center relative"
            >
              <Zephyr3DOrb />

              {/* Hero Stage Floating Cards with Continuous Zero-Gravity Bobbing */}
              <motion.div
                style={{
                  opacity: heroCardsOpacity,
                  scale: heroCardsScale,
                  pointerEvents: heroCardsPointerEvents,
                }}
                className="contents"
              >
                {/* Moveable Floating Card 1: Top-Left (Live Project Cohorts) */}
                <motion.div
                  style={{ x: card1X, y: card1Y }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  drag
                  dragConstraints={{ left: -50, right: 80, top: 0, bottom: 90 }}
                  dragElastic={0.06}
                  whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
                  whileHover={{ scale: 1.06 }}
                  className="absolute top-10 left-0 sm:top-12 sm:-left-6 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/15 hover:border-[#FF6B00]/50 backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-colors cursor-grab active:cursor-grabbing select-none hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
                  title="Click & drag me anywhere!"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Live Project Cohorts</div>
                    <div className="text-[10px] text-zinc-400">Build real apps & fests</div>
                  </div>
                </motion.div>

                {/* Moveable Floating Card 2: Mid-Left (Senior Mentors) */}
                <motion.div
                  style={{ x: card2X, y: card2Y }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  drag
                  dragConstraints={{ left: -50, right: 80, top: -40, bottom: 80 }}
                  dragElastic={0.06}
                  whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
                  whileHover={{ scale: 1.06 }}
                  className="absolute top-[48%] -left-6 sm:-left-12 -translate-y-1/2 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/15 hover:border-[#FF6B00]/50 backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-colors cursor-grab active:cursor-grabbing select-none hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
                  title="Click & drag me anywhere!"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Senior Mentors</div>
                    <div className="text-[10px] text-zinc-400">1-on-1 peer guidance</div>
                  </div>
                </motion.div>

                {/* Moveable Floating Card 3: Bottom-Left (Verified Credentials) */}
                <motion.div
                  style={{ x: card3X, y: card3Y }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                  drag
                  dragConstraints={{ left: -50, right: 80, top: -60, bottom: 40 }}
                  dragElastic={0.06}
                  whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
                  whileHover={{ scale: 1.06 }}
                  className="absolute -bottom-2 left-0 sm:bottom-4 sm:-left-4 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/15 hover:border-[#FF6B00]/50 backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-colors cursor-grab active:cursor-grabbing select-none hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
                  title="Click & drag me anywhere!"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Verified Credentials</div>
                    <div className="text-[10px] text-zinc-400">Portfolio ready badges</div>
                  </div>
                </motion.div>

                {/* Moveable Floating Card 4: Top-Right (Active Campus Network) */}
                <motion.div
                  style={{ x: card4X, y: card4Y }}
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  drag
                  dragConstraints={{ left: -80, right: 50, top: 0, bottom: 90 }}
                  dragElastic={0.06}
                  whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
                  whileHover={{ scale: 1.06 }}
                  className="hidden sm:flex absolute top-12 right-0 sm:top-14 sm:-right-4 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl shadow-2xl items-center gap-3 hover:border-white/35 transition-colors cursor-grab active:cursor-grabbing select-none"
                  title="Click & drag me anywhere!"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">10,000+ Students</div>
                    <div className="text-[10px] text-zinc-400">Across 50+ college hubs</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Stage 2 Floating Status Badges: Appear around the 3D Orb when it arrives beside Explore Peer-Led Disciplines */}
              <motion.div
                style={{
                  opacity: stage2BadgeOpacity,
                  y: stage2BadgeY,
                  scale: stage2BadgeScale,
                }}
                className="absolute -bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-zinc-950/90 border border-[#FF6B00]/35 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,107,0,0.18)] flex items-center gap-2.5 pointer-events-none whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="text-xs font-semibold text-white">94+ Live Campus Cohorts</span>
                <span className="text-[11px] text-zinc-400">• 8 Disciplines</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Radiant Orange Horizon Light Beam at Hero transition */}
      <OrangeHorizonLight
        className="bottom-0"
        intensity="medium"
        height="h-[180px]"
        lineOpacity="opacity-80"
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
