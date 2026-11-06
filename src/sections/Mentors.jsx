import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MentorCard } from '../components/MentorCard';
import mentorsData from '../data/mentors.json';

export function Mentors() {
  const navigate = useNavigate();
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];

  return (
    <section id="mentors" className="py-20 relative">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={2} />
              <span>Campus Mentorship</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white leading-[1.15]">
              Learn Directly from Seniors
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Top club leads, hackathon winners, and collegiate fest champions ready to guide you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/teach')}
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 group self-start md:self-auto cursor-pointer"
          >
            <span>Become a Mentor</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Row of 4 MentorCards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeMentors?.slice(0, 4)?.map((mentor, idx) => (
            <div
              key={mentor?.id || idx}
              className={`animate-fade-up ${
                idx === 0 ? 'delay-1' : idx === 1 ? 'delay-2' : idx === 2 ? 'delay-3' : ''
              }`}
            >
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
