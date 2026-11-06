import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { Rating } from '../components/Rating';
import testimonialsData from '../data/testimonials.json';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeTestimonials = Array.isArray(testimonialsData) ? testimonialsData : [];
  const count = safeTestimonials.length;

  useEffect(() => {
    if (isPaused || count === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, count]);

  const handlePrev = () => {
    if (count === 0) return;
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    if (count === 0) return;
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  const item = safeTestimonials[currentIndex];

  if (!item) return null;

  return (
    <section
      className="py-20 bg-slate-50/50 dark:bg-zinc-950/40 border-t border-slate-200/80 dark:border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Stories</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white leading-[1.15]">
            Loved by Students Across 100+ Campuses
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="glass-card relative p-8 sm:p-12 shadow-xl rounded-3xl min-h-[260px] flex flex-col justify-between">
          <Quote className="w-12 h-12 text-blue-500/15 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Rating value={item.rating || 5} size="md" />

              <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 font-medium leading-relaxed italic">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40 shadow-md"
                />
                <div>
                  <h3 className="font-heading font-black text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {item.college} • {item.branch}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-white/10 mt-6">
            <div className="flex items-center gap-1.5">
              {safeTestimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-white hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-white hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
