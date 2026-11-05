import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MentorCard } from '../components/MentorCard';
import mentorsData from '../data/mentors.json';

export function Mentors() {
  const navigate = useNavigate();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-contrast mb-2">
              <Sparkles className="w-4 h-4 text-primary" strokeWidth={2} />
              <span>Campus Mentorship</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[40px] text-text dark:text-text-dark leading-[1.15]">
              Learn Directly from Seniors
            </h2>
            <p className="text-sm text-muted dark:text-muted-dark mt-2">
              Top club leads, hackathon winners, and collegiate fest champions ready to guide you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/teach')}
            className="text-sm font-semibold text-primary dark:text-primary-contrast hover:underline flex items-center gap-1.5 group self-start md:self-auto"
          >
            <span>Become a Mentor</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Row of 4 MentorCards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorsData.slice(0, 4).map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}

