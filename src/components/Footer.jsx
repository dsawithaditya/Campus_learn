import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Twitter, Linkedin, Instagram, ShieldCheck, ArrowRight } from 'lucide-react';

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
    <footer className="bg-black text-zinc-400 pt-20 pb-14 border-t border-white/10 select-none">
      <div className="container-custom">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-white/30 bg-zinc-900 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[2]">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="5" y1="19" x2="19" y2="5" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-white flex items-center gap-1">
                Campus <span className="text-zinc-500 font-normal">Learn</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              India's student peer learning platform. Master tech, arts, sports, and music directly from high-achieving campus seniors.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Verified students with college email</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore?category=tech" className="hover:text-white transition-colors">
                  Tech & Coding
                </Link>
              </li>
              <li>
                <Link to="/explore?category=art" className="hover:text-white transition-colors">
                  Design & 3D
                </Link>
              </li>
              <li>
                <Link to="/explore?category=music" className="hover:text-white transition-colors">
                  Music & Vocals
                </Link>
              </li>
              <li>
                <Link to="/explore?category=sports" className="hover:text-white transition-colors">
                  Sports & Fitness
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/#mentors" className="hover:text-white transition-colors">
                  Senior Mentors
                </Link>
              </li>
              <li>
                <Link to="/teach" className="hover:text-white transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Student Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Campus Updates
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Get notified when cohorts from your college go live.
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-400">Subscribed successfully!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  name="newsletterEmail"
                  id="footer-newsletter-email"
                  aria-label="Campus newsletter email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.ac.in"
                  className="w-full px-3.5 py-2 text-xs rounded-full bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                />
                <button
                  type="submit"
                  className="w-full btn-zephyr-primary text-xs py-2"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Campus Learn. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
