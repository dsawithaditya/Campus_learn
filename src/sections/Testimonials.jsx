import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SplitTextReveal, ScrambleText } from '../components/AnimatedText';
import testimonialsData from '../data/testimonials.json';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const safeTestimonials = Array.isArray(testimonialsData) ? testimonialsData : [];
  const count = safeTestimonials.length;

  useEffect(() => {
    if (isPaused || count === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, count]);

  const handlePrev = () => {
    if (count === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    if (count === 0) return;
    setDirection(1);
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
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF6B00] font-bold block mb-2">
            <ScrambleText text="06 // STUDENT STORIES" />
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            <SplitTextReveal text="Loved Across" />{' '}
            <span className="font-editorial italic font-normal text-[#FF6B00] text-[1.1em]">
              Indian Campuses
            </span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative zephyr-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl overflow-hidden"
        >
          <Quote className="w-10 h-10 text-[#FF6B00]/30 mb-6" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: direction * -24, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p className="font-heading text-lg sm:text-2xl text-zinc-100 font-medium leading-relaxed">
                &ldquo;{item?.quote || item?.text}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#FF6B00] via-amber-400 to-white/20 shrink-0 shadow-[0_0_15px_rgba(255,107,0,0.25)]">
                    <img
                      src={item?.avatar}
                      alt={item?.name || item?.author}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base">
                      {item?.name || item?.author}
                    </h4>
                    <p className="font-mono text-xs text-zinc-400">
                      <span className="text-[#FF6B00] font-semibold">{item?.role || 'Verified Learner'}</span>
                      {item?.courseTitle && <span> • {item?.courseTitle}</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Dots indicator */}
                  <div className="flex items-center gap-1.5 mr-2">
                    {safeTestimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setDirection(idx > currentIndex ? 1 : -1);
                          setCurrentIndex(idx);
                        }}
                        aria-label={`Go to story ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? 'w-6 bg-[#FF6B00]'
                            : 'w-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF6B00]/20 border border-white/10 hover:border-[#FF6B00]/50 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF6B00]/20 border border-white/10 hover:border-[#FF6B00]/50 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
