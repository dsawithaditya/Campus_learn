import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { BackToTopButton, SplashScreen } from './components/GlobalExtras';
import { PreferencesPill } from './components/PreferencesPill';
import { AppRoutes } from './routes';
import { useAppStore } from './store/useAppStore';

export function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // Permanently enforce Zephyr dark mode
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.style.backgroundColor = '#000000';
    document.documentElement.style.colorScheme = 'dark';
    if (document.body) {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    }
  }, []);

  return (
    <BrowserRouter>
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-md shadow-lift"
      >
        Skip to main content
      </a>

      {/* Splash Screen */}
      <SplashScreen onFinish={() => setSplashFinished(true)} />

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="min-h-screen">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top floating button */}
      <BackToTopButton />

      {/* Persistent Zephyr-style Preferences Pill */}
      <PreferencesPill />

      {/* Global Toast notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

