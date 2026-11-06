import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export function MentorCTA() {
  const navigate = useNavigate();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-orange-500/30 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Ambient ember background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Decorative floating shapes */}
          <motion.div
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-orange-500/10 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360, y: [0, 10, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border-2 border-white/5 pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-semibold text-orange-400 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teach what you love</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 text-zinc-100">
              Share your skill. Empower your juniors.
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Are you a 2nd, 3rd or 4th-year student skilled in coding, dance, photography or sports? Turn your passion into a structured course and lead your campus.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/teach')}
              >
                Start Teaching
              </Button>
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <span>Zero fees • Verified mentor badge for resumes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
