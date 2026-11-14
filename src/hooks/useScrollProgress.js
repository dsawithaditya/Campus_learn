import { useState, useEffect } from 'react';

/**
 * High-performance Scroll Progress Hook
 * - rAF-throttled to avoid layout thrashing
 * - Compatible with Lenis virtual scroll & native window scroll
 * - Quantized to avoid excessive React re-renders
 */
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrollY: 0 });

  useEffect(() => {
    let rafId = 0;

    const read = () => {
      rafId = 0;
      const y = window.__lenis ? window.__lenis.scroll : window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0;
      const qy = Math.round(y / 15) * 15;
      const qp = Math.round(p * 100) / 100;
      setState((prev) =>
        prev.scrollY === qy && prev.progress === qp ? prev : { progress: qp, scrollY: qy }
      );
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    let unbindLenis;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on('scroll', onScroll);
      unbindLenis = () => lenis.off?.('scroll', onScroll);
    }

    read();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (unbindLenis) unbindLenis();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return state;
}
