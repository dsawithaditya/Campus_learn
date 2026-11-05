import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { GlobalProgressBar, BackToTopButton, SplashScreen } from './components/GlobalExtras';
import { AppRoutes } from './routes';
import { useAppStore } from './store/useAppStore';

export function App() {
  const theme = useAppStore((state) => state.theme);
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white rounded-md shadow-lift"
      >
        Skip to main content
      </a>

      {/* Splash Screen */}
      <SplashScreen onFinish={() => setSplashFinished(true)} />

      {/* Global Scroll Progress Bar */}
      <GlobalProgressBar />

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

      {/* Global Toast notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

