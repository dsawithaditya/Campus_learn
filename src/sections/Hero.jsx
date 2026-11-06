import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Compass, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SkillCamp3DScene } from '../components/SkillCamp3DScene';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';
import categoriesData from '../data/categories.json';

export function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];
  const activeCategoryObj = safeCategories.find((c) => c?.id === selectedCategory);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden select-none">
      {/* Soft Ambient Pastel Background Auroras */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[400px] bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-blue-200/35 blur-3xl rounded-full pointer-events-none -z-20" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-gradient-to-l from-amber-200/40 via-rose-200/30 to-indigo-200/30 blur-3xl rounded-full pointer-events-none -z-20" />

      {/* Real-time Interactive 3D Canvas with 8 Categories */}
      <SkillCamp3DScene onSelectCategory={handleSelectCategory} />

      {/* Centered Typography & Content Overlay matching reference image */}
      <div className="container-custom relative z-10 text-center max-w-4xl px-4 pointer-events-none">
        {/* Animated Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs font-bold text-slate-800 dark:text-slate-200 mb-6 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Interactive 3D Skill Camp • Click any 3D model to explore</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </motion.div>

        {/* Giant Black Typography Display matching reference: HOWDO SKILLCAMP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 mb-6"
        >
          <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-[-0.04em] text-slate-950 dark:text-white leading-[0.92] uppercase">
            CAMPUS LEARN
          </h1>
          <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-[-0.04em] text-slate-950 dark:text-white leading-[0.92] uppercase">
            SKILLCAMP
          </h2>
        </motion.div>

        {/* Subtitle matching German / English dual line in reference image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mx-auto space-y-1 mb-8"
        >
          <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300">
            Ein Ort für alle, die Neues entdecken wollen.
          </p>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
            The playground for digital, creative, and active minds. Master tech, arts, vocals and sports directly from senior campus mentors.
          </p>
        </motion.div>

        {/* Interactive Search & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto pointer-events-auto"
        >
          <button
            onClick={() => navigate('/explore')}
            className="btn-interactive w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold shadow-xl"
          >
            <span>Explore All Camps</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span>Watch Experience</span>
          </button>
        </motion.div>

        {/* Quick Category Chips bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 pointer-events-auto"
        >
          {safeCategories.map((cat) => (
            <button
              key={cat?.id}
              onClick={() => handleSelectCategory(cat?.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat?.id
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-sm'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cat?.color || '#3b82f6' }}
              />
              <span>{cat?.name}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Selected 3D Model Category Quick Preview Drawer/Modal */}
      <AnimatePresence>
        {activeCategoryObj && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 z-50 left-1/2 -translate-x-1/2 w-[92%] max-w-lg glass-card p-5 shadow-2xl border-2 border-blue-500/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: activeCategoryObj?.color || '#2563eb' }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                      {activeCategoryObj?.name}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
                      {activeCategoryObj?.courseCount} Camps Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeCategoryObj?.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                100% Peer Senior Led • Campus Verified
              </span>
              <button
                onClick={() => navigate(`/explore?category=${activeCategoryObj?.id}`)}
                className="btn-interactive text-xs font-bold px-4 py-1.5 flex items-center gap-1.5"
              >
                <span>View Bootcamps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Experience Campus Learn Skillcamp"
      >
        <div className="space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
              alt="Students collaborating"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6 text-white">
              <p className="font-heading font-extrabold text-xl">
                The Student Peer Learning Revolution
              </p>
              <p className="text-xs text-slate-300 mt-1">
                From hackathon victory circuits to university music fests.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every course module is taught by high-achieving seniors from IITs, BITS, and premier design colleges.
          </p>
        </div>
      </Modal>
    </section>
  );
}
