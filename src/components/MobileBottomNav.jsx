import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Users, Sparkles, LayoutDashboard, User } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function MobileBottomNav() {
  const { pathname } = useLocation();
  const user = useAppStore((state) => state.user);

  const items = [
    { label: 'Home', to: '/', icon: Home, match: (p) => p === '/' },
    {
      label: 'Courses',
      to: '/explore',
      icon: BookOpen,
      match: (p) => p.startsWith('/explore') || p.startsWith('/course/'),
    },
    {
      label: 'Mentors',
      to: '/mentors',
      icon: Users,
      match: (p) => p.startsWith('/mentors') || p.startsWith('/mentor/'),
    },
    {
      label: 'Guilds',
      to: '/guilds',
      icon: Sparkles,
      match: (p) => p.startsWith('/guilds'),
    },
    {
      label: user ? 'Dashboard' : 'Sign In',
      to: user ? '/dashboard' : '/login',
      icon: user ? LayoutDashboard : User,
      match: (p) => p.startsWith('/dashboard') || p.startsWith('/login') || p.startsWith('/signup'),
    },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-black/[0.08] shadow-[0_-8px_30px_rgba(29,29,31,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto px-1.5 py-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center min-h-[48px] rounded-xl text-[11px] font-heading font-semibold transition-colors select-none ${
                isActive ? 'text-[#0859D4]' : 'text-[#6E6E73] active:text-[#1D1D1F]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-bottom-nav-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-x-1.5 inset-y-1 rounded-xl bg-[#0859D4]/[0.09] -z-10"
                />
              )}
              <Icon className="w-[18px] h-[18px] mb-0.5" strokeWidth={isActive ? 2.25 : 1.8} />
              <span className="truncate max-w-full px-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
