import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PreferencesPill() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 mb-2 w-64 p-4 rounded-2xl bg-zinc-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-3.5 text-white"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-semibold text-white tracking-wider uppercase">
                Site Preferences
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                )}
                <span>Interactive Audio</span>
              </span>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  soundEnabled ? 'bg-white' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                    soundEnabled ? 'right-0.5 bg-black' : 'left-0.5 bg-white'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>3D Inertia Parallax</span>
              </span>
              <button
                type="button"
                onClick={() => setReduceMotion(!reduceMotion)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  !reduceMotion ? 'bg-white' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                    !reduceMotion ? 'right-0.5 bg-black' : 'left-0.5 bg-white'
                  }`}
                />
              </button>
            </div>

            <div className="pt-1 text-[11px] text-zinc-400 flex items-center gap-1.5 border-t border-white/5">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Campus Learn v2.4</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill Button matching reference image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-zinc-900 border border-white/15 hover:border-white/30 backdrop-blur-md text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all shadow-xl group cursor-pointer"
        aria-label="Site Preferences"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
        <span>Preferences</span>
      </button>
    </div>
  );
}

export default PreferencesPill;
