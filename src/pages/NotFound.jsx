import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Decorative ambient radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container-custom max-w-lg text-center space-y-6 glass-card p-10 rounded-2xl border border-border/80 dark:border-border-dark/80 shadow-lift">
        {/* Simple 2D Illustration */}
        <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto shadow-soft">
          <Compass className="w-10 h-10 text-orange-400" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-text dark:text-text-dark">
            Page Not Found
          </h1>
          <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">
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
