import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
      className="section-padding bg-zinc-950/40 border-t border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 block">
            Student Stories
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[40px] text-zinc-100 leading-[1.15]">
            Loved by Students Across India
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="glass-card relative p-8 sm:p-12 shadow-2xl min-h-[260px] flex flex-col justify-between">
          <Quote className="w-10 h-10 text-orange-500/10 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <Rating value={item?.rating ?? 5} size="md" />

              <p className="text-base sm:text-xl text-zinc-200 font-medium leading-relaxed italic">
                "{item?.quote}"
              </p>

              <div className="flex items-center gap-3.5 pt-2">
                <img
                  src={item?.avatar}
                  alt={item?.name || 'Student'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/40 shadow-sm"
                />
                <div>
                  <h4 className="font-heading font-bold text-base text-zinc-100">
                    {item?.name}
                  </h4>
                  <p className="text-xs text-orange-400 font-medium">
                    {item?.college}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {safeTestimonials?.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-orange-500 shadow-sm'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-600'
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
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
