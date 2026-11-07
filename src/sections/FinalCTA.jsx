import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';
import { SplitTextReveal, Magnetic } from '../components/AnimatedText';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-28 sm:py-36 relative overflow-hidden text-center bg-[#070709]">
      <div className="container-custom max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-semibold text-zinc-300 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>JOIN 10,000+ STUDENTS ACROSS 50+ CAMPUS HUBS</span>
        </motion.div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06] mb-6">
          <SplitTextReveal text="Ready to learn directly" /> <br />
          <span className="text-zinc-400">
            <SplitTextReveal text="from campus" delay={0.2} />{' '}
          </span>
          <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.12em]">
            seniors?
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-zinc-400 text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Join thousands of students mastering tech, arts, music, and sports. Free with your verified college email domain.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Magnetic strength={0.18} className="w-full sm:w-auto">
            <InteractiveHoverButton
              text="Get started free"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-52 h-12 text-sm border-white/20 hover:border-[#FF6B00]/70 shadow-lg shadow-[#FF6B00]/20"
            />
          </Magnetic>

          <Magnetic strength={0.18} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/explore')}
              className="btn-zephyr-secondary w-full sm:w-auto px-7 py-3.5 text-sm"
            >
              Browse All Cohorts
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Luminous Orange Horizon Light Beam */}
      <OrangeHorizonLight
        className="bottom-0"
        intensity="high"
        height="h-[240px]"
        lineOpacity="opacity-100"
      />
    </section>
  );
}

export default FinalCTA;
