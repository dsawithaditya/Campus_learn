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
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Top Ambient Glow matching Zephyr */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-white/[0.06] to-transparent blur-3xl pointer-events-none -z-10" />

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

            {/* Backed By Campus Network Footer */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-3">
                Backed by top campus clubs
              </span>
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">IIT Bombay</span>
                <span className="text-zinc-400 dark:text-zinc-700">•</span>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">BITS Pilani</span>
                <span className="text-zinc-400 dark:text-zinc-700">•</span>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">IIT Delhi</span>
                <span className="text-zinc-400 dark:text-zinc-700">•</span>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">NIT Trichy</span>
                <span className="text-zinc-400 dark:text-zinc-700">•</span>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">IIIT Hyderabad</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Glass Orb & Floating Feature Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Radial Backlight Glow behind Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-white/[0.07] via-zinc-400/[0.04] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Floating Card 1: Top-Left (Auto-deploy on build style) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
              }}
              className="absolute -top-4 -left-6 sm:top-2 sm:-left-8 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-3 hover:border-white/30 transition-all cursor-pointer"
              onClick={() => navigate('/explore?category=tech')}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Live Project Cohorts</div>
                <div className="text-[10px] text-zinc-400">Build real apps & fests</div>
              </div>
            </motion.div>

            {/* Floating Card 2: Mid-Left (Manage dependencies style) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.35 },
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 },
              }}
              className="absolute top-1/2 -left-8 sm:-left-12 -translate-y-1/2 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-3 hover:border-white/30 transition-all cursor-pointer"
              onClick={() => navigate('/teach')}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Senior Mentors</div>
                <div className="text-[10px] text-zinc-400">1-on-1 peer guidance</div>
              </div>
            </motion.div>

            {/* Floating Card 3: Bottom-Left (Generate live preview links style) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.5 },
                y: { repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 2 },
              }}
              className="absolute -bottom-6 left-0 sm:bottom-0 sm:-left-4 z-20 px-3.5 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-3 hover:border-white/30 transition-all cursor-pointer"
              onClick={() => navigate('/explore')}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Verified Credentials</div>
                <div className="text-[10px] text-zinc-400">Portfolio ready badges</div>
              </div>
            </motion.div>

            {/* 3D Interactive WebGL Orb */}
            <Zephyr3DOrb />
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
