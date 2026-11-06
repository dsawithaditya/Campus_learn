import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-28 sm:py-36 relative overflow-hidden text-center">
      {/* Central Ambient Blaze Orange Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#FF6B00]/[0.14] via-[#F59E0B]/[0.08] to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom max-w-3xl">
        <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-6">
          Ready to learn directly <br />
          <span className="text-zinc-400">from campus seniors?</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed">
          Join thousands of students mastering tech, arts, music, and sports. Free with your verified college email domain.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/signup')}
            className="btn-zephyr-primary w-full sm:w-auto px-8 py-3.5 text-sm"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="w-4 h-4 ml-2 inline-block" />
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="btn-zephyr-secondary w-full sm:w-auto px-7 py-3.5 text-sm"
          >
            Browse All Cohorts
          </button>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
