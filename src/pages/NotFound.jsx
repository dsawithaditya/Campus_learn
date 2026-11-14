import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Decorative ambient radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#0859D4]/10 via-[#1A59F9]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container-custom max-w-lg text-center space-y-6 glass-card p-10 rounded-2xl border border-black/[0.08] shadow-[0_20px_50px_rgba(29,29,31,0.08)]">
        {/* Simple 2D Illustration */}
        <div className="w-20 h-20 rounded-2xl bg-[#0859D4]/10 border border-[#0859D4]/20 text-[#0859D4] flex items-center justify-center mx-auto shadow-soft">
          <Compass className="w-10 h-10 text-[#0859D4]" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#0859D4] uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1D1D1F]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#6E6E73] leading-relaxed">
            Looks like this course module or page doesn't exist or was moved to another semester.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to="/">
            <Button variant="primary" icon={Home}>
              Back to Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="secondary" icon={Compass}>
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
