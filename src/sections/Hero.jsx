import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] hero-glow rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Students Only Badge with Pulsing Dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-primary-soft dark:bg-primary-soft/15 border border-primary/20 text-xs font-semibold text-primary dark:text-primary-contrast mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>Students Only • Verified Campus Network</span>
            </div>

            {/* H1 Heading with gradient text */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[64px] text-text dark:text-text-dark leading-[1.05] tracking-[-0.02em] mb-5">
              Where college students{' '}
              <span className="hero-text-gradient">teach each other.</span>
            </h1>

            {/* One-line subtitle */}
            <p className="text-base sm:text-lg text-muted dark:text-muted-dark max-w-xl mb-8 leading-relaxed">
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
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface dark:ring-surface-dark object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface dark:ring-surface-dark object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface dark:ring-surface-dark object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface dark:ring-surface-dark object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Student avatar"
                />
              </div>
              <div className="text-xs text-muted dark:text-muted-dark">
                <span className="font-bold text-text dark:text-text-dark">Joined by 10,000+</span>{' '}
                students across IITs, BITS, and DU
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Floating 2D Course Snippets */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[380px] sm:min-h-[440px]">
            {/* Background soft glow circle */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-primary/10 rounded-full blur-2xl" />

            {/* Floating Card 1: Tech */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 left-2 sm:left-4 z-20 w-64 p-3.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md shadow-lift flex items-center gap-3"
            >
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&auto=format&fit=crop&q=80"
                alt="Web Dev"
                className="w-12 h-12 rounded-sm object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold text-sky-500 uppercase tracking-wide">
                  Tech & Coding
                </span>
                <p className="text-xs font-semibold text-text dark:text-text-dark truncate">
                  Full-Stack React & Supabase
                </p>
                <div className="flex items-center gap-1 text-[11px] text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="font-bold">4.9</span>
                  <span className="text-muted dark:text-muted-dark">(2.4k learners)</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Music Production */}
            <motion.div
              animate={{ y: [8, -12, 8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-72 sm:w-80 p-4 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md shadow-soft flex items-center gap-3.5 my-8"
            >
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=120&auto=format&fit=crop&q=80"
                alt="Music Production"
                className="w-14 h-14 rounded-sm object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold text-purple-500 uppercase tracking-wide">
                  Music Production
                </span>
                <p className="text-xs sm:text-sm font-semibold text-text dark:text-text-dark truncate">
                  FL Studio: Lo-Fi Beats
                </p>
                <p className="text-[11px] text-muted dark:text-muted-dark truncate">
                  By Kabir Sen • SRCC Delhi
                </p>
              </div>
              <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-sm">
                Free
              </span>
            </motion.div>

            {/* Floating Card 3: Design / Art */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 right-2 sm:right-4 z-20 w-64 p-3.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md shadow-lift flex items-center gap-3"
            >
              <img
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=120&auto=format&fit=crop&q=80"
                alt="Design"
                className="w-12 h-12 rounded-sm object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-wide">
                  Art & Design
                </span>
                <p className="text-xs font-semibold text-text dark:text-text-dark truncate">
                  Figma for Campus Startups
                </p>
                <p className="text-[11px] text-muted dark:text-muted-dark">
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
          <div className="aspect-video w-full rounded-md overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-white relative">
            <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-cta cursor-pointer hover:scale-105 transition-transform">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-300">
              Interactive 2-Minute Campus Walkthrough
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-muted dark:text-muted-dark">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-sm">
              <span className="font-bold text-text dark:text-text-dark block mb-1">1. College Email</span>
              Instant verification with your college domain.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-sm">
              <span className="font-bold text-text dark:text-text-dark block mb-1">2. Learn Any Skill</span>
              Zero paywalls, free peer-curated syllabi.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-sm">
              <span className="font-bold text-text dark:text-text-dark block mb-1">3. Become a Mentor</span>
              Teach juniors and build your leadership profile.
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

