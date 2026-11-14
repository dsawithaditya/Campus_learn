import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Stats } from '../sections/Stats';
import { Testimonials } from '../sections/Testimonials';
import { SplitTextReveal } from '../components/AnimatedText';

const HIGHLIGHTS = [
  { label: 'Active Cohorts', value: '108+' },
  { label: 'Peer Rating', value: '4.9 ★' },
  { label: 'Student Grants', value: '100% Free' },
];

export default function OutcomesPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-20 left-1/3 w-[520px] h-[260px] bg-[#0859D4]/[0.05] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom space-y-8">
        {/* Unified Header + Quick Proof KPIs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#1D1D1F] tracking-tight leading-[1.06]">
              <SplitTextReveal text="Campus" />{' '}
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.08em]">
                Outcomes
              </span>
            </h1>
            <p className="text-sm text-[#6E6E73] mt-2 max-w-md">
              Real skill momentum and peer stories from across campus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] flex flex-col shadow-soft"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6E6E73]">
                  {item.label}
                </span>
                <span className="font-display font-bold text-lg text-[#1D1D1F]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Single Unified Box: Student Stories at Top + Live Momentum Physics */}
        <Stats standalone topContent={<Testimonials embedded />} />

        {/* Clean Bottom CTA Strip */}
        <div className="rounded-2xl bg-[#F5F5F7] border border-black/[0.08] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#424242]">
            Ready to start your next cohort with a verified senior?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/explore" className="btn-zephyr-primary text-xs px-5 py-2.5 min-h-[44px] gap-1.5">
              <span>Explore Cohorts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/mentors" className="btn-zephyr-secondary text-xs px-5 py-2.5 min-h-[44px]">
              Meet Mentors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
