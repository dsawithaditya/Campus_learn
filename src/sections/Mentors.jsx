import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MentorCard } from '../components/MentorCard';
import { SplitTextReveal, ScrambleText, Magnetic } from '../components/AnimatedText';
import mentorsData from '../data/mentors.json';

export function Mentors() {
  const navigate = useNavigate();
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];

  return (
    <section id="mentors" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[350px] bg-[#FF6B00]/[0.03] blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2">
              <ScrambleText text="04 // CAMPUS MENTORSHIP" />
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.06]">
              <SplitTextReveal text="Learn Directly from" />{' '}
              <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.1em]">
                Seniors
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Club heads, national hackathon winners, and collegiate fest leads ready to guide you 1-on-1.
            </p>
          </div>

          <Magnetic strength={0.18} className="self-start md:self-auto">
            <InteractiveHoverButton
              text="Become a Mentor"
              onClick={() => navigate('/teach')}
              className="w-48 h-11 text-xs sm:text-sm border-white/20 hover:border-[#FF6B00]/70"
            />
          </Magnetic>
        </div>

        {/* 4 Mentor Cards Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeMentors?.slice(0, 4)?.map((mentor, idx) => (
            <motion.div
              key={mentor?.id || idx}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <MentorCard mentor={mentor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mentors;
