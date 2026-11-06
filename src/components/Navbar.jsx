import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Compass, Users, Sparkles, BookOpen } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useAppStore } from '../store/useAppStore';

export function Navbar() {
  const { scrollY } = useScrollProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  const isScrolled = scrollY > 30;

  // Modern directional scroll detection (auto-hides on scroll down, reveals on scroll up)
  useEffect(() => {
    const handleDirectionalScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the very top of the page
      if (currentScrollY < 30) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // If mobile menu is open, don't hide
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      // Scrolling DOWN -> hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      }
      // Scrolling UP -> reveal navbar
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleDirectionalScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleDirectionalScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  return (
    <>
      {/* Floating Centered Pill Navbar with Directional Auto-Hide */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          animate={{
            y: isVisible ? 0 : -90,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`pointer-events-auto w-full max-w-5xl rounded-full transition-shadow duration-300 px-5 sm:px-6 py-2.5 flex items-center justify-between zephyr-pill-nav ${isScrolled ? 'shadow-[0_15px_35px_rgba(0,0,0,0.85)] border-white/20' : 'border-white/10'
            }`}
        >
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 rounded-full border border-[#FF6B00]/40 bg-zinc-900 flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:scale-105 group-hover:border-[#FF6B00] shadow-[0_0_12px_rgba(255,107,0,0.3)]">
              {/* Circular slashed emblem with Blaze Orange slash */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[2]">
                <circle cx="12" cy="12" r="9" className="stroke-white/80" />
                <line x1="5" y1="19" x2="19" y2="5" className="stroke-[#FF6B00]" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1">
              Campus <span className="text-[#FF6B00] font-normal">Learn</span>
            </span>
          </Link>

          {/* Center Navigation Links (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-400">
            <Link
              to="/explore"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              Courses
            </Link>
            <a
              href="#mentors"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              Mentors
            </a>
            <a
              href="#how-it-works"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              How it Works
            </a>
            <a
              href="#stats"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              Outcomes
            </a>
            <a
              href="#testimonials"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              Student Stories
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-zephyr-secondary text-xs px-4 py-1.5"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-zinc-400 hover:text-white px-2 py-1"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 transition-colors"
                >
                  Log in
                </Link>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-zephyr-primary text-xs px-4 py-2"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden p-5 rounded-3xl bg-zinc-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <Link
                to="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white"
              >
                <BookOpen className="w-4 h-4 text-zinc-400" />
                <span>Browse All Courses</span>
              </Link>
              <a
                href="#mentors"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white"
              >
                <Users className="w-4 h-4 text-zinc-400" />
                <span>Senior Campus Mentors</span>
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white"
              >
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span>How Campus Learn Works</span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/signup');
                }}
                className="btn-zephyr-primary w-full py-2.5 text-sm"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="btn-zephyr-secondary w-full py-2.5 text-sm"
              >
                Log in
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
