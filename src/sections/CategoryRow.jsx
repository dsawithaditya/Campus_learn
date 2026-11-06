import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Mic2, Music, Flame, Trophy, Palette, Camera, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
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

export function CategoryRow() {
  const navigate = useNavigate();
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  const handleCategoryClick = (catId) => {
    navigate(`/explore?category=${catId}`);
  };

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Top Hairline Faded Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-white/[0.015] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
              Campus Domains
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Explore Peer-Led Disciplines
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-1 group self-start sm:self-auto transition-colors cursor-pointer"
          >
            <span>View all courses</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Categories Grid in 2 Clean Rows of 4 with Full Untruncated Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {safeCategories?.map((cat, index) => {
            const IconComponent = iconMap[cat?.id] || Code2;
            const accentColor = cat?.color || '#3b82f6';
            return (
              <motion.button
                key={cat?.id || index}
                type="button"
                onClick={() => handleCategoryClick(cat?.id)}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-4 rounded-2xl flex items-center justify-between text-left group cursor-pointer bg-zinc-950/60 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${accentColor}18`,
                      borderColor: `${accentColor}35`,
                      color: accentColor,
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white tracking-tight group-hover:text-white transition-colors truncate">
                      {cat?.name}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {cat?.courseCount || 12}+ live cohorts
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hairline Faded Divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </section>
  );
}

export default CategoryRow;
