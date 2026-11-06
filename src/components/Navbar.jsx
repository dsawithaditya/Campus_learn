import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Compass,
  Sparkles,
  LogOut,
  LayoutDashboard,
  Users,
  Info,
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

  const isScrolled = scrollY > 30;
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-navbar py-2.5 shadow-sm' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo with 3D Glossy Gradient Sphere matching reference image */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-400 to-amber-300 p-0.5 shadow-md transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <span className="font-heading font-black text-xs tracking-tighter">CL</span>
              </div>
            </div>
            <span className="font-heading font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
              Campus<span className="text-blue-600 dark:text-blue-400">Learn</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 py-1"
                aria-expanded={isCategoriesOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    isCategoriesOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                  strokeWidth={2.2}
                />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-12 w-72 glass-card shadow-2xl p-2 z-50 mt-1"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {safeCategories?.map((cat) => (
                        <Link
                          key={cat?.id}
                          to={`/explore?category=${cat?.id}`}
                          onClick={() => setIsCategoriesOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: cat?.color || '#3b82f6' }}
                            />
                            <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {cat?.name}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">
                            {cat?.courseCount} camps
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            </NavLink>

            <NavLink
              to="/teach"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              <span>Community</span>
            </NavLink>

            <a
              href="#mentors"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Mentors
            </a>

            <a
              href="#about"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About Us
            </a>
          </nav>

          {/* Right Actions: Start Creating CTA + Theme Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User profile menu"
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors bg-white dark:bg-slate-900 shadow-sm"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline-block max-w-[90px] truncate">
                    {user?.name?.split(' ')?.[0]}
                  </span>
                  <img
                    src={user?.avatar}
                    alt={user?.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-blue-500/50"
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 glass-card shadow-2xl p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user?.college}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600" strokeWidth={2} />
                          <span>Student Dashboard</span>
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                        >
                          <LogOut className="w-4 h-4" strokeWidth={2} />
                          <span>Log out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link to="/login">
                  <button className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 px-3 py-2 transition-colors">
                    Log In
                  </button>
                </Link>
                <Link to="/teach">
                  <button className="btn-interactive flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full text-white shadow-md">
                    <span>Start Creating</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-heading font-black text-lg text-slate-900 dark:text-white">
                    Campus<span className="text-blue-600">Learn</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-md text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/explore"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600"
                  >
                    Explore Camps
                  </Link>
                  <Link
                    to="/teach"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600"
                  >
                    Start Creating / Teach
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600"
                  >
                    Student Dashboard
                  </Link>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Top Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {safeCategories?.slice(0, 6).map((cat) => (
                      <Link
                        key={cat?.id}
                        to={`/explore?category=${cat?.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {cat?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                {user ? (
                  <Button variant="ghost" fullWidth onClick={handleLogout}>
                    Log out ({user?.name?.split(' ')?.[0]})
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
                        Start Creating ✦
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
