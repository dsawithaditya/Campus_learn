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
    <section ref={ref} className="section-padding bg-slate-50/50 dark:bg-slate-900/30 border-y border-border/70 dark:border-border-dark/70">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-contrast mb-2 block">
            Simple 3-Step Flow
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[40px] text-text dark:text-text-dark leading-[1.15]">
            How Campus Learn Works
          </h2>
          <p className="text-sm sm:text-base text-muted dark:text-muted-dark mt-3">
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
                className="text-primary/40 dark:text-primary-contrast/30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? 1 : 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative z-10 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-6 sm:p-8 flex flex-col items-center text-center shadow-soft hover:shadow-lift transition-shadow"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-full bg-primary-soft dark:bg-primary-soft/15 text-primary dark:text-primary-contrast flex items-center justify-center mb-5 border border-primary/20">
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>

                <span className="text-xs font-bold text-accent tracking-widest uppercase mb-1">
                  Step {item.step}
                </span>

                <h3 className="font-heading font-semibold text-lg text-text dark:text-text-dark mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted dark:text-muted-dark leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

