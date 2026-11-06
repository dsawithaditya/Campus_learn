import React from 'react';
import { StatCounter } from '../components/StatCounter';

export function Stats() {
  return (
    <section className="py-12 md:py-16 bg-zinc-950/60 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/5 to-transparent pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <StatCounter end={14500} suffix="+" label="Active Students" />
          <StatCounter end={120} suffix="+" label="Peer Courses" />
          <StatCounter end={85} suffix="+" label="Campus Mentors" />
          <StatCounter end={8} label="Diverse Categories" />
        </div>
      </div>
    </section>
  );
}
