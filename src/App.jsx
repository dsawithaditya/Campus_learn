import React, { useEffect, useCallback } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  BackToTopButton,
  GrailFloatingPill,
  SplashScreen,
  GlobalProgressBar,
  GlobalClickBurst,
  CustomCursorGlow,
  CustomCursor,
  SmoothScroll,
  ScrollReveal,
} from './components/GlobalExtras';
import { AppRoutes } from './routes';

const ROUTE_TITLES = [
  { match: (p) => p === '/', title: 'Campus Learn | Peer Cohorts by Campus Seniors' },
  { match: (p) => p.startsWith('/explore'), title: 'Explore Cohorts | Campus Learn' },
  { match: (p) => p.startsWith('/mentors'), title: 'Senior Mentors | Campus Learn' },
  { match: (p) => p.startsWith('/mentor/'), title: 'Mentor Profile | Campus Learn' },
  { match: (p) => p.startsWith('/course/'), title: 'Cohort Overview | Campus Learn' },
  { match: (p) => p.startsWith('/how-it-works'), title: 'How It Works | Campus Learn' },
  { match: (p) => p.startsWith('/guilds'), title: 'Campus Guilds | Campus Learn' },
  { match: (p) => p.startsWith('/outcomes'), title: 'Campus Outcomes | Campus Learn' },
  { match: (p) => p.startsWith('/dashboard'), title: 'Student Dashboard | Campus Learn' },
  { match: (p) => p.startsWith('/teach'), title: 'Become a Mentor | Campus Learn' },
  { match: (p) => p.startsWith('/login'), title: 'Log In | Campus Learn' },
  { match: (p) => p.startsWith('/signup'), title: 'Join Campus Learn | Sign Up' },
];

function RouteManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const matched = ROUTE_TITLES.find((r) => r.match(pathname));
    document.title = matched ? matched.title : 'Campus Learn';

    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    return undefined;
  }, [pathname, hash]);

  return null;
}

export function App() {
  const handleSplashFinish = useCallback(() => {}, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.backgroundColor = '#FFFFFF';
    document.documentElement.style.colorScheme = 'light';
    if (document.body) {
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#1D1D1F';
    }
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteManager />
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0859D4] text-white rounded-md shadow-lift"
      >
        Skip to main content
      </a>

      <CustomCursorGlow />
      <CustomCursor />
      <SmoothScroll />
      <ScrollReveal />
      <GlobalProgressBar />
      <GlobalClickBurst />
      <SplashScreen onFinish={handleSplashFinish} />

      <Navbar />

      <main id="main-content" className="min-h-screen relative">
        <AppRoutes />
      </main>

      <Footer />
      <MobileBottomNav />
      <GrailFloatingPill />
      <BackToTopButton />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
