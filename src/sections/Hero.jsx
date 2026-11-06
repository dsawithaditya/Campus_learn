import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] hero-glow rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start animate-fade-up"
          >
            {/* Students Only Badge with Pulsing Ember Dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs font-semibold text-orange-400 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span>Students Only • Verified Campus Network</span>
            </div>

            {/* H1 Heading with gradient text */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[64px] text-zinc-100 leading-[1.05] tracking-[-0.02em] mb-5">
              Where college students{' '}
              <span className="hero-text-gradient">teach each other.</span>
            </h1>

            {/* One-line subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-8 leading-relaxed">
              Explore peer-led bootcamps in tech, music, sports and arts created by passionate seniors across top Indian colleges.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-xl mb-6">
              <SearchBar placeholder="Search by skill, campus, or course..." />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/explore')}
              >
                Start Learning
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={Play}
                iconPosition="left"
                onClick={() => setIsVideoModalOpen(true)}
              >
                Watch how it works
              </Button>
            </div>

            {/* Social Proof: 10,000+ students */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
              </div>
              <div className="text-xs text-zinc-400">
                <span className="font-bold text-zinc-200">Joined by 10,000+</span>{' '}
                students across IITs, BITS, and DU
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Floating 2D Course Snippets */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[380px] sm:min-h-[440px]">
            {/* Background soft glow circle - pointer-events-none */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Card 1: Tech */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 left-2 sm:left-4 z-20 w-64 p-3.5 glass-card flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/course/full-stack-web-dev-react-supabase')}
            >
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&auto=format&fit=crop&q=80"
                alt="Web Dev"
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wide">
                  Tech & Coding
                </span>
                <p className="text-xs font-bold text-zinc-100 truncate">
                  Full-Stack React & Supabase
                </p>
                <div className="flex items-center gap-1 text-[11px] text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="font-bold">4.9</span>
                  <span className="text-zinc-500">(2.4k learners)</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Music Production */}
            <motion.div
              animate={{ y: [8, -12, 8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-72 sm:w-80 p-4 glass-card flex items-center gap-3.5 my-8 cursor-pointer"
              onClick={() => navigate('/course/fl-studio-lofi-beats')}
            >
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=120&auto=format&fit=crop&q=80"
                alt="Music Production"
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">
                  Music Production
                </span>
                <p className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                  FL Studio: Lo-Fi Beats
                </p>
                <p className="text-[11px] text-zinc-400 truncate">
                  By Kabir Sen • SRCC Delhi
                </p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-md">
                Free
              </span>
            </motion.div>

            {/* Floating Card 3: Design / Art */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 right-2 sm:right-4 z-20 w-64 p-3.5 glass-card flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/course/figma-campus-startups-portfolio')}
            >
              <img
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=120&auto=format&fit=crop&q=80"
                alt="Design"
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wide">
                  Art & Design
                </span>
                <p className="text-xs font-bold text-zinc-100 truncate">
                  Figma for Campus Startups
                </p>
                <p className="text-[11px] text-zinc-400">
                  Auto-layout & Prototypes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="How Campus Learn Works"
      >
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 flex flex-col items-center justify-center text-white relative border border-white/10">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-cta cursor-pointer hover:scale-105 active:scale-95 transition-transform">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
            <p className="mt-4 text-sm font-medium text-zinc-300">
              Interactive 2-Minute Campus Walkthrough
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-400">
            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="font-bold text-zinc-200 block mb-1">1. College Email</span>
              Instant verification with your college domain.
            </div>
            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="font-bold text-zinc-200 block mb-1">2. Learn Any Skill</span>
              Zero paywalls, free peer-curated syllabi.
            </div>
            <div className="p-3 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="font-bold text-zinc-200 block mb-1">3. Become a Mentor</span>
              Teach juniors and build your leadership profile.
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
