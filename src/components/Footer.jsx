import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { GrailHoverChars } from './AnimatedText';

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
    <footer className="bg-[#F5F5F7] text-[#424242] pt-20 pb-14 border-t border-black/[0.08] select-none">
      <div className="container-custom">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-black/[0.08]">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-full border border-[#0859D4]/30 bg-white flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-12 shadow-soft">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[2]">
                  <circle cx="12" cy="12" r="9" className="stroke-[#1D1D1F]/80" />
                  <line x1="5" y1="19" x2="19" y2="5" className="stroke-[#0859D4]" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-[#1D1D1F] flex items-baseline gap-1">
                Campus <span className="font-editorial italic text-[#0859D4] font-normal text-xl leading-none">Learn</span>
              </span>
            </Link>
            <p className="font-body text-[#6E6E73] text-sm max-w-xs leading-relaxed">
              Peer-led cohorts in tech, design, music, and sports.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-[#424242] bg-white border border-black/[0.08] px-3 py-1.5 rounded-full w-fit shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0859D4]" />
              <span>College-verified network</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-heading text-[#424242]">
              <li>
                <Link to="/explore?category=tech" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Tech & Coding" />
                </Link>
              </li>
              <li>
                <Link to="/explore?category=art" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Design & 3D" />
                </Link>
              </li>
              <li>
                <Link to="/explore?category=music" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Music & Vocals" />
                </Link>
              </li>
              <li>
                <Link to="/explore?category=sports" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Sports & Fitness" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm font-heading text-[#424242]">
              <li>
                <Link to="/how-it-works" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="How it Works" />
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Senior Mentors" />
                </Link>
              </li>
              <li>
                <Link to="/guilds" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Campus Guilds" />
                </Link>
              </li>
              <li>
                <Link to="/outcomes" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Outcomes" />
                </Link>
              </li>
              <li>
                <Link to="/teach" className="hover:text-[#0859D4] transition-colors inline-block">
                  <GrailHoverChars text="Become a Mentor" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
              Campus Updates
            </h4>
            <p className="text-xs text-[#6E6E73] mb-3">
              Get notified when cohorts from your college go live.
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-600 font-semibold font-mono">
                ✓ Subscribed successfully!
              </p>
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
                  className="w-full px-3.5 py-2 text-xs rounded-full bg-white border border-black/10 text-[#1D1D1F] placeholder-[#6E6E73] focus:outline-none focus:border-[#0859D4] font-mono"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full btn-zephyr-primary text-xs py-2 cursor-pointer"
                >
                  Join Waitlist
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6E73] gap-4 font-mono">
          <p>© {new Date().getFullYear()} Campus Learn • Real Craft Happens Together</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#1D1D1F] transition-colors">
              <GrailHoverChars text="Privacy" />
            </a>
            <a href="#terms" className="hover:text-[#1D1D1F] transition-colors">
              <GrailHoverChars text="Terms" />
            </a>
            <motion.button
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={scrollToTop}
              className="hover:text-[#0859D4] text-[#1D1D1F] transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <GrailHoverChars text="Back to top" />
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
