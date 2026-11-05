import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="section-padding relative overflow-hidden text-center">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] hero-glow rounded-full pointer-events-none -z-10" />

      <div className="container-custom max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-primary-soft dark:bg-primary-soft/15 border border-primary/20 text-xs font-semibold text-primary dark:text-primary-contrast mb-6">
          <GraduationCap className="w-4 h-4" />
          <span>Your College Gateway</span>
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text dark:text-text-dark tracking-tight leading-tight mb-5">
          Ready to learn directly from campus seniors?
        </h2>

        <p className="text-muted dark:text-muted-dark text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Join thousands of students building real projects, winning hackathons, and acing college fests. Free forever.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-8"
          >
            Join now with college email
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/explore')}
            className="w-full sm:w-auto"
          >
            Explore all courses
          </Button>
        </div>
      </div>
    </section>
  );
}

