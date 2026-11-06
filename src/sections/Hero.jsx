import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SkillCamp3DScene } from '../components/SkillCamp3DScene';
import { Modal } from '../components/Modal';

// Direct course slug mapping for all 8 3D icons
const CATEGORY_COURSE_SLUGS = {
  tech: 'full-stack-web-dev-react-supabase',
  singing: 'hindustani-classical-riyaz-essentials',
  music: 'fl-studio-lofi-beats',
  dance: 'urban-hiphop-street-footwork',
  sports: 'basketball-tactics-court-vision',
  art: 'figma-campus-startups-portfolio',
  photography: 'campus-event-photography-street-portraits',
  gaming: 'valorant-mechanics-radiant-game-sense',
};

export function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectCategory = (catId) => {
    const slug = CATEGORY_COURSE_SLUGS[catId];
    if (slug) {
      navigate(`/course/${slug}`);
    } else {
      navigate(`/explore?category=${catId}`);
    }
  };

  return (
    <section className="relative min-h-[98vh] flex flex-col justify-center items-center pt-24 pb-24 select-none">
      {/* Soft Ambient Pastel Background Auroras */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[400px] bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-blue-200/35 blur-3xl rounded-full pointer-events-none -z-20" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[350px] bg-gradient-to-l from-amber-200/40 via-rose-200/30 to-indigo-200/30 blur-3xl rounded-full pointer-events-none -z-20" />

      {/* Real-time Interactive 3D Canvas with 8 Categories */}
      <SkillCamp3DScene onSelectCategory={handleSelectCategory} />

      {/* Centered Typography & Content Overlay matching reference image */}
      <div className="container-custom relative z-10 text-center max-w-4xl px-4 pointer-events-none">
        {/* Giant Black Typography Display matching reference: HOWDO SKILLCAMP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-1 mb-8"
        >
          <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300">
            Ein Ort für alle, die Neues entdecken wollen.
          </p>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
            The playground for digital, creative, and active minds. Master tech, arts, vocals and sports directly from senior campus mentors.
          </p>
        </motion.div>

        {/* Interactive Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto pointer-events-auto"
        >
          <button
            onClick={() => navigate('/explore')}
            className="btn-interactive w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold shadow-xl cursor-pointer"
          >
            <span>Explore All Camps</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span>Watch Experience</span>
          </button>
        </motion.div>
      </div>

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
