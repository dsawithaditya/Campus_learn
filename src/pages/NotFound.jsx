import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
      <div className="container-custom max-w-lg text-center space-y-6">
        {/* Simple 2D Illustration */}
        <div className="w-24 h-24 rounded-3xl bg-primary-soft dark:bg-slate-800 text-primary flex items-center justify-center mx-auto shadow-soft">
          <Compass className="w-12 h-12 text-primary" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
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

