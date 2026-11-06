import React from 'react';
import { motion } from 'framer-motion';
import { MailCheck, Compass, Award, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    step: '01',
    title: 'Sign Up with College Email',
    description:
      'Verified with your .edu or .ac.in campus domain. Connects you directly to seniors and campus society leads.',
    icon: MailCheck,
    color: '#3B82F6',
  },
  {
    step: '02',
    title: 'Pick a 3D Skill Camp',
    description:
      'Choose from tech, music production, dance choreography, esports, or graphic arts taught step-by-step.',
    icon: Compass,
    color: '#8B5CF6',
  },
  {
    step: '03',
    title: 'Build & Earn Badges',
    description:
      'Track module completions, build tangible portfolio projects, and unlock verified student credentials.',
    icon: Award,
    color: '#10B981',
  },
];

export function HowItWorks() {
  const [ref, isInView] = useInView({ threshold: 0.2, once: true });

  return (
    <section ref={ref} id="about" className="py-20 border-y border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-zinc-950/40">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Flow</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white leading-[1.15]">
            How Campus Learn Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Designed to fit around university exams, lab submissions, and semester deadlines.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-8 rounded-3xl relative flex flex-col items-start text-left"
              >
                <div className="flex items-center justify-between w-full mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2.2} />
                  </div>
                  <span className="font-heading font-black text-3xl text-slate-300 dark:text-slate-700">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
