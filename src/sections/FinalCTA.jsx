import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrangeHorizonLight } from '../components/OrangeHorizonLight';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-28 sm:py-36 relative overflow-hidden text-center bg-[#070709]">
      <div className="container-custom max-w-3xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-semibold text-zinc-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>Join 10,000+ students across 50+ campus hubs</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-6">
          Ready to learn directly <br />
          <span className="text-zinc-400">from campus seniors?</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed">
          Join thousands of students mastering tech, arts, music, and sports. Free with your verified college email domain.
        </p>

        {/* Buttons: Primary "Get started" matches reference image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => navigate('/signup')}
            className="btn-glossy-white w-full sm:w-auto px-8 py-3.5 text-sm group"
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4 ml-2 inline-block transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="btn-zephyr-secondary w-full sm:w-auto px-7 py-3.5 text-sm"
          >
            Browse All Cohorts
          </button>
        </div>
      </div>

      {/* Luminous Orange Horizon Light Beam (Exact match to reference image) */}
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
