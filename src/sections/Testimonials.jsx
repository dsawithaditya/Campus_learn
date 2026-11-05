import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Rating } from '../components/Rating';
import testimonialsData from '../data/testimonials.json';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 6s (pause on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const item = testimonialsData[currentIndex];

  return (
    <section
      className="section-padding bg-surface/50 dark:bg-surface-dark/40 border-t border-border/70 dark:border-border-dark/70"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-contrast mb-2 block">
            Student Stories
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[40px] text-text dark:text-text-dark leading-[1.15]">
            Loved by Students Across India
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg p-8 sm:p-12 shadow-soft min-h-[260px] flex flex-col justify-between">
          <Quote className="w-10 h-10 text-primary-soft dark:text-slate-800 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <Rating value={item.rating} size="md" />

              <p className="text-base sm:text-xl text-text dark:text-text-dark font-medium leading-relaxed italic">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3.5 pt-2">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-soft dark:border-slate-700"
                />
                <div>
                  <h4 className="font-heading font-bold text-base text-text dark:text-text-dark">
                    {item.name}
                  </h4>
                  <p className="text-xs text-primary dark:text-primary-contrast font-medium">
                    {item.college}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-border/60 dark:border-border-dark/60 mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-base ${
                    idx === currentIndex
                      ? 'w-6 bg-primary dark:bg-primary-contrast'
                      : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-border dark:border-border-dark flex items-center justify-center text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-border dark:border-border-dark flex items-center justify-center text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

