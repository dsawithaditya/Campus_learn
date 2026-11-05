import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Compass,
  Sparkles,
  BookMarked,
  User,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useAppStore } from '../store/useAppStore';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import categoriesData from '../data/categories.json';

export function Navbar() {
  const { scrollY } = useScrollProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  const isScrolled = scrollY > 40;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-base glass-navbar border-b border-border/80 dark:border-border-dark/80 ${
          isScrolled ? 'py-2.5 shadow-soft' : 'py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-105">
              <GraduationCap className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-text dark:text-text-dark flex items-center gap-1">
                Campus<span className="text-primary dark:text-primary-contrast">Learn</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-primary dark:text-primary-contrast'
                    : 'text-muted dark:text-muted-dark hover:text-text dark:hover:text-text-dark'
                }`
              }
            >
              <Compass className="w-4 h-4" strokeWidth={1.75} />
              <span>Explore</span>
            </NavLink>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-sm font-semibold text-muted dark:text-muted-dark hover:text-text dark:hover:text-text-dark transition-colors flex items-center gap-1 py-1"
                aria-expanded={isCategoriesOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    isCategoriesOpen ? 'rotate-180 text-primary' : ''
                  }`}
                  strokeWidth={1.75}
                />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-20 w-72 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md shadow-lift p-2 z-50 mt-1"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {categoriesData.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/explore?category=${cat.id}`}
                          onClick={() => setIsCategoriesOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-sm text-sm hover:bg-primary-soft/50 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="font-medium text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-contrast">
                              {cat.name}
                            </span>
                          </div>
                          <span className="text-xs text-muted dark:text-muted-dark font-body">
                            {cat.courseCount}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/teach"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-primary dark:text-primary-contrast'
                    : 'text-muted dark:text-muted-dark hover:text-text dark:hover:text-text-dark'
                }`
              }
            >
              <Sparkles className="w-4 h-4 text-accent" strokeWidth={1.75} />
              <span>Teach</span>
            </NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User profile menu"
                  className="flex items-center gap-2 p-1 pl-2 rounded-pill border border-border dark:border-border-dark hover:border-primary/50 transition-colors"
                >
                  <span className="text-xs font-semibold text-text dark:text-text-dark hidden sm:inline-block max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-primary/20"
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md shadow-lift p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-border/60 dark:border-border-dark/60">
                        <p className="text-xs font-semibold text-text dark:text-text-dark truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-muted dark:text-muted-dark truncate">
                          {user.college}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-text dark:text-text-dark hover:bg-primary-soft/50 dark:hover:bg-slate-800 rounded-sm"
                        >
                          <LayoutDashboard className="w-4 h-4 text-primary" strokeWidth={1.75} />
                          <span>Student Dashboard</span>
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-sm"
                        >
                          <LogOut className="w-4 h-4" strokeWidth={1.75} />
                          <span>Log out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-sm text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.75} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-surface dark:bg-surface-dark border-l border-border dark:border-border-dark p-6 flex flex-col justify-between shadow-lift z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border/80 dark:border-border-dark/80 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" strokeWidth={2} />
                    <span className="font-heading font-bold text-lg text-text dark:text-text-dark">
                      Campus Learn
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1 rounded text-muted hover:text-text"
                  >
                    <X className="w-5 h-5" strokeWidth={1.75} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 font-semibold text-base">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-sm hover:bg-primary-soft/50 dark:hover:bg-slate-800 text-text dark:text-text-dark"
                  >
                    Home
                  </Link>
                  <Link
                    to="/explore"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-sm hover:bg-primary-soft/50 dark:hover:bg-slate-800 text-text dark:text-text-dark"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    to="/teach"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-sm hover:bg-primary-soft/50 dark:hover:bg-slate-800 text-text dark:text-text-dark flex items-center justify-between"
                  >
                    <span>Become a Mentor</span>
                    <span className="text-xs bg-accent-soft text-accent px-2 py-0.5 rounded-pill font-bold">
                      Teach
                    </span>
                  </Link>

                  {user && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-sm hover:bg-primary-soft/50 dark:hover:bg-slate-800 text-text dark:text-text-dark"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>

                {/* Mobile categories list */}
                <div className="mt-6 pt-6 border-t border-border/60 dark:border-border-dark/60">
                  <p className="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider mb-3">
                    Top Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoriesData.slice(0, 5).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/explore?category=${cat.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs px-2.5 py-1 rounded-pill bg-slate-100 dark:bg-slate-800 text-text dark:text-text-dark"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Auth actions */}
              <div className="pt-6 border-t border-border/80 dark:border-border-dark/80">
                {user ? (
                  <Button variant="ghost" fullWidth onClick={handleLogout}>
                    Log out ({user.name.split(' ')[0]})
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="secondary" fullWidth className="mb-2">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth>
                        Sign up with college email
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

