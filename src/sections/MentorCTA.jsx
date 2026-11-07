import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { SplitTextReveal, Magnetic } from '../components/AnimatedText';

export function MentorCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-12 lg:p-16 text-white shadow-2xl group hover:border-[#FF6B00]/45 transition-colors"
        >
          {/* Ambient background glow in Blaze Orange & Amber */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B00]/18 via-[#F59E0B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#FF6B00]/12 rounded-full blur-3xl pointer-events-none" />

          {/* Decorative floating shapes */}
          <motion.div
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/10 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360, y: [0, 10, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>LEAD YOUR CAMPUS SOCIETY</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] mb-4 text-white">
              <SplitTextReveal text="Share your craft. Empower your" />{' '}
              <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.12em]">
                juniors.
              </span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Are you skilled in tech, vocal music, dance, sports or design? Turn your collegiate experience into a structured bootcamp and inspire students across 100+ campuses.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Magnetic strength={0.18}>
                <InteractiveHoverButton
                  text="Start Mentoring"
                  onClick={() => navigate('/teach')}
                  className="w-full sm:w-52 h-12 text-sm border-white/20 hover:border-[#FF6B00]/70 shadow-lg shadow-[#FF6B00]/20"
                />
              </Magnetic>
              <div className="text-xs text-zinc-400 flex items-center gap-2 font-medium">
                <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
                <span>Zero fees • Verified mentor credential for placements</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
