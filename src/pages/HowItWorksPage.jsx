import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Mic2,
  Music,
  Flame,
  Trophy,
  Palette,
  Camera,
  Gamepad2,
} from 'lucide-react';
import { HowItWorks } from '../sections/HowItWorks';
import { SplitTextReveal } from '../components/AnimatedText';
import categoriesData from '../data/categories.json';

const iconMap = {
  tech: Code2,
  singing: Mic2,
  music: Music,
  dance: Flame,
  sports: Trophy,
  art: Palette,
  photography: Camera,
  gaming: Gamepad2,
};

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <div className="pt-20 sm:pt-24 pb-16 min-h-screen">
      <HowItWorks />

      {/* Campus Domains Grid */}
      <section className="container-custom pt-10 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#1D1D1F] tracking-tight">
              <SplitTextReveal text="Explore" />{' '}
              <span className="font-editorial italic font-normal text-[#0859D4] text-[1.1em]">
                Domains
              </span>
            </h2>
          </div>
          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/explore')}
            className="text-xs sm:text-sm font-heading font-semibold text-[#424242] hover:text-[#0859D4] flex items-center gap-1.5 group self-start sm:self-auto transition-colors cursor-pointer"
          >
            <span>All courses</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {safeCategories.map((cat, index) => {
            const IconComponent = iconMap[cat?.id] || Code2;
            const accentColor = cat?.color || '#0859D4';
            return (
              <motion.button
                key={cat?.id || index}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => navigate(`/explore?category=${cat?.id}`)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative p-4 rounded-2xl flex items-center justify-between text-left group cursor-pointer bg-white border border-black/[0.08] hover:border-[#0859D4]/45 transition-all duration-300 shadow-soft hover:shadow-lift overflow-hidden"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{
                      backgroundColor: `${accentColor}14`,
                      borderColor: `${accentColor}30`,
                      color: accentColor,
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-heading text-sm font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#0859D4] transition-colors truncate">
                      {cat?.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#6E6E73] mt-0.5">
                      {cat?.courseCount || 12}+ cohorts
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#0859D4] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
