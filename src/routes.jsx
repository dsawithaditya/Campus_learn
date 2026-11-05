import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from './components/Skeleton';

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
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
    <div className="min-h-[70vh] flex items-center justify-center pt-24">
      <div className="w-full max-w-xl p-8 space-y-4">
        <Skeleton variant="text" height="2rem" width="60%" />
        <Skeleton variant="text" height="1rem" width="80%" />
        <Skeleton variant="rect" height="14rem" />
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
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

