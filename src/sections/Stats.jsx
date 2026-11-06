import React from 'react';
import { StatCounter } from '../components/StatCounter';

export function Stats() {
  return (
    <section className="py-14 bg-white/70 dark:bg-zinc-950/60 border-y border-slate-200/80 dark:border-white/5 relative overflow-hidden backdrop-blur-sm">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <StatCounter end={14500} suffix="+" label="Active Students" />
          <StatCounter end={120} suffix="+" label="Peer Bootcamps" />
          <StatCounter end={85} suffix="+" label="Campus Mentors" />
          <StatCounter end={8} label="3D Skill Domains" />
        </div>
      </div>
    </section>
  );
}
