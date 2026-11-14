import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const MentorsPage = lazy(() => import('./pages/MentorsPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const GuildsPage = lazy(() => import('./pages/GuildsPage'));
const OutcomesPage = lazy(() => import('./pages/OutcomesPage'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const MentorProfile = lazy(() => import('./pages/MentorProfile'));
const Teach = lazy(() => import('./pages/Teach'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComponentsShowcase = lazy(() => import('./pages/ComponentsShowcase'));

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-black/[0.08] border-t-[#0859D4] animate-spin" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F7] border border-black/[0.06] font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E6E73]">
          Loading view
        </div>
      </div>
    </div>
  );
}

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="relative"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/guilds" element={<GuildsPage />} />
            <Route path="/outcomes" element={<OutcomesPage />} />
            <Route path="/course/:slug" element={<CourseDetail />} />
            <Route path="/mentor/:id" element={<MentorProfile />} />
            <Route path="/teach" element={<Teach />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/components" element={<ComponentsShowcase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

