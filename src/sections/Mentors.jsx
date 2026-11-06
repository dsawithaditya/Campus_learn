import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MentorCard } from '../components/MentorCard';
import mentorsData from '../data/mentors.json';

export function Mentors() {
  const navigate = useNavigate();
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];

  return (
    <section id="mentors" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[350px] bg-white/[0.015] blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
              Campus Mentorship
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Learn Directly from Seniors
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Club heads, national hackathon winners, and collegiate fest leads ready to guide you 1-on-1.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/teach')}
            className="btn-zephyr-secondary text-xs sm:text-sm self-start md:self-auto"
          >
            <span>Become a Mentor</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline-block opacity-70" />
          </button>
        </div>

        {/* 4 Mentor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeMentors?.slice(0, 4)?.map((mentor, idx) => (
            <div key={mentor?.id || idx}>
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mentors;
