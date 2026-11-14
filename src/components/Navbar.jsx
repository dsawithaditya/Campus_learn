import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users, Sparkles, BookOpen, Layers, BarChart3 } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useAppStore } from '../store/useAppStore';

const NAV_LINKS = [
  { label: 'Courses', to: '/explore', icon: BookOpen },
  { label: 'Mentors', to: '/mentors', icon: Users },
  { label: 'How it Works', to: '/how-it-works', icon: Layers },
  { label: 'Guilds', to: '/guilds', icon: Sparkles },
  { label: 'Outcomes', to: '/outcomes', icon: BarChart3 },
];

export function Navbar() {
  const { scrollY } = useScrollProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isScrolled = scrollY > 30;

  useEffect(() => {
    const handleDirectionalScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 30) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleDirectionalScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleDirectionalScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  return (
    <>
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
          className={`pointer-events-auto w-full max-w-5xl rounded-full transition-shadow duration-300 px-5 sm:px-6 py-2.5 flex items-center justify-between zephyr-pill-nav ${
            isScrolled
              ? 'shadow-[0_14px_34px_rgba(29,29,31,0.12)] border-black/10'
              : 'border-black/[0.08]'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 rounded-full border border-[#0859D4]/30 bg-[#F5F5F7] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:border-[#0859D4]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[2]">
                <circle cx="12" cy="12" r="9" className="stroke-[#1D1D1F]/80" />
                <line x1="5" y1="19" x2="19" y2="5" className="stroke-[#0859D4]" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-[#1D1D1F] flex items-baseline gap-1">
              Campus <span className="font-editorial italic text-[#0859D4] font-normal text-lg leading-none">Learn</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-[#6E6E73]">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? 'text-[#0859D4] font-semibold'
                      : 'hover:text-[#1D1D1F] hover:bg-black/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#0859D4]/10 border border-[#0859D4]/20 -z-10"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn-zephyr-secondary text-xs px-4 py-1.5"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] px-2 py-1 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs text-[#424242] hover:text-[#1D1D1F] px-3 py-1.5 transition-colors font-medium"
                >
                  Log in
                </Link>
                <button
                  type="button"
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
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-[#424242] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors cursor-pointer"
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
            className="fixed top-20 left-4 right-4 z-40 md:hidden p-5 rounded-3xl bg-white/95 border border-black/10 backdrop-blur-2xl shadow-xl space-y-4"
          >
            <div className="flex flex-col space-y-1.5 text-sm font-medium">
              {NAV_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#0859D4]/10 text-[#0859D4]'
                        : 'hover:bg-black/[0.04] text-[#424242] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-black/10 flex flex-col gap-2.5">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="btn-zephyr-primary w-full py-2.5 text-sm"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="btn-zephyr-secondary w-full py-2.5 text-sm"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="btn-zephyr-primary w-full py-2.5 text-sm"
                  >
                    Get Started
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="btn-zephyr-secondary w-full py-2.5 text-sm"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
