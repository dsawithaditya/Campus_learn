import React from 'react';
import { motion } from 'framer-motion';

export function Stats() {
  return (
    <section id="stats" className="relative py-24 sm:py-32 honeycomb-grid overflow-hidden border-y border-white/10">
      {/* Top Hairline with glowing center */}
      <div className="absolute top-0 left-0 right-0 zephyr-divider" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.025] blur-3xl pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        {/* Top Header Row matching Zephyr Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Focus on real skills, <br />
              <span className="text-zinc-400">not exam theory</span>
            </h2>
          </motion.div>

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

        {/* 3 Massive Stats Row matching Zephyr Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 pt-8 border-t border-white/10">
          {/* Stat 1: 95% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-2 group"
          >
            <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight group-hover:text-[#FF6B00] transition-colors">
              95%
            </div>
            <div className="text-sm font-semibold text-zinc-300">
              Course Completion Rate
            </div>
            <p className="text-xs text-zinc-500 max-w-xs">
              Students complete their bootcamps with tangible GitHub repos and portfolio projects.
            </p>
          </motion.div>

          {/* Stat 2: 0.3 sec */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col space-y-2 group"
          >
            <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight group-hover:text-[#FF6B00] transition-colors">
              0.3 sec
            </div>
            <div className="text-sm font-semibold text-zinc-300">
              Instant Mentor Connect
            </div>
            <p className="text-xs text-zinc-500 max-w-xs">
              Chat directly with seniors in your domain or campus discord community anytime.
            </p>
          </motion.div>

          {/* Stat 3: 1 line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col space-y-2 group"
          >
            <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight group-hover:text-[#FF6B00] transition-colors">
              1 line
            </div>
            <div className="text-sm font-semibold text-zinc-300">
              Free with College Email
            </div>
            <p className="text-xs text-zinc-500 max-w-xs">
              Zero platform fees for verified college students across all partner colleges.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
