import React from 'react';
import { motion } from 'framer-motion';
import { MailCheck, Compass, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    step: '01',
    title: 'Sign Up with College Email',
    description:
      'Frontend verified with your .edu or .ac.in campus domain. Connects you directly to peers and alumni networks.',
    icon: MailCheck,
  },
  {
    step: '02',
    title: 'Pick Any Skill or Fest Craft',
    description:
      'Choose from tech, music production, dance choreography, esports, or graphic arts taught step-by-step.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Learn & Earn Badges',
    description:
      'Track module completions, build tangible portfolio projects, and unlock verified student credentials.',
    icon: Award,
  },
];

export function HowItWorks() {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  return (
    <section ref={ref} className="section-padding bg-zinc-950/40 border-y border-white/5">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
            Simple 3-Step Flow
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[40px] text-zinc-100 leading-[1.15]">
            How Campus Learn Works
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            Designed to fit around exams, lab submissions, and semester deadlines.
          </p>
        </div>

        {/* 3 Steps with joining dashed line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Animated SVG connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] -translate-y-8 z-0 pointer-events-none">
            <svg className="w-full h-2" fill="none">
              <motion.line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="text-orange-500/30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? 1 : 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {steps?.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item?.step || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card relative z-10 p-6 sm:p-8 flex flex-col items-center text-center shadow-lg"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center justify-center mb-5 shadow-inner">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>

                <span className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">
                  Step {item?.step}
                </span>

                <h3 className="font-heading font-bold text-lg text-zinc-100 mb-2.5">
                  {item?.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item?.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
