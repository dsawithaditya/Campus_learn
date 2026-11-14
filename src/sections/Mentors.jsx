import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Star,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MentorCard } from '../components/MentorCard';
import { SplitTextReveal, Magnetic } from '../components/AnimatedText';
import mentorsData from '../data/mentors.json';

export function Mentors() {
  const navigate = useNavigate();
  const safeMentors = useMemo(
    () => (Array.isArray(mentorsData) ? mentorsData : []),
    []
  );
  const spotlightMentors = safeMentors.slice(0, 6);
  const [activeIdx, setActiveIdx] = useState(0);
  const [query, setQuery] = useState('');
  const swiperRef = useRef(null);

  const activeMentor = spotlightMentors[activeIdx] || spotlightMentors[0];

  const handleStageCycle = (dir) => {
    if (spotlightMentors.length === 0) return;
    if (dir < 0) swiperRef.current?.slidePrev();
    else swiperRef.current?.slideNext();
  };

  const filteredMentors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return safeMentors;
    return safeMentors.filter(
      (m) =>
        m?.name?.toLowerCase().includes(q) ||
        m?.expertise?.toLowerCase().includes(q) ||
        m?.skills?.some((s) => s.toLowerCase().includes(q))
    );
  }, [safeMentors, query]);

  return (
    <section id="mentors" className="py-8 sm:py-12 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-24 left-1/4 w-[520px] h-[280px] bg-[#0859D4]/[0.05] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom space-y-10">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#1D1D1F] tracking-tight leading-[1.06]">
              <SplitTextReveal text="Learn from" />{' '}
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.08em]">
                Seniors
              </span>
            </h1>
            <p className="text-sm text-[#6E6E73] mt-2 max-w-md">
              Club leads, hackathon winners, and campus seniors mentoring 1-on-1.
            </p>
          </div>

          <Magnetic strength={0.18} className="self-start md:self-auto">
            <InteractiveHoverButton
              text="Become a Mentor"
              onClick={() => navigate('/teach')}
              className="w-48 h-11 text-xs sm:text-sm"
            />
          </Magnetic>
        </div>

        {/* Compact 2-Column Featured Senior Spotlight (Swiper JS Carousel) */}
        {activeMentor && (
          <div
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
            className="relative rounded-2xl bg-white border border-black/[0.08] p-5 sm:p-7 overflow-hidden shadow-[0_16px_44px_rgba(29,29,31,0.06)]"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#0859D4]/[0.06] blur-3xl pointer-events-none" />

            <Swiper
              modules={[Autoplay, Keyboard]}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              onSlideChange={(s) => setActiveIdx(s.realIndex)}
              loop={spotlightMentors.length > 1}
              speed={550}
              grabCursor={true}
              keyboard={{ enabled: true }}
              autoplay={{ delay: 6200, disableOnInteraction: false }}
              className="relative z-10 w-full"
            >
              {spotlightMentors.map((mentorItem, mIdx) => (
                <SwiperSlide key={mentorItem.id || mIdx} className="select-none">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pb-4">
                    {/* Left: Crisp Portrait Card */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                      <div
                        onClick={() => navigate(`/mentor/${mentorItem.id}`)}
                        className="relative w-full max-w-[260px] aspect-[4/4.2] rounded-2xl p-[1.5px] bg-gradient-to-b from-[#0859D4]/70 via-[#1A59F9]/25 to-black/10 shadow-[0_16px_36px_rgba(29,29,31,0.12)] cursor-pointer group"
                      >
                        <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#F5F5F7]">
                          <img
                            src={mentorItem.avatar}
                            alt={mentorItem.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                          {/* Index Counter */}
                          <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md border border-black/10 text-[#1D1D1F] shadow-sm">
                            0{mIdx + 1} / 0{spotlightMentors.length}
                          </span>

                          {/* Live Dot */}
                          <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-500/30 text-emerald-700 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            1:1 Open
                          </span>

                          {/* Bottom Compact Stat */}
                          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs font-mono text-white">
                            <span className="flex items-center gap-1 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              {mentorItem.rating}
                            </span>
                            <span className="text-[11px] text-[#70B5FF] flex items-center gap-0.5 font-semibold group-hover:translate-x-0.5 transition-transform">
                              Profile <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Details & Skills */}
                    <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
                      {/* Expertise Pill + Metrics */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[11px] font-semibold text-[#0859D4] bg-[#0859D4]/10 border border-[#0859D4]/20 px-2.5 py-1 rounded-full">
                          {mentorItem.expertise || 'Domain Lead'}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-xs text-[#6E6E73]">
                          <Users className="w-3.5 h-3.5 text-[#0859D4]" />
                          {(mentorItem.followers || 0).toLocaleString()} learners
                        </span>
                        <span className="flex items-center gap-1 font-mono text-xs text-[#6E6E73]">
                          <BookOpen className="w-3.5 h-3.5 text-[#0859D4]" />
                          {mentorItem.coursesCount || 0} cohorts
                        </span>
                      </div>

                      {/* Clean Name */}
                      <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#1D1D1F] tracking-tight">
                        {mentorItem.name.split(' ')[0]}{' '}
                        <span className="font-editorial italic font-normal text-[#0859D4]">
                          {mentorItem.name.split(' ').slice(1).join(' ')}
                        </span>
                      </h2>

                      {/* Concise Bio */}
                      <p className="text-sm text-[#424242] leading-relaxed max-w-2xl">
                        {mentorItem.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {mentorItem.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[11px] font-medium bg-[#F5F5F7] text-[#424242] px-2.5 py-1 rounded-md border border-black/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Controls Row: Mentor Switcher Pills + Nav & Profile CTA */}
            <div className="relative z-10 pt-4 border-t border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Featured Mentors"
                className="flex flex-wrap items-center gap-1.5"
              >
                {spotlightMentors.map((m, idx) => {
                  const isOn = idx === activeIdx;
                  return (
                    <button
                      key={m.id || idx}
                      type="button"
                      role="tab"
                      aria-selected={isOn}
                      onClick={() => swiperRef.current?.slideToLoop(idx)}
                      className={`h-8 px-3.5 rounded-full font-heading text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isOn
                          ? 'bg-[#0859D4] text-white shadow-[0_4px_14px_rgba(8,89,212,0.28)]'
                          : 'bg-[#F5F5F7] text-[#424242] hover:bg-[#EBEBF0] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {m.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleStageCycle(-1)}
                  aria-label="Previous mentor"
                  className="w-8 h-8 rounded-full border border-black/15 bg-white hover:border-[#0859D4]/50 hover:text-[#0859D4] text-[#424242] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStageCycle(1)}
                  aria-label="Next mentor"
                  className="w-8 h-8 rounded-full border border-black/15 bg-white hover:border-[#0859D4]/50 hover:text-[#0859D4] text-[#424242] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/mentor/${activeMentor.id}`)}
                  className="btn-zephyr-secondary text-xs px-4 py-1.5 gap-1.5 ml-1"
                >
                  <span>View Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Directory Controls + All Mentors Grid */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <h2 className="font-heading font-bold text-lg text-[#1D1D1F]">
                All Senior Mentors
              </h2>
              <span className="font-mono text-[11px] font-semibold text-[#0859D4] bg-[#0859D4]/10 border border-[#0859D4]/20 px-2 py-0.5 rounded-full">
                {filteredMentors.length}
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#6E6E73] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or skill..."
                aria-label="Filter mentors"
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.08] focus:border-[#0859D4]/60 focus:bg-white text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none transition-colors"
              />
            </div>
          </div>

          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredMentors.map((mentor, idx) => (
                <motion.div
                  key={mentor?.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(idx * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MentorCard mentor={mentor} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center text-sm text-[#6E6E73]">
              No mentors match &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Mentors;
