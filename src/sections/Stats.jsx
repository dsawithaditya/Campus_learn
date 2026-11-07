import React from 'react';
import { motion } from 'framer-motion';
import { SplitTextReveal, ScrambleText, CountUpNumber } from '../components/AnimatedText';

export function Stats() {
  return (
    <section id="stats" className="relative py-24 sm:py-32 honeycomb-grid overflow-hidden border-y border-white/10">
      {/* Top Hairline with glowing center */}
      <div className="absolute top-0 left-0 right-0 zephyr-divider" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6B00]/[0.04] blur-3xl pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2.5">
              <ScrambleText text="05 // MEASURABLE OUTCOMES" />
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06]">
              <SplitTextReveal text="Focus on real skills," /> <br />
              <span className="text-zinc-400">
                <SplitTextReveal text="not exam" delay={0.2} />{' '}
              </span>
              <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.12em]">
                theory.
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed"
          >
            Learn directly from students who cracked top internships, won national hackathons, and aced cultural fests—without waiting for slow college curricula.
          </motion.div>
        </div>

        {/* 3 Massive Animated Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 pt-10 border-t border-white/10">
          {/* Stat 1: 95% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="flex flex-col space-y-2.5 group p-5 -m-5 rounded-3xl hover:bg-white/[0.02] transition-colors"
          >
            <div className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight group-hover:text-[#FF6B00] transition-colors">
              <CountUpNumber value={95} suffix="%" duration={1700} />
            </div>
            <div className="font-heading text-base font-bold text-zinc-200">
              Course Completion Rate
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs leading-relaxed">
              Students complete their bootcamps with tangible GitHub repos and portfolio projects.
            </p>
          </motion.div>

          {/* Stat 2: 0.3 sec */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="flex flex-col space-y-2.5 group p-5 -m-5 rounded-3xl hover:bg-white/[0.02] transition-colors"
          >
            <div className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight group-hover:text-[#FF6B00] transition-colors">
              <CountUpNumber value={0.3} decimals={1} suffix=" sec" duration={1500} />
            </div>
            <div className="font-heading text-base font-bold text-zinc-200">
              Instant Mentor Connect
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs leading-relaxed">
              Chat directly with seniors in your domain or campus discord community anytime.
            </p>
          </motion.div>

          {/* Stat 3: 1 line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="flex flex-col space-y-2.5 group p-5 -m-5 rounded-3xl hover:bg-white/[0.02] transition-colors"
          >
            <div className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight group-hover:text-[#FF6B00] transition-colors">
              <CountUpNumber value={1} suffix=" click" duration={1200} />
            </div>
            <div className="font-heading text-base font-bold text-zinc-200">
              Free with College Email
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs leading-relaxed">
              Zero platform fees for verified college students across all partner colleges.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
