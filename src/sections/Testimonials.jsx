import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import {
  SplitTextReveal,
  GrailParenCounter,
} from '../components/AnimatedText';
import testimonialsData from '../data/testimonials.json';

export function Testimonials({ embedded = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const safeTestimonials = Array.isArray(testimonialsData) ? testimonialsData : [];
  const count = safeTestimonials.length;

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  if (count === 0) return null;

  const cardBody = (
    <div
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      className={
        embedded
          ? 'relative rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] p-5 sm:p-6 overflow-hidden shadow-[0_12px_32px_rgba(29,29,31,0.06)]'
          : 'relative rounded-3xl bg-white border border-black/[0.08] p-7 sm:p-12 shadow-[0_20px_50px_rgba(29,29,31,0.06)] overflow-hidden max-w-4xl mx-auto'
      }
    >
      {/* Top Bar: Label + Counter + Navigation */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-[#0859D4]" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0859D4]">
            Student Stories
          </span>
        </div>

        <div className="flex items-center gap-3">
          <GrailParenCounter
            value={currentIndex + 1}
            className={embedded ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-5xl'}
          />
          {embedded && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-[#F5F5F7] hover:bg-[#0859D4]/10 border border-black/[0.08] hover:border-[#0859D4]/40 text-[#424242] hover:text-[#0859D4] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-[#F5F5F7] hover:bg-[#0859D4]/10 border border-black/[0.08] hover:border-[#0859D4]/40 text-[#424242] hover:text-[#0859D4] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Swipeable Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Keyboard]}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        onSlideChange={(s) => setCurrentIndex(s.realIndex)}
        loop={count > 1}
        speed={550}
        grabCursor={true}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 5600, disableOnInteraction: false }}
        className="w-full"
      >
        {safeTestimonials.map((item, idx) => (
          <SwiperSlide key={item?.id || idx} className="select-none">
            <div className={embedded ? 'space-y-4' : 'space-y-6'}>
              <p
                className={`font-heading text-[#1D1D1F] font-medium leading-relaxed ${
                  embedded ? 'text-sm sm:text-lg max-w-4xl' : 'text-lg sm:text-2xl'
                }`}
              >
                &ldquo;{item?.quote || item?.text}&rdquo;
              </p>

              <div
                className={`flex flex-wrap items-center justify-between gap-3 ${
                  embedded ? 'pt-3 border-t border-black/[0.08]' : 'pt-6 border-t border-black/[0.08]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`${
                      embedded ? 'w-9 h-9' : 'w-12 h-12'
                    } rounded-full p-[1.5px] bg-gradient-to-tr from-[#0859D4] via-[#1A59F9] to-black/15 shrink-0`}
                  >
                    <img
                      src={item?.avatar}
                      alt={item?.name || item?.author}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-[#1D1D1F] text-xs sm:text-sm truncate">
                      {item?.name || item?.author}
                    </h4>
                    <p className="font-mono text-[11px] text-[#0859D4] truncate">
                      {item?.role || 'Verified Learner'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item?.rating && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#1D1D1F] bg-[#F5F5F7] border border-black/[0.08] px-2.5 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </span>
                  )}

                  <div className="flex items-center">
                    {safeTestimonials.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => swiperRef.current?.slideToLoop(dotIdx)}
                        aria-label={`Go to story ${dotIdx + 1}`}
                        className="w-7 h-7 flex items-center justify-center cursor-pointer"
                      >
                        <span
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === currentIndex
                              ? 'w-5 bg-[#0859D4]'
                              : 'w-1.5 bg-black/20 hover:bg-black/35'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {!embedded && (
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#0859D4]/10 border border-black/[0.08] hover:border-[#0859D4]/40 text-[#424242] hover:text-[#0859D4] transition-colors cursor-pointer"
                        aria-label="Previous story"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#0859D4]/10 border border-black/[0.08] hover:border-[#0859D4]/40 text-[#424242] hover:text-[#0859D4] transition-colors cursor-pointer"
                        aria-label="Next story"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  if (embedded) return cardBody;

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white border-t border-black/[0.08] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            <SplitTextReveal text="Student" />{' '}
            <span className="font-editorial italic font-normal text-[#0859D4] text-[1.12em]">
              Stories
            </span>
          </h2>
        </div>
        {cardBody}
      </div>
    </section>
  );
}

export default Testimonials;
