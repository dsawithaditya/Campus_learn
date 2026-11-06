import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Code2, Users, Trophy, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Zephyr3DOrb } from '../components/Zephyr3DOrb';
import { Modal } from '../components/Modal';

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-36 sm:pt-40 pb-16 overflow-hidden">
      {/* Top Ambient Glow in Blaze Orange & Amber */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#FF6B00]/[0.12] via-[#F59E0B]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Main H1 Title matching Zephyr "The only sane way to do micro-frontends" */}
            <h1 className="font-heading font-bold text-4xl sm:text-6xl lg:text-[70px] text-white leading-[1.05] tracking-[-0.035em] mb-6">
              The only sane way to{' '}
              <span className="text-zinc-100 block sm:inline">
                learn from seniors
              </span>
            </h1>

            {/* Subtitle matching Zephyr aesthetic */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-9 leading-relaxed font-normal">
              Campus Learn is a peer-to-peer student platform for hands-on bootcamps in tech, music, sports, and arts—taught directly by senior students from top colleges.
            </p>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-14">
              <button
                onClick={() => navigate('/signup')}
                className="btn-zephyr-primary text-sm font-semibold px-7 py-3"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="w-4 h-4 ml-2 inline-block" />
              </button>

              <button
                onClick={() => navigate('/explore')}
                className="btn-zephyr-secondary text-sm font-medium px-6 py-3"
              >
                Explore Courses
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Glass Orb & Floating Feature Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 sm:pt-8">
            {/* Ambient Radial Blaze Orange Backlight Glow & Warm Shadow Aura behind Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-[#FF6B00]/22 via-[#F59E0B]/12 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#FF6B00]/15 rounded-full blur-2xl pointer-events-none -z-10" />

            {/* Moveable Floating Card 1: Top-Left (Live Project Cohorts) - Constrained strictly below top bar */}
            <motion.div
              drag
              dragConstraints={{ left: -50, right: 80, top: 0, bottom: 90 }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
              whileHover={{ scale: 1.06 }}
              animate={{
                y: [-5, 5, -5],
                x: [-3, 3, -3],
                rotate: [-1, 1, -1],
              }}
              transition={{
                y: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
                x: { repeat: Infinity, duration: 5.4, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: 6.2, ease: 'easeInOut' },
              }}
              className="absolute top-12 left-0 sm:top-14 sm:-left-6 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/15 hover:border-[#FF6B00]/50 backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-colors cursor-grab active:cursor-grabbing select-none hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
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
              drag
              dragConstraints={{ left: -50, right: 80, top: -40, bottom: 80 }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
              whileHover={{ scale: 1.06 }}
              animate={{
                y: [5, -5, 5],
                x: [3, -3, 3],
                rotate: [1, -1, 1],
              }}
              transition={{
                y: { repeat: Infinity, duration: 5.6, ease: 'easeInOut', delay: 0.5 },
                x: { repeat: Infinity, duration: 6.0, ease: 'easeInOut', delay: 0.5 },
                rotate: { repeat: Infinity, duration: 5.8, ease: 'easeInOut' },
              }}
              className="absolute top-[52%] -left-6 sm:-left-12 -translate-y-1/2 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/15 hover:border-[#FF6B00]/50 backdrop-blur-xl shadow-2xl flex items-center gap-3 transition-colors cursor-grab active:cursor-grabbing select-none hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
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
              drag
              dragConstraints={{ left: -50, right: 80, top: -60, bottom: 40 }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
              whileHover={{ scale: 1.06 }}
              animate={{
                y: [-5, 5, -5],
                x: [2, -2, 2],
                rotate: [-1, 1, -1],
              }}
              transition={{
                y: { repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 1.2 },
                x: { repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 0.8 },
                rotate: { repeat: Infinity, duration: 6.5, ease: 'easeInOut' },
              }}
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

            {/* Moveable Floating Card 4: Top-Right (Active Campus Network) - Constrained strictly below top bar */}
            <motion.div
              drag
              dragConstraints={{ left: -80, right: 50, top: 0, bottom: 90 }}
              dragElastic={0.06}
              whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.2)' }}
              whileHover={{ scale: 1.06 }}
              animate={{
                y: [5, -5, 5],
                x: [-2, 2, -2],
                rotate: [0.8, -0.8, 0.8],
              }}
              transition={{
                y: { repeat: Infinity, duration: 6.0, ease: 'easeInOut', delay: 0.8 },
                x: { repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 1.4 },
                rotate: { repeat: Infinity, duration: 6.8, ease: 'easeInOut' },
              }}
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

            {/* 3D Floating WebGL Orb with continuous levitation */}
            <motion.div
              animate={{
                y: [-9, 9, -9],
                rotate: [-0.6, 0.6, -0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 6.5,
                ease: 'easeInOut',
              }}
              className="w-full flex items-center justify-center"
            >
              <Zephyr3DOrb />
            </motion.div>
          </div>
        </div>
      </div>

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
    </section>
  );
}

export default Hero;
