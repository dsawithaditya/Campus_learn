import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { BackToTopButton, SplashScreen } from './components/GlobalExtras';
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

  useEffect(() => {
    // Enforce high-contrast Obsidian + Blaze Orange dark theme (#070709 / #F4F4F5)
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.style.backgroundColor = '#070709';
    document.documentElement.style.colorScheme = 'dark';
    if (document.body) {
      document.body.style.backgroundColor = '#070709';
      document.body.style.color = '#F4F4F5';
    }
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTopAndHash />
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#FF6B00] text-white rounded-md shadow-lift"
      >
        Skip to main content
      </a>

      {/* Splash Screen */}
      <SplashScreen onFinish={() => setSplashFinished(true)} />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="min-h-screen relative">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top floating button */}
      <BackToTopButton />

      {/* Global Toast notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

