import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 text-slate-600 dark:text-zinc-300 pt-16 pb-12 border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="container-custom">
        {/* Top Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-100 dark:border-zinc-800/80">
          {/* Column 1: Brand (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-400 to-amber-300 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <span className="font-heading font-black text-[10px] tracking-tighter">CL</span>
                </div>
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-slate-900 dark:text-white">
                Campus<span className="text-blue-600 dark:text-blue-400">Learn</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed">
              India's premier student peer learning playground. Master real-world tech, arts, vocals and sports directly from high-achieving seniors.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 px-3 py-1.5 rounded-full w-fit font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" strokeWidth={2} />
              <span>Verified students with college email (.edu / .ac.in)</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#github"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-blue-600 transition-colors"
              >
                <Github className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-blue-600 transition-colors"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-blue-600 transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Column 2: 8 Skill Camps */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              8 Skill Camps
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-zinc-400 font-medium">
              <li>
                <Link to="/explore?category=tech" className="hover:text-blue-600 transition-colors">
                  Tech & Coding
                </Link>
              </li>
              <li>
                <Link to="/explore?category=singing" className="hover:text-blue-600 transition-colors">
                  Singing & Vocals
                </Link>
              </li>
              <li>
                <Link to="/explore?category=music" className="hover:text-blue-600 transition-colors">
                  Music Production
                </Link>
              </li>
              <li>
                <Link to="/explore?category=dance" className="hover:text-blue-600 transition-colors">
                  Dance & Choreography
                </Link>
              </li>
              <li>
                <Link to="/explore?category=sports" className="hover:text-blue-600 transition-colors">
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link to="/explore?category=art" className="hover:text-blue-600 transition-colors">
                  Art & Design
                </Link>
              </li>
              <li>
                <Link to="/explore?category=photography" className="hover:text-blue-600 transition-colors">
                  Photography & Video
                </Link>
              </li>
              <li>
                <Link to="/explore?category=gaming" className="hover:text-blue-600 transition-colors">
                  Gaming & Esports
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-zinc-400 font-medium">
              <li>
                <Link to="/teach" className="hover:text-blue-600 transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <a href="#fests" className="hover:text-blue-600 transition-colors">
                  Campus Fest Collabs
                </a>
              </li>
              <li>
                <a href="#hackathons" className="hover:text-blue-600 transition-colors">
                  Hackathon Squads
                </a>
              </li>
              <li>
                <a href="#guilds" className="hover:text-blue-600 transition-colors">
                  Hostel Study Guilds
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              Skillcamp Weekly
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mb-3">
              Get hand-picked course drops, 3D workshop releases, and hackathon alerts.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the list! Watch your college inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@college.edu"
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-interactive w-full text-xs font-bold py-2.5 rounded-xl text-white shadow-md cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] text-slate-400 space-y-1">
              <p>Privacy Policy • Terms of Service</p>
              <p>Peer-learning honour code applies</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Campus Learn Inc. The student skillcamp network.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors group cursor-pointer font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp
              className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-blue-600"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
