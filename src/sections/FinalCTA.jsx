import React from 'react';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden text-center">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-300/30 via-pink-200/20 to-purple-300/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
          <GraduationCap className="w-4 h-4" />
          <span>Your Collegiate Skillcamp Gateway</span>
        </div>

        <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
          Ready to learn directly from campus seniors?
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Join thousands of students mastering coding, music, dance, esports, and design. Free for all verified collegiate students.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/signup')}
            className="btn-interactive w-full sm:w-auto px-8 py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xl"
          >
            <span>Join Now with College Email</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm transition-all shadow-sm"
          >
            Explore All 8 Skill Camps
          </button>
        </div>
      </div>
    </section>
  );
}
