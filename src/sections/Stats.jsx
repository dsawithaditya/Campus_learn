import React from 'react';
import { StatCounter } from '../components/StatCounter';

export function Stats() {
  return (
    <section className="py-12 md:py-16 bg-primary-soft/60 dark:bg-slate-900/60 border-y border-primary/10 dark:border-slate-800">
      <div className="container-custom">
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

