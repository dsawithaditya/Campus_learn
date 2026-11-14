import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users, Sparkles, BookOpen, Layers, BarChart3, Search } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useAppStore } from '../store/useAppStore';
import { BrandLogo } from './BrandLogo';
import { Modal } from './Modal';
import { SearchBar } from './SearchBar';
import categoriesData from '../data/categories.json';

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
  const lastScrollYRef = useRef(0);

  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const isSearchOpen = useAppStore((state) => state.isSearchModalOpen);
  const setSearchOpen = useAppStore((state) => state.setSearchModalOpen);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isScrolled = scrollY > 30;

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, setSearchOpen]);

  // Global Cmd+K / Ctrl+K shortcut for Quick Search
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!useAppStore.getState().isSearchModalOpen);
      } else if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen, setSearchOpen]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Single passive scroll listener using ref (zero listener thrashing)
  useEffect(() => {
    const handleDirectionalScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;

      if (currentScrollY < 30 || isMobileMenuOpen) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY > prevScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleDirectionalScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleDirectionalScroll);
  }, [isMobileMenuOpen]);

  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <>
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <motion.div
          animate={{
            y: isVisible ? 0 : -96,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`pointer-events-auto w-full max-w-5xl rounded-full transition-shadow duration-300 px-3.5 sm:px-6 py-2 flex items-center justify-between gap-2 zephyr-pill-nav ${
            isScrolled
              ? 'shadow-[0_14px_34px_rgba(29,29,31,0.12)] border-black/10'
              : 'border-black/[0.08]'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="group shrink-0 py-1">
            <BrandLogo size="md" />
          </Link>

          {/* Center Navigation Links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5 lg:gap-1 text-xs lg:text-sm font-medium text-[#6E6E73]">
            {NAV_LINKS.map((item) => {
              const isActive =
                pathname === item.to ||
                (item.to === '/explore' && pathname.startsWith('/course/')) ||
                (item.to === '/mentors' && pathname.startsWith('/mentor/'));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-2.5 lg:px-3.5 py-2 rounded-full whitespace-nowrap transition-colors ${
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

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Search Button (Desktop & Mobile >=44px target) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Quick search cohorts and mentors"
              className="inline-flex items-center justify-center gap-2 min-w-[40px] min-h-[40px] sm:min-h-[36px] px-2.5 lg:px-3 rounded-full bg-[#F5F5F7] hover:bg-[#EBEBF0] border border-black/[0.07] text-[#424242] hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="hidden xl:inline font-mono text-[10px] text-[#6E6E73] bg-white px-1.5 py-0.5 rounded border border-black/[0.08]">
                Ctrl K
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn-zephyr-secondary text-xs px-3.5 lg:px-4 py-1.5 whitespace-nowrap"
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      if (pathname === '/dashboard') navigate('/');
                    }}
                    className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] px-2 py-1.5 cursor-pointer whitespace-nowrap"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs text-[#424242] hover:text-[#1D1D1F] px-3 py-1.5 transition-colors font-medium whitespace-nowrap"
                  >
                    Log in
                  </Link>
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="btn-zephyr-primary text-xs px-4 py-2 whitespace-nowrap"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button (>= 44x44 tap target) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden w-11 h-11 rounded-full text-[#424242] hover:text-[#1D1D1F] hover:bg-black/[0.05] flex items-center justify-center transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Backdrop + Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-3.5 right-3.5 z-50 md:hidden p-4 rounded-3xl bg-white/98 border border-black/10 backdrop-blur-2xl shadow-2xl space-y-3 max-h-[calc(100vh-110px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1 text-sm font-medium">
                {NAV_LINKS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 min-h-[44px] rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#0859D4]/10 text-[#0859D4] font-semibold'
                          : 'hover:bg-black/[0.04] text-[#424242] hover:text-[#1D1D1F]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <Link
                  to="/teach"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 min-h-[44px] rounded-xl transition-colors ${
                    pathname === '/teach'
                      ? 'bg-[#0859D4]/10 text-[#0859D4] font-semibold'
                      : 'hover:bg-black/[0.04] text-[#424242] hover:text-[#1D1D1F]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Become a Mentor</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
                {user ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className="btn-zephyr-primary w-full min-h-[44px] text-sm"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                        if (pathname === '/dashboard') navigate('/');
                      }}
                      className="btn-zephyr-secondary w-full min-h-[44px] text-sm"
                    >
                      Log out ({user.name?.split(' ')[0]})
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
                      className="btn-zephyr-primary w-full min-h-[44px] text-sm"
                    >
                      Get Started
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="btn-zephyr-secondary w-full min-h-[44px] text-sm"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Quick Search Modal (Ctrl/Cmd + K) */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search Cohorts & Domains"
        maxWidth="max-w-xl"
      >
        <div className="space-y-5">
          <SearchBar
            inlineDropdown
            onSelect={() => setSearchOpen(false)}
            placeholder="Search React, DSA, FL Studio, Valorant, Figma..."
          />

          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6E6E73] mb-2.5">
              Popular Campus Domains
            </div>
            <div className="flex flex-wrap gap-2">
              {safeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    navigate(`/explore?category=${cat.id}`);
                  }}
                  className="px-3.5 min-h-[38px] rounded-full bg-[#F5F5F7] hover:bg-[#0859D4] text-[#424242] hover:text-white border border-black/[0.06] text-xs font-heading font-semibold transition-colors cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Navbar;
