import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MentorCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Decorative floating shapes */}
          <motion.div
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/20 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360, y: [0, 10, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border-2 border-white/10 pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs font-bold text-white mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Lead your campus society</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 text-white">
              Share your craft. Empower your juniors.
            </h2>

            <p className="text-blue-100 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Are you skilled in tech, vocal music, dance, sports or design? Turn your collegiate experience into a structured bootcamp and inspire students across 100+ campuses.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigate('/teach')}
                className="px-6 py-3.5 rounded-full bg-white text-blue-700 font-heading font-black text-sm hover:bg-slate-50 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Mentoring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-blue-100 flex items-center gap-2 font-medium">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Zero fees • Verified mentor credential for placements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
