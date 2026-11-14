import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
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
import { useAppStore } from './store/useAppStore';

function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  const handleSplashFinish = useCallback(() => {
    setSplashFinished(true);
  }, []);

  useEffect(() => {
    // Enforce clean light mode theme (#FFFFFF / #1D1D1F inspired by onlines.com.ar)
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
      <ScrollToTopAndHash />
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0859D4] text-white rounded-md shadow-lift"
      >
        Skip to main content
      </a>

      {/* Ambient Blaze Orange Cursor Spotlight */}
      <CustomCursorGlow />
      <CustomCursor />
      <SmoothScroll />
      <ScrollReveal />

      {/* Top Scroll Progress Laser Bar */}
      <GlobalProgressBar />

      {/* Global Click Shockwave & Sparks */}
      <GlobalClickBurst />

      {/* Splash Screen */}
      <SplashScreen onFinish={handleSplashFinish} />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="min-h-screen relative">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Grail-inspired bottom-left floating cohort pill */}
      <GrailFloatingPill />

      {/* Back to top floating button */}
      <BackToTopButton />

      {/* Global Toast notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

