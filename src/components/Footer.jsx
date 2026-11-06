import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Button } from './Button';

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
    <footer className="bg-[#09090b] text-zinc-300 pt-16 pb-12 border-t border-zinc-800/80">
      <div className="container-custom">
        {/* Top Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-800/80">
          {/* Column 1: Brand (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-soft">
                <GraduationCap className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                Campus<span className="text-orange-500">Learn</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              India's premier peer-to-peer student learning network. Master real-world tech, arts, sports and music from senior campus mentors who’ve walked the path.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-pill w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={2} />
              <span>Verified students with college email only</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#github"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/explore?category=tech" className="hover:text-orange-400 transition-colors">
                  Tech & Coding
                </Link>
              </li>
              <li>
                <Link to="/explore?category=music" className="hover:text-orange-400 transition-colors">
                  Music Production
                </Link>
              </li>
              <li>
                <Link to="/explore?category=art" className="hover:text-orange-400 transition-colors">
                  Art & UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/explore?category=dance" className="hover:text-orange-400 transition-colors">
                  Dance & Choreography
                </Link>
              </li>
              <li>
                <Link to="/explore?category=sports" className="hover:text-orange-400 transition-colors">
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-orange-400 hover:underline">
                  Browse All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/teach" className="hover:text-orange-400 transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-orange-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <a href="#fests" className="hover:text-orange-400 transition-colors">
                  Campus Fest Collabs
                </a>
              </li>
              <li>
                <a href="#hackathons" className="hover:text-orange-400 transition-colors">
                  Hackathon Squads
                </a>
              </li>
              <li>
                <a href="#guilds" className="hover:text-orange-400 transition-colors">
                  Hostel Study Guilds
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Campus Weekly
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Get hand-picked course drops and hackathon announcements.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 p-2.5 rounded-md border border-emerald-800/40">
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
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-md px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <Button variant="primary" size="sm" fullWidth type="submit">
                  Subscribe
                </Button>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 space-y-1">
              <p>Privacy Policy • Terms of Service</p>
              <p>Peer-learning honour code applies</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Campus Learn Inc. Designed for students, by students.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp
              className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-orange-400"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
