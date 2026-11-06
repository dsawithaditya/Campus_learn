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
      id="testimonials"
      className="py-24 sm:py-32 bg-black border-b border-white/10 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom max-w-4xl relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
            Student Stories
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Loved Across Indian Campuses
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative zephyr-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          <Quote className="w-10 h-10 text-white/20 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-2xl text-zinc-200 font-normal leading-relaxed">
                "{item?.text}"
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#FF6B00]/60 via-white/20 to-transparent shrink-0 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                    <img
                      src={item?.avatar}
                      alt={item?.author}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white text-base">
                      {item?.author}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {item?.college} • {item?.courseTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
