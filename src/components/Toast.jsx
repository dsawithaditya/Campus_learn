import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function ToastContainer() {
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2.5 pointer-events-none w-full max-w-md px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-full bg-white/95 backdrop-blur-2xl text-[#1D1D1F] shadow-[0_14px_40px_rgba(29,29,31,0.14)] border border-black/10 text-xs sm:text-sm font-heading font-semibold"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" strokeWidth={2.2} />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-[#0859D4] shrink-0" strokeWidth={2.2} />
            )}
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="ml-1 p-1 rounded-full hover:bg-black/5 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
